<template>
    <iframe
        v-if="isEnabledAiChanMode"
        @load="initAiChan()"
        class="transition-opacity duration-1000"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
        loading="lazy"
        ref="live2d"
        src="https://misskey-dev.github.io/mascot-web/?scale=2&y=1.4"
    ></iframe>
</template>

<script setup lang="ts">
const live2d = shallowRef<HTMLIFrameElement>();
const loaded = ref(false);
const isUwu = useState<boolean>('miHub_uwu');

const isEnabledAiChanMode = useState('miHub_aichan_mode', () => {
    if (!import.meta.client) return false;
    let value = ((localStorage.getItem('miHub_aichan_mode') ?? '') == 'true' || (isUwu.value && window.innerWidth >= 1440));

    // migration
    if (!localStorage.getItem('miHub_aichan_mode') && localStorage.getItem('aimode') && !isUwu.value) {
        value = ((localStorage.getItem('aimode') ?? '') == 'true');
    }

    return value;
});

if (import.meta.client) {
    function messageEventHandler(ev: MessageEvent) {
        if (ev.origin === 'https://misskey-dev.github.io' && ev.data.type === 'loaded') {
            loaded.value = true;
            window.removeEventListener('message', messageEventHandler);
        }
    }

    window.addEventListener('message', messageEventHandler);
}

function initAiChan() {
    if (!live2d.value) return;

    const iframeRect = live2d.value.getBoundingClientRect();
    window.addEventListener('mousemove', ev => {
        if (!live2d.value) return;

        live2d.value.contentWindow?.postMessage({
            type: 'moveCursor',
            body: {
                x: ev.clientX - iframeRect.left,
                y: ev.clientY - iframeRect.top,
            },
        }, '*');
    }, { passive: true });
    window.addEventListener('touchmove', ev => {
        if (!live2d.value) return;
        
        live2d.value.contentWindow?.postMessage({
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
    background: transparent;
    color-scheme: light dark;
}
</style>