<template>
  <!-- 全屏容器作为 Three.js 的渲染画布 -->
  <canvas ref="canvas"
          class="ar-container"></canvas>

  <button @click="startAR"
          class="ar-button text-red-600">Start AR</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

class NotSupportedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotSupportedError"
  }
}

const canvas = ref<HTMLCanvasElement | null>(null)
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
  const session = await navigator.xr!.requestSession("immersive-ar");
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl!)
  });

  // A 'local' reference space has a native origin that is located
  // near the viewer's position at the time the session was created.
  const referenceSpace = await session.requestReferenceSpace('local');

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time:DOMHighResTimeStamp, frame: XRFrame) => {
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
  } catch (error) {
    if (error instanceof NotSupportedError) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
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
