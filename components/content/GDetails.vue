<script setup lang="ts">
defineProps<{
    summary?: string;
}>();
</script>
<template>
    <details class="group my-4">
        <summary class="cursor-pointer outline-none p-2 border dark:border-slate-800 rounded-lg bg-white dark:bg-slate-700 shadow-md group-open:rounded-b-none group-open:bg-slate-200 dark:group-open:bg-slate-800 group-open:shadow-none group-open:border-b-0">
            {{summary}}
        </summary>
        <div class="rounded-b-lg border dark:border-slate-800 p-3 bg-white dark:bg-slate-900 space-y-2">
            <slot></slot>
        </div>
    </details>
</template>
<style scoped>
summary::after {
    @apply text-sm hidden md:inline;
    content: "（クリックで展開）";
}
</style>