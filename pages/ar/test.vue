<template>
  <!-- 全屏容器作为 Three.js 的渲染画布 -->
  <canvas ref="canvas"
          class="ar-container"
          @click="captureFrame"></canvas>

  <div ref="uidiv">
    <button @click="startAR"
            class="ar-button text-red-600">Start AR</button>

    <button class="text-red-600"
            @click="captureFrame">captureFrame</button>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
// @ts-expect-error
import * as jsfeat from "jsfeat";

class NotSupportedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotSupportedError"
  }
}

const canvas = ref<HTMLCanvasElement | null>(null)
const uidiv = ref<HTMLCanvasElement | null>(null)
let gl: WebGL2RenderingContext | null
let renderer: THREE.WebGLRenderer | null
let scene: THREE.Scene | null
let camera: THREE.PerspectiveCamera | null

async function init() {
  gl = canvas.value!.getContext("webgl2", { xrCompatible: true });

  scene = new THREE.Scene();

  // The cube will have a different color on each side.
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  ];

  // Create the cube and add it to the demo scene.
  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), materials);
  cube.position.set(1, 1, 1);
  scene.add(cube);

  // Set up the WebGLRenderer, which handles rendering to the session's base layer.
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas.value!,
    context: gl!
  });
  renderer.autoClear = false;

  // The API directly updates the camera matrices.
  // Disable matrix auto updates so three.js doesn't attempt
  // to handle the matrices independently.
  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

  // Initialize a WebXR session using "immersive-ar".
  const session = await navigator.xr!.requestSession("immersive-ar", {
    domOverlay: { root: uidiv.value! },
    optionalFeatures: ["dom-overlay"],
  });
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl!)
  });

  // A 'local' reference space has a native origin that is located
  // near the viewer's position at the time the session was created.
  const referenceSpace = await session.requestReferenceSpace('local');

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time: DOMHighResTimeStamp, frame: XRFrame) => {
    // Queue up the next draw request.
    session.requestAnimationFrame(onXRFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, session.renderState.baseLayer!.framebuffer)

    // Retrieve the pose of the device.
    // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
    const pose = frame.getViewerPose(referenceSpace);
    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];

      const viewport = session.renderState.baseLayer!.getViewport(view);
      renderer!.setSize(viewport!.width, viewport!.height)

      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      camera.matrix.fromArray(view.transform.matrix)
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.updateMatrixWorld(true);

      // Render the scene with THREE.WebGLRenderer.
      renderer!.render(scene!, camera)
    }
  }
  session.requestAnimationFrame(onXRFrame);
}

async function startAR() {
  try {
    await init()
    initJsFeat()
  } catch (error) {
    if (error instanceof NotSupportedError) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
}

let img_u8: any;
const corners: jsfeat.keypoint_t[] = [];
const descriptors = new jsfeat.matrix_t(32, 500, jsfeat.U8_t | jsfeat.C1_t); // ORB 描述符 (最多 500 个关键点)

function initJsFeat() {
  img_u8 = new jsfeat.matrix_t(canvas.value!.width, canvas.value!.height, jsfeat.U8C1_t);
}

function captureFrame() {
  console.log("captureFrame");
  const ctx = canvas.value!.getContext("2d")!;
  ctx.drawImage(renderer!.domElement, 0, 0, canvas.value!.width, canvas.value!.height);

  const imageData = ctx.getImageData(0, 0, canvas.value!.width, canvas.value!.height);
  convertToGray(imageData);
}

function convertToGray(imageData: ImageData) {
  const data = imageData.data;
  const w = imageData.width, h = imageData.height;

  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];      // R
    const g = data[i * 4 + 1];  // G
    const b = data[i * 4 + 2];  // B
    img_u8.data[i] = (r * 0.3 + g * 0.59 + b * 0.11); // 灰度化
  }

  detectORB();
}

function detectORB() {
  const num_corners = jsfeat.orb.detect(img_u8, corners, 500); // 最多 500 个特征点
  jsfeat.orb.describe(img_u8, corners, num_corners, descriptors);

  console.log("Detected ORB features:", num_corners);
}

</script>

<style scoped>
.ar-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
