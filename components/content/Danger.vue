<template>
    <div class="root bg-red-100 dark:bg-red-900 dark:bg-opacity-25 border border-red-200 dark:border-red-500 rounded-lg px-4 py-3 mb-4">
        <div class="mb-1.5 text-sm font-sans text-red-700 dark:text-red-300">
            <GIcon :icon="'fire'" class="mr-1" />{{ realLabel }}
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
    label?: string;
}>();

const realLabel = computed(() => props.label ? props.label : t('_content.danger'));
</script>

<style scoped>
.root > ::v-deep(*:last-child) {
    margin-bottom: 0;
}
</style>