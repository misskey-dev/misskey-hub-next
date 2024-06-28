<template>
    <div class="pt-12">
        <div class="mx-auto max-w-screen-xl">
            <GHero class="bg-white dark:bg-slate-950 mx-6 px-3 py-5 rounded-2xl">
                <template #title>{{ $t('_tools.title') }}</template>
                <template #description>
                    {{ $t('_tools.description') }}
                </template>
                <template #icon>
                    <div class="hidden lg:block relative px-6 py-8">
                        <GDots class="absolute top-0 left-0 w-28 h-28 text-accent-600" />
                        <GDots class="absolute bottom-0 right-0 w-28 h-28 text-accent-600" />
                        <div class="relative lg:w-48 h-48 flex items-center">
                            <img class="drop-shadow-xl hoverTada" src="/img/emojis/toolbox_3d.png" />
                        </div>
                    </div>
                </template>
            </GHero>
        </div>
        <div class="pb-12 pt-6">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6">
                <GLocalNav :items="sections.map((v) => ({
                    name: $t(v.title),
                    anchor: '#' + v.title.replaceAll('.', '_'),
                }))" />
                <section :id="section.title.replaceAll('.', '_')" v-for="section in sections">
                    <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">
                        {{ $t(section.title) }}
                    </h2>
                    <GLinks :wide="true" :gray="true" :items="section.items.map((e) => ({
                        title: $t(e.i18n),
                        description: $t(e.description),
                        to: localePath(e.to),
                    }))" />
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import sections from '@/assets/data/toolsNav';

definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const localePath = useGLocalePath();
const route = useRoute();

route.meta.title = t('_tools.title');
route.meta.description = t('_tools.description');
</script>

<style module>
.mfmRoot {
    @apply rounded-lg p-6 border break-words overflow-hidden;
    font-family: Hiragino Maru Gothic Pro,BIZ UDGothic,Roboto,HelveticaNeue,Arial,sans-serif;
    line-height: 1.35;
}

.mfmRoot img {
    display: inline;
}
</style>