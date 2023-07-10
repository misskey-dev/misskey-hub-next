<template>
    <div class="root bg-sky-100 dark:bg-sky-900 dark:bg-opacity-25 border border-sky-200 dark:border-sky-500 rounded-lg px-4 py-3 mb-4">
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