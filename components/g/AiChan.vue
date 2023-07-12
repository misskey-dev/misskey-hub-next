<template>
    <iframe v-if="isEnabledAiChanMode" @load="initAiChan()" ref="live2d" src="https://misskey-dev.github.io/mascot-web/?scale=2&y=1.4"></iframe>
</template>

<script setup lang="ts">
const live2d = ref<HTMLIFrameElement>();
const isEnabledAiChanMode = ref<boolean>(false);

if (process.client) {
    isEnabledAiChanMode.value = ((localStorage.getItem('miHub_aichan_mode') ?? '') == 'true');

    // migration
    if (!isEnabledAiChanMode.value) {
        isEnabledAiChanMode.value = ((localStorage.getItem('aimode') ?? '') == 'true');
    }
}

function initAiChan() {
    const iframeRect = live2d.value.getBoundingClientRect();
	window.addEventListener('mousemove', ev => {
		live2d.value?.contentWindow.postMessage({
			type: 'moveCursor',
			body: {
				x: ev.clientX - iframeRect.left,
				y: ev.clientY - iframeRect.top,
			},
		}, '*');
	}, { passive: true });
	window.addEventListener('touchmove', ev => {
		live2d.value?.contentWindow.postMessage({
			type: 'moveCursor',
			body: {
				x: ev.touches[0].clientX - iframeRect.left,
				y: ev.touches[0].clientY - iframeRect.top,
			},
		}, '*');
	}, { passive: true });
}
</script>

<style scoped>
iframe {
	position: fixed;
	bottom: 0;
	right: 0;
	width: 300px;
	height: 600px;
	border: none;
	pointer-events: none;
}
</style>