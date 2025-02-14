<template>
  <!-- 全屏容器作为 Three.js 的渲染画布 -->
  <canvas ref="canvas"
          class="ar-container"></canvas>

  <div ref="uidiv">
    <button @click="startAR"
            class="ar-button text-red-600">Start AR</button>

    <button class="text-red-600"
            @click="analyseFrameORB">captureFrame</button>
  </div>

  <canvas ref="tempcanvas"></canvas>

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
const tempcanvas = ref<HTMLCanvasElement | null>(null)
const uidiv = ref<HTMLCanvasElement | null>(null)
let gl: WebGL2RenderingContext | null
let renderer: THREE.WebGLRenderer | null
let scene: THREE.Scene | null
let camera: THREE.PerspectiveCamera | null
let renderTarget: THREE.WebGLRenderTarget | null
let sessionxr: XRSession | null
let xrGlBinding: XRWebGLBinding | null

async function init() {
  gl = canvas.value!.getContext("webgl2", { xrCompatible: true, preserveDrawingBuffer: true });
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
  camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

  // Initialize a WebXR session using "immersive-ar".
  sessionxr = await navigator.xr!.requestSession("immersive-ar", {
    domOverlay: { root: uidiv.value! },
    optionalFeatures: ["dom-overlay", "camera-access"],

  });
  sessionxr.updateRenderState({
    baseLayer: new XRWebGLLayer(sessionxr, gl!)
  });
  xrGlBinding = new XRWebGLBinding(sessionxr!, gl!);

  // A 'local' reference space has a native origin that is located
  // near the viewer's position at the time the session was created.
  const referenceSpace = await sessionxr.requestReferenceSpace('local');

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time: DOMHighResTimeStamp, frame: XRFrame) => {
    // Queue up the next draw request.
    sessionxr!.requestAnimationFrame(onXRFrame);


    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, sessionxr!.renderState.baseLayer!.framebuffer)

    // Retrieve the pose of the device.
    // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
    const pose = frame.getViewerPose(referenceSpace);
    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];
      const viewport = sessionxr!.renderState.baseLayer!.getViewport(view);
      renderer!.setSize(viewport!.width, viewport!.height)

      // @ts-expect-error
      const cameraTexture = xrGlBinding!.getCameraImage(view.camera);
      // console.log("Camera texture:", cameraTexture);
      if (!gl) return;
      // 创建帧缓冲区并绑定摄像头纹理
      const framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, cameraTexture, 0);

      // 读取像素数据
      const width = gl.drawingBufferWidth;
      const height = gl.drawingBufferHeight;
      const pixels = new Uint8Array(width * height * 4);
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

      // 解绑帧缓冲区
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      console.log("Camera pixels:", pixels); //XXX YEEES!
      // 处理像素数据，例如进行图像分析或特征提取


      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      camera!.matrix.fromArray(view.transform.matrix)
      camera!.projectionMatrix.fromArray(view.projectionMatrix);
      camera!.updateMatrixWorld(true);

      // Render the scene with THREE.WebGLRenderer.
      renderer!.render(scene!, camera!)

    }
  }
  sessionxr!.requestAnimationFrame(onXRFrame);
}

async function startAR() {
  try {
    initJsFeat()
    await init()
  } catch (error) {
    if (error instanceof NotSupportedError) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
}

let img_u8_mat_t: any;
const corners: jsfeat.keypoint_t[] = [];
let descriptors = new jsfeat.matrix_t(32, 500, jsfeat.U8_t | jsfeat.C1_t); // ORB 描述符 (最多 500 个关键点)

function initJsFeat() {
  img_u8_mat_t = new jsfeat.matrix_t(canvas.value!.width, canvas.value!.height, jsfeat.U8C1_t);
}

// https://github.com/immersive-web/raw-camera-access/blob/main/explainer.md
function captureFrame(): ImageData {

  const gl = canvas.value!.getContext("webgl2", { xrCompatible: true, preserveDrawingBuffer: true });
  const tempCanvas = tempcanvas.value!;
  const tempCtx = tempCanvas.getContext("2d")!;
  const w = canvas.value!.width;
  const h = canvas.value!.height;

  // Read the pixels from the framebuffer.
  gl!.readPixels(0, 0, w, h, gl!.RGBA, gl!.UNSIGNED_BYTE, new Uint8Array(w * h * 4));

  // Flip the image vertically.
  const imageData = tempCtx.createImageData(w, h);



  return imageData;
}


function analyseFrameORB() {
  const imageData = captureFrame();
  convertToGray(imageData);
}

function convertToGray(imageData: ImageData) {
  const w = imageData.width, h = imageData.height;
  const data = imageData.data; // RGBA 数据

  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];      // Red
    const g = data[i * 4 + 1];  // Green
    const b = data[i * 4 + 2];  // Blue

    // 灰度化 (常见加权方法)
    img_u8_mat_t.data[i] = (r * 0.3 + g * 0.59 + b * 0.11);
  }

  detectORB(); // 运行 ORB 计算
}

function detect_keypoints(img: jsfeat.matrix_t, corners: any[], max_allowed: number) {
  // detect features
  var count = jsfeat.yape06.detect(img, corners, 17);

  // sort by score and reduce the count if needed
  if (count > max_allowed) {
    jsfeat.math.qsort(corners, 0, count - 1, function (a: any, b: any) { return (b.score < a.score); });
    count = max_allowed;
  }

  // calculate dominant orientation for each keypoint
  for (var i = 0; i < count; ++i) {
    corners[i].angle = ic_angle(img, corners[i].x, corners[i].y);
  }

  return count;
}

var u_max = new Int32Array([15, 15, 15, 15, 14, 14, 14, 13, 13, 12, 11, 10, 9, 8, 6, 3, 0]);
function ic_angle(img: jsfeat.matrix_t, px: number, py: number) {
  var half_k = 15; // half patch size
  var m_01 = 0, m_10 = 0;
  var src = img.data, step = img.cols;
  var u = 0, v = 0, center_off = (py * step + px) | 0;
  var v_sum = 0, d = 0, val_plus = 0, val_minus = 0;

  // Treat the center line differently, v=0
  for (u = -half_k; u <= half_k; ++u)
    m_10 += u * src[center_off + u];

  // Go line by line in the circular patch
  for (v = 1; v <= half_k; ++v) {
    // Proceed over the two lines
    v_sum = 0;
    d = u_max[v];
    for (u = -d; u <= d; ++u) {
      val_plus = src[center_off + u + v * step];
      val_minus = src[center_off + u - v * step];
      v_sum += (val_plus - val_minus);
      m_10 += u * (val_plus + val_minus);
    }
    m_01 += v * v_sum;
  }

  return Math.atan2(m_01, m_10);
}

function detectORB() {
  console.log("Detecting ORB features...", img_u8_mat_t);
  const num_corners = detect_keypoints(img_u8_mat_t, corners, 300);
  console.log("Detected ORB corners:", num_corners);
  const cols = 32; // 32 Bytes / 256 BIT descriptor
  const rows = num_corners; // descriptors stored per row
  descriptors = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C1_t);
  jsfeat.orb.describe(img_u8_mat_t, corners, num_corners, descriptors);

  console.log("Detected ORB features:", descriptors, corners);
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
