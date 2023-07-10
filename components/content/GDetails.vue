<script setup lang="ts">
defineProps<{
    summary?: string;
}>();
</script>
<template>
    <details class="group my-4">
        <summary class="cursor-pointer outline-none p-2 border rounded-lg bg-white shadow-md group-open:rounded-b-none group-open:bg-slate-200 group-open:shadow-none group-open:border-b-0">
            {{summary}}
        </summary>
        <div class="rounded-b-lg border p-3 bg-white space-y-2">
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