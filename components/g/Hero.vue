<template>
    <header class="lg:py-12">
        <div class="container mx-auto max-w-screen-xl p-6 lg:min-h-[330px] gap-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-lg mx-auto lg:mx-0">
                <h1 class="font-title font-bold text-center lg:text-start text-2xl lg:text-4xl !leading-relaxed mb-4"><slot name="title"></slot></h1>
                <p class="opacity-90 text-center lg:text-start lg:text-lg lg:leading-relaxed max-w-lg"><slot name="description"></slot></p>
            </div>
            <div class="hidden lg:block">
                <slot name="icon"></slot>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>