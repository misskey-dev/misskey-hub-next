<script setup lang="ts">
defineProps<{
    summary?: string;
}>();

const { t } = useI18n();
const clickToExpand = computed(() => `'${t('clickToExpand')}'` === "'clickToExpand'" ? '' : `'${t('clickToExpand')}'`);
</script>
<template>
    <details class="my-4" :class="$style.gDetails" :style="`--details-i18n: ${clickToExpand}`">
        <summary :class="$style.summary" class="cursor-pointer outline-none p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 shadow-md">
            {{summary}}
        </summary>
        <div class="rounded-b-lg border dark:border-slate-700 p-3 bg-white dark:bg-slate-900 space-y-2">
            <slot></slot>
        </div>
    </details>
</template>
<style module>
.gDetails[open] > .summary {
    @apply rounded-b-none bg-slate-200 dark:bg-slate-800 shadow-none border-b-0;
}

.summary::after {
    @apply text-sm hidden md:inline;
    content: var(--details-i18n);
}
</style>