<template>
    <div class="rounded-lg border border-slate-200 dark:border-slate-800 p-6 mfm-root mb-4">
        <MkMfm :text="text" />
    </div>
</template>

<script setup lang="ts">
import MkMfm from '@/components/mk/Mfm';

defineProps<{
    text: string;
}>();
</script>
