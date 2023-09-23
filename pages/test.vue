<template>
    <div>
        <GNuxtLink :to="localePath('/docs///')">Link</GNuxtLink>
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style scoped>

</style>