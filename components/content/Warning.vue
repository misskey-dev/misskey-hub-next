<template>
    <div :class="$style.root" class="bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-25 border border-yellow-200 dark:border-yellow-500 rounded-lg px-4 py-3 mb-4">
        <div v-if="props.label !== null" class="mb-1.5 text-sm font-sans text-orange-600 dark:text-yellow-300">
            <WarnIco class="mr-1" />{{ realLabel }}
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import WarnIco from 'bi/exclamation-triangle.svg';
const { t } = useI18n();

const props = defineProps<{
    label?: string | null;
}>();

const realLabel = computed(() => props.label ? props.label : t('_content.warning'));
</script>

<style module>
.root > :global(:last-child) {
    margin-bottom: 0;
}
</style>