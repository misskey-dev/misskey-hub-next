<template>
    <header>
        <div class="container mx-auto max-w-(--breakpoint-xl) px-6 lg:min-h-[330px] py-4 space-y-6 lg:space-y-0 lg:flex items-center justify-between lg:space-x-6">
            <div class="max-w-lg mx-auto lg:mx-0">
                <h1 class="font-title font-bold text-center lg:text-start text-2xl lg:text-4xl leading-relaxed! mb-4"><slot name="title"></slot></h1>
                <p class="opacity-90 text-center lg:text-start lg:text-lg lg:leading-relaxed max-w-lg"><slot name="description"></slot></p>
            </div>
            <div>
                <slot name="icon"></slot>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>