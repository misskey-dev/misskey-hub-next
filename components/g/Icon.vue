<template>
    <Component :is="g" />
</template>

<script setup lang="ts">
import icons from 'bootstrap-icons/font/bootstrap-icons.json';

const props = defineProps<{
    icon: keyof typeof icons;
}>();

const g = defineAsyncComponent(() => import(`../../node_modules/bootstrap-icons/icons/${props.icon}.svg`));
</script>

<style scoped>

</style>