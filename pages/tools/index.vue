<template>
    <div>
        <GHero>
            <template #title>{{ $t('_tools.title') }}</template>
            <template #description>
                {{ $t('_tools.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64 h-64 flex items-center">
                        <img class="drop-shadow-xl toolsHeroToolbox" src="/img/emojis/toolbox_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6 lg:space-y-8">
                <GLocalNav :items="sections.map((v) => ({
                    name: $t(v.title),
                    anchor: '#' + v.title.replaceAll('.', '_'),
                }))" />
                <section :id="section.title.replaceAll('.', '_')" v-for="section in sections">
                    <h2 class="text-2xl lg:text-3xl font-bold mb-4">
                        {{ $t(section.title) }}
                    </h2>
                    <GLinks :wide="true" :items="section.items.map((e) => ({
                        title: $t(e.i18n),
                        description: $t(e.description),
                        to: localePath(e.to),
                    }))" />
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import sections from '@/assets/data/toolsNav';

const localePath = useLocalePath();
</script>

<style>
.toolsHeroToolbox:hover {
animation: .75s linear 0s 1 normal both running tada;
}
</style>