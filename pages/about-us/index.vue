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
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-neutral-950">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6 lg:space-y-8">
                <GLargeLinks :items="[
                    {
                        to: localePath('/about-us/team/'),
                        title: $t('_aboutUs._team.title'),
                        description: $t('_aboutUs._team.description'),
                        img: '/img/emojis/technologist_3d.png',
                    },
                    {
                        to: localePath('/about-us/history/'),
                        title: $t('_historicalMaterials.title'),
                        description: $t('_historicalMaterials.description'),
                        img: '/img/emojis/classical_building_3d.png',
                    },
                ]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useGLocalePath();
const { t } = useI18n();
const route = useRoute();

route.meta.title = t('_aboutUs.title');
route.meta.description = t('_aboutUs.description');
</script>

<style></style>
