<template>
  <!-- 全屏容器作为 Three.js 的渲染画布 -->
  <canvas ref="canvas"
          class="ar-container"></canvas>

  <div ref="uidiv">
    <p>
      Overlay
    </p>
    <button @click="startAR"
            class="ar-button text-red-600">Start AR</button>

    <button class="text-red-600"
            @click="extractORBFromCamera">captureFrame</button>
  </div>

  <canvas ref="tempcanvas"></canvas>

</template>

<script setup lang="ts">
import { ref } from 'vue'
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
let gl: WebGL2RenderingContext | null = null
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderTarget: THREE.WebGLRenderTarget | null = null
let sessionxr: XRSession | null = null
let xrGlBinding: XRWebGLBinding | null = null
let _last_pose: XRViewerPose | null = null
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
    optionalFeatures: ["camera-access", "dom-overlay"],
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
    _last_pose = pose || _last_pose;
    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];
      const viewport = sessionxr!.renderState.baseLayer!.getViewport(view);
      renderer!.setSize(viewport!.width, viewport!.height)

      if (onNewFrameCapture) {
        // @ts-expect-error
        const frameData = getCameraFrameData(view.camera);
        onNewFrameCapture(frameData);
      }

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
let corners: jsfeat.keypoint_t[] = [];
let descriptors = new jsfeat.matrix_t(32, 500, jsfeat.U8_t | jsfeat.C1_t); // ORB 描述符 (最多 500 个关键点)

function initJsFeat() {
  img_u8_mat_t = new jsfeat.matrix_t(canvas.value!.width, canvas.value!.height, jsfeat.U8C1_t);
}

function getCameraFrameData(xrCamera: any) {
  // @ts-expect-error
  const cameraTexture = xrGlBinding!.getCameraImage(xrCamera);
  // console.log("Camera texture:", cameraTexture);
  if (!gl) throw new NotSupportedError("WebGL2 not supported");
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
  // 处理像素数据，例如进行图像分析或特征提取

  const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);

  return imageData;
}


// https://github.com/immersive-web/raw-camera-access/blob/main/explainer.md
let onNewFrameCapture: ((frame: ImageData) => void) | null = null;
function captureFrame(): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout"));
    }, 100);

    onNewFrameCapture = (frame: ImageData) => {
      clearTimeout(timeout);
      resolve(frame);
      onNewFrameCapture = null;
    };
  });
}

function convertToGrayV2(imageData: ImageData) {
  const img_u8_mat_t = new jsfeat.matrix_t(imageData.width, imageData.height, jsfeat.U8C1_t);
  const w = imageData.width, h = imageData.height;
  const data = imageData.data; // RGBA 数据

  for (let i = 0; i < w * h; i++) {
    const r = data[i * 4];      // Red
    const g = data[i * 4 + 1];  // Green
    const b = data[i * 4 + 2];  // Blue

    // 灰度化 (常见加权方法)
    img_u8_mat_t.data[i] = (r * 0.3 + g * 0.59 + b * 0.11);
  }

  return img_u8_mat_t;
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

function getPose() {
  return {
    position: _last_pose?.transform.position,
    rotation: _last_pose?.transform.orientation
  }
}

function convertOrbToFloat32(matrix: any): number[][] {
  let descriptors: number[][] = [];
  for (let i = 0; i < matrix.rows; i++) {
    let descriptor: number[] = [];
    for (let j = 0; j < matrix.cols; j++) {
      descriptor.push(matrix.data[i * matrix.cols + j] / 255.0); // 归一化到 [0,1]
    }
    descriptors.push(descriptor);
  }
  return descriptors;
}

async function extractORBFromCamera() {
  // const img_u8_mat_t = new jsfeat.matrix_t(canvas.value!.width, canvas.value!.height, jsfeat.U8C1_t);

  const imageData = await captureFrame();
  const img_u8_mat_t = convertToGrayV2(imageData);

  const corners = new Array(
    img_u8_mat_t.cols * img_u8_mat_t.rows
  ).fill(0).map(() => new jsfeat.keypoint_t(0, 0, 0, 0));

  const num_corners = detect_keypoints(img_u8_mat_t, corners, 256);
  const cols = 32; // 32 Bytes / 256 BIT descriptor
  const rows = num_corners; // descriptors stored per row
  const descriptors = new jsfeat.matrix_t(cols, rows, jsfeat.U8_t | jsfeat.C1_t);
  jsfeat.orb.describe(img_u8_mat_t, corners, num_corners, descriptors);
  console.log("Detected ORB descriptors:", convertOrbToFloat32(descriptors));
  return descriptors
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
