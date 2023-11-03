<template>
    <div>
        <GHero>
            <template #title>{{ $t('_aboutUs.title') }}</template>
            <template #description>
                {{ $t('_aboutUs.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64 h-64 flex items-center">
                        <img class="drop-shadow-xl rounded-xl" src="/img/misc/midev.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6 lg:space-y-8">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style>
</style>