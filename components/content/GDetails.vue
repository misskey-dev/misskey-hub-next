<script setup lang="ts">
defineProps<{
    summary?: string;
}>();

const { t } = useI18n();
const clickToExpand = computed(() => `'${t('clickToExpand')}'` === "'clickToExpand'" ? '' : `'${t('clickToExpand')}'`);
</script>
<template>
    <details class="group/global-details my-4" :style="`--details-i18n: ${clickToExpand}`">
        <summary class="cursor-pointer outline-none p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 shadow-md group-open/global-details:rounded-b-none group-open/global-details:bg-slate-200 dark:group-open/global-details:bg-slate-800 group-open/global-details:shadow-none group-open/global-details:border-b-0">
            {{summary}}
        </summary>
        <div class="rounded-b-lg border dark:border-slate-700 p-3 bg-white dark:bg-slate-900 space-y-2">
            <slot></slot>
        </div>
    </details>
</template>
<style scoped>
summary::after {
    @apply text-sm hidden md:inline;
    content: var(--details-i18n);
}
</style>