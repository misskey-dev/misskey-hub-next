<template>
    <div class="root bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-25 border border-yellow-200 dark:border-yellow-500 rounded-lg px-4 py-3 mb-4">
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