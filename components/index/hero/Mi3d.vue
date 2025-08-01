<template>
<canvas width="500" height="500" style="display: block; width: 500px; height: 500px;" ref="canvas"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { DebugEnvironment } from 'three/addons/environments/DebugEnvironment.js';

const canvasEl = useTemplateRef('canvas');

const loader = new GLTFLoader();

let renderer: THREE.WebGLRenderer;

onMounted(() => {
	loader.load('/gltf/mi.glb', (gltf) => {
		if (!canvasEl.value) {
			console.error('Canvas element not found');
			return;
		}

		const rect = canvasEl.value.getBoundingClientRect();
		const aspectRatio = rect.width / rect.height;

		const scene = new THREE.Scene();
		
		const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 1000);
		camera.position.z = 1.5;

		const light = new THREE.DirectionalLight(0xffffff, 3);
		light.position.set(10, 10, 10);
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.radius = 5;
		light.shadow.normalBias = 0.01;
		light.shadow.camera.far = 1000;
		light.shadow.blurSamples = 16;
		camera.add(light);

		scene.add(camera);

		const controls = new OrbitControls(camera, canvasEl.value);
		controls.enableDamping = true;
		controls.enableZoom = false;
		controls.enablePan = false;
		controls.enableRotate = true;
		controls.autoRotate = true;
		controls.target.set(0, 0, 0);

		renderer = new THREE.WebGLRenderer({
			canvas: canvasEl.value,
			alpha: true,
			antialias: true,
		});
		renderer.toneMapping = THREE.CineonToneMapping;
		renderer.toneMappingExposure = 0.9;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		//renderer.shadowMap.type = THREE.VSMShadowMap;
		renderer.setPixelRatio(2);
		renderer.setAnimationLoop(render);

		const pmremGenerator = new THREE.PMREMGenerator( renderer );
		pmremGenerator.compileCubemapShader();

		const envScene = new DebugEnvironment();
		const generatedCubeRenderTarget = pmremGenerator.fromScene(envScene);

		const material = new THREE.MeshPhysicalMaterial({
			color: 0x87E700,
			roughness: 0,
			metalness: 0,
			clearcoat: 1,
			clearcoatRoughness: 0,
			ior: 1,
			reflectivity: 0,
			iridescence: 0,
		});

		gltf.scene.traverse((child: THREE.Object3D & { material?: THREE.MeshPhysicalMaterial; }) => {
			if ('isMesh' in child && child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
				child.material = material;
				child.material.envMap = generatedCubeRenderTarget.texture;
				child.material.needsUpdate = true;
			}
		});

		gltf.scene.scale.set(20, 20, 20);
		scene.add(gltf.scene);

		let lastRenderTime: number | null = null;

		function render(timestamp: DOMHighResTimeStamp) {
			if (lastRenderTime == null) {
				lastRenderTime = timestamp;
			}

			const deltaTime = (timestamp - lastRenderTime) / 1000; // Convert to seconds

			controls.update(deltaTime);
			renderer.render(scene, camera);

			lastRenderTime = timestamp;
		}

		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible') {
				renderer.setAnimationLoop(render);
			} else {
				renderer.setAnimationLoop(null);
				lastRenderTime = null;
			}
		});
	});
});

onBeforeUnmount(() => {
	if (renderer) {
		renderer.dispose();
	}
});
</script>

<style module>

</style>
