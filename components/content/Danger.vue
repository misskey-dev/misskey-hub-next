<template>
    <div class="root bg-red-100 dark:bg-red-900 dark:bg-opacity-25 border border-red-200 dark:border-red-500 rounded-lg px-4 py-3 mb-4">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.root > ::v-deep(*:last-child) {
    margin-bottom: 0;
}
</style>