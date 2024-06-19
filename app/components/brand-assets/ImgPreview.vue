<template>
    <a :href="src" target="_blank">
        <div class="p-6 prevroot">
            <img :src="src" class="mx-auto w-full max-w-sm" />
        </div>
    </a>
</template>

<script setup lang="ts">
defineProps<{
    src: string;
}>();
</script>

<style scoped>
.prevroot {
    @apply rounded-lg;
    background: linear-gradient(45deg, #aaa 25%, transparent 25%, transparent 75%, #aaa 75%),
              linear-gradient(45deg, #aaa 25%, transparent 25%, transparent 75%, #aaa 75%);
    background-color: #888;
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
}
</style>