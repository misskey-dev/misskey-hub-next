<template>
    <div class="mb-4">
        <ClientOnly>
            <iframe
                ref="iframe"
                :src="actualUrl"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                :class="$style.iframe"
                :style="{ height: `${iframeHeight}px` }"
            ></iframe>
            <template #fallback>
                <div class="border border-gray-200 dark:border-gray-700 mx-auto w-full max-w-[500px] p-4 rounded-lg">
                    <MkLoading />
                </div>
            </template>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';

const props = withDefaults(defineProps<{
    src: string;
    colorMode?: 'syncWithMisskeyHub' | 'auto' | 'light' | 'dark';
}>(), {
    colorMode: 'syncWithMisskeyHub',
});

const colorMode = useColorMode();

const actualUrl = computed(() => {
    if (!import.meta.client) return props.src;

    const url = new URL(props.src);

    if (props.colorMode === 'syncWithMisskeyHub') {
        url.searchParams.set('colorMode', colorMode.value);
    } else if (props.colorMode === 'auto') {
        url.searchParams.delete('colorMode');
    } else {
        url.searchParams.set('colorMode', props.colorMode);
    }

    return url.toString();
});

const iframe = useTemplateRef('iframe');
const iframeId = useId();
const iframeHeight = ref(0);

function windowEventHandler(event: MessageEvent) {
    if (!import.meta.client) return;
    if (event.source !== iframe.value?.contentWindow) return;

    if (event.data.type === 'misskey:embed:ready') {
        iframe.value?.contentWindow?.postMessage({
            type: 'misskey:embedParent:registerIframeId',
            payload: {
                iframeId,
            },
        }, '*');
    }

    if (event.data.type === 'misskey:embed:changeHeight') {
        iframeHeight.value = event.data.payload.height;
    }
}

function reset() {
    window.removeEventListener('message', windowEventHandler);
    iframeHeight.value = 0;
}

onMounted(() => {
    window.addEventListener('message', windowEventHandler);
});

onUnmounted(() => {
    reset();
});

onDeactivated(() => {
    reset();
});
</script>

<style module>
.iframe {
    display: block;
    max-width: 500px;
    width: 100%;
    min-height: 120px;
    border: none;
    color-scheme: light dark;
    margin: 0 auto;
}
</style>
