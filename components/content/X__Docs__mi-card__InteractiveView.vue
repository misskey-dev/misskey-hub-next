<template>
    <div v-if="show">
        <model-viewer
            src="/gltf/micard.glb"
            ar
            environment-image="/hdr/micard.hdr"
            shadow-intensity="1"
            auto-rotate
            auto-rotate-delay="0"
            camera-controls
            camera-orbit="0deg 50deg 100%"
            touch-action="pan-y"
            :class="$style.modelViewer"
        >
        </model-viewer>
    </div>
    <button v-else @click="toggleShow" class="w-full h-auto aspect-[2] bg-black rounded-lg flex items-center">
        <div class="w-full text-white text-center">
            <div class="font-bold text-sm"><BoxIco class="mr-1" />{{ $t('threeDimensionModel') }}</div>
            <div class="text-xs">{{ $t('clickToShow') }}</div>
        </div>
    </button>
</template>

<script setup lang="ts">
import BoxIco from 'bi/box.svg';

const show = ref<boolean>(false);

async function toggleShow() {
    await import('@google/model-viewer');
    nextTick(() => {
        show.value = true;
    });
}
</script>

<style module>
.modelViewer {
    @apply rounded-lg;

    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 2;
}
</style>
