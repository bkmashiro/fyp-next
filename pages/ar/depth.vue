<script setup lang="ts">
import * as THREE from "three";

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let depthTexture: THREE.DataTexture;
let material: THREE.ShaderMaterial;
let mesh: THREE.Mesh;
let xrSession: XRSession;
let xrReferenceSpace: XRReferenceSpace;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const depthImageCanvas = ref<HTMLCanvasElement | null>(null);


async function initXR() {
  if (!navigator.xr) {
    console.error("WebXR not supported");
    return;
  }

  xrSession = await navigator.xr.requestSession("immersive-ar", {
    requiredFeatures: ["depth-sensing"],
    depthSensing: {
      usagePreference: ["cpu-optimized", "gpu-optimized"],
      dataFormatPreference: ["luminance-alpha", "float32"]
    },
    domOverlay: {
      root: document.getElementById("overlay-container") as HTMLElement
    },
    optionalFeatures: ['dom-overlay'],
  });

  xrReferenceSpace = await xrSession.requestReferenceSpace("local");

  const gl = canvasRef.value!.getContext("webgl2", { xrCompatible: true, preserveDrawingBuffer: true });
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvasRef.value!,
    context: gl!
  });
  renderer.autoClear = false;
  renderer.xr.enabled = true;

  // 初始化 Three.js 场景
  initThreeScene();
  xrSession.updateRenderState({
    baseLayer: new XRWebGLLayer(xrSession, gl!)
  });
  xrSession.requestAnimationFrame(onXRFrame);
  console.log("XR session started", xrSession);
  console.log(xrSession.depthUsage);
  console.log(xrSession.depthDataFormat);

}

// 初始化 Three.js 场景
function initThreeScene() {
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  // camera = new THREE.PerspectiveCamera();
  // camera.matrixAutoUpdate = false;
  camera.matrixAutoUpdate = false;
  // 伪彩色着色器
  material = new THREE.ShaderMaterial({
    uniforms: {
      depthTexture: { value: null },
      minDepth: { value: 0.1 }, // 可调整
      maxDepth: { value: 3.0 } // 可调整
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D depthTexture;
      uniform float minDepth;
      uniform float maxDepth;

      vec3 jetColor(float t) {
          float r = smoothstep(0.5, 0.75, t) - smoothstep(0.75, 1.0, t);
          float g = smoothstep(0.25, 0.5, t) - smoothstep(0.75, 1.0, t);
          float b = smoothstep(0.0, 0.25, t) - smoothstep(0.5, 0.75, t);
          return vec3(r, g, b);
      }

      void main() {
          float depth = texture2D(depthTexture, vUv).r; 
          float normDepth = clamp((depth - minDepth) / (maxDepth - minDepth), 0.0, 1.0);
          gl_FragColor = vec4(jetColor(normDepth), 0.5); 
      }
    `
  });

  const planeGeometry = new THREE.PlaneGeometry(2, 2);
  mesh = new THREE.Mesh(planeGeometry, material);
  scene.add(mesh);

  // // The cube will have a different color on each side.
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

}

async function onXRFrame(time: DOMHighResTimeStamp, frame: XRFrame) {
  xrSession.requestAnimationFrame(onXRFrame);

  const pose = frame.getViewerPose(xrReferenceSpace);
  if (!pose) return;

  const imageData = await CreateDepthImageDataFromXRFrame(frame)
  if (imageData) {
    const ctx = depthImageCanvas.value!.getContext("2d");
    ctx!.putImageData(imageData, 0, 0);
  }

  renderer.render(scene, camera);
}

// 获取 WebXR 深度数据
async function getDepthDataFromXRFrame(frame: XRFrame): Promise<Float32Array | null> {
  const depthInfo = frame.getDepthInformation(frame!.getViewerPose(xrReferenceSpace)!.views[0]);
  if (!depthInfo) return null;

  const rawData = new Uint8Array(depthInfo.data); // 8-bit per channel
  const numPixels = rawData.length / 2; // 每个像素占2个字节（luminance + alpha）
  const depthData = new Float32Array(numPixels); // 存储转换后的深度

  const near = 0
  const far = 255

  for (let i = 0; i < numPixels; i++) {
    const normalizedDepth = rawData[i * 2 + 1] / 255.0; // 归一化深度
    depthData[i] = near + (far - near) * normalizedDepth; // 转换到真实世界距离
  }

  return depthData;
}

async function CreateDepthImageDataFromXRFrame(
  frame: XRFrame
): Promise<ImageData | null> {
  if (xrReferenceSpace == null) {
    return null;
  }

  const pose = frame.getViewerPose(xrReferenceSpace);
  if (pose == null) {
    return null;
  }

  const view = pose.views[0];
  const depthInfo = (frame as any).getDepthInformation(view);

  if (depthInfo == null) {
    return null;
  }

  const width: number = depthInfo.width;
  const height: number = depthInfo.height;

  const numArr = Array<number>(width * height);

  const dataArr = new Int16Array(depthInfo.data);
  for (let i = 0; i < width * height; i++) {
    numArr[i] = dataArr[i] * depthInfo.rawValueToMeters;
  }

  console.log(numArr);

  const depthLimit = 4.0;

  const colorArray = numArr
    .map((val) =>
      val <= 0.0 || val > depthLimit
        ? [0.0, 0.0, 0.0, 1.0]
        : [
          1.0 - val / depthLimit,
          1.0 - val / depthLimit,
          1.0 - val / depthLimit,
          1.0,
        ]
    )
    .flat()
    .map((val) => val * 255.0);

  const colorBuffer = new Uint8ClampedArray(colorArray);
  const imageData = new ImageData(colorBuffer, width);

  return imageData;
};

</script>

<template>
  <div><canvas ref="canvasRef"
            class="depth-canvas"></canvas>

    <button @click="initXR">startAR</button>

    <div id="overlay-container">
      <canvas ref="depthImageCanvas"
              width="160"
              height="90"></canvas>
    </div>

  </div>
</template>

<style scoped>
.depth-canvas {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
