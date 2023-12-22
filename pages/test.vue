<template>
    <div>
        <GNuxtLink :to="localePath('/docs///')">Link</GNuxtLink>
    </div>
</template>

<script setup lang="ts">
const localePath = useGLocalePath();
</script>

<style scoped>

</style>