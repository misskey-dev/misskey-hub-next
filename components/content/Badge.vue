<template>
    <span
        class="inline-block rounded-full"
        :class="[
            $style.badgeRoot,
            { 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200': color === 'yellow' },
            { 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200': color === 'green' },
            { 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200': color === 'red' },
            { 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200': color === 'blue' },
            { 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200': color === 'purple' },
            { 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200': !color || color === 'gray' },
        ]"
    >
        {{ label }}
    </span>
</template>

<script setup lang="ts">
defineProps<{
    color?: 'yellow' | 'green' | 'red' | 'blue' | 'purple' | 'gray';
    label: string;
}>();
</script>

<style module>
.badgeRoot {
    font-size: .5em;
    padding: .25em .5em;
    line-height: 1;
}
</style>