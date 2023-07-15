<template>
    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-6 mfm-root mb-4 relative overflow-hidden">
        <div class="absolute top-0 left-0 px-1 py-0.5 text-xs bg-slate-200 dark:bg-slate-800 rounded-br-lg z-20">{{ $t('_content.preview') }}</div>
        <MkMfm :text="text" />
    </div>
</template>

<script setup lang="ts">
import MkMfm from '@/components/mk/Mfm';

defineProps<{
    text: string;
}>();
</script>
