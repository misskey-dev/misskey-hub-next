<template>
<canvas ref="container" style="width: 100%; height: 100%;"></canvas>
</template>

<script setup lang="ts">
import ParticlesWorker from './particles-worker.js?worker'

const container = useTemplateRef('container');

let worker: Worker;

onMounted(() => {
	const canvas = container.value;
	if (canvas == null) return;

	const offscreenCanvas = canvas.transferControlToOffscreen();
	worker = new ParticlesWorker();
	worker.postMessage({ canvas: offscreenCanvas, width: canvas.offsetWidth, height: canvas.offsetHeight }, [offscreenCanvas]);
});

onUnmounted(() => {
	if (worker) {
		worker.terminate();
	}
});
</script>

<style module>

</style>
