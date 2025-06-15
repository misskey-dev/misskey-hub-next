<template>
    <div class="rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 mfm-root mb-4 relative overflow-hidden">
        <div class="absolute top-0 left-0 px-1 py-0.5 text-xs bg-neutral-200 dark:bg-neutral-800 rounded-br-lg z-20">{{ $t('_content.preview') }}</div>
        <div class="ignore" :class="$style.mfmRoot">
            <MkMfm :text="realText" baseHost="misskey.io" />
        </div>
    </div>
</template>

<script setup lang="ts">
import MkMfm from '@/components/mk/Mfm';

const props = defineProps<{
    text: string;
}>();

const realText = computed(() => props.text.replace(/\\[\s]*$/gm, '\n'));
</script>

<style module>
.mfmRoot img {
    display: inline;
}
</style>
