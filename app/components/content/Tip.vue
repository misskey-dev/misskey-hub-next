<template>
    <div class="root bg-sky-100 dark:bg-sky-900 dark:bg-opacity-25 border border-sky-200 dark:border-sky-500 rounded-lg px-4 py-3 mb-4">
        <div v-if="props.label !== null" class="mb-1.5 text-sm font-sans text-sky-700 dark:text-sky-300">
            <InfoIco class="mr-1" />{{ realLabel }}
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import InfoIco from 'bi/info-circle.svg';
const { t } = useI18n();

const props = defineProps<{
    label?: string | null;
}>();

const realLabel = computed(() => props.label ? props.label : t('_content.tip'));
</script>

<style scoped>
.root > ::v-deep(*:last-child) {
    margin-bottom: 0;
}
</style>