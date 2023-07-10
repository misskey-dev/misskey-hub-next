<template>
    <div>
        <GHero>
            <template #title>{{ $t('_docs.title') }}</template>
            <template #description>
                {{ $t('_seo.defaultDescription') + $t('_docs.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-72 rotate-6">
                        <img class="drop-shadow-xl" src="/img/emojis/green_book_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="mb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6 lg:space-y-8">
                <GLocalNav :items="[
                    {
                        name: $t('_docs._forUsers.title'),
                        anchor: '#forUsers',
                    },
                    {
                        name: $t('_docs._forAdmin.title'),
                        anchor: '#forAdmin',
                    },
                    {
                        name: $t('_docs._forDevelopers.title'),
                        anchor: '#forDevelopers',
                    }
                ]" />
                <GNuxtLink :to="useLocalePath('/docs/about')" class="rounded-xl border border-slate-200 dark:border-accent-900 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 p-4 sm:pt-0 sm:pb-0 sm:pl-6 sm:pr-0 overflow-hidden flex">
                    <div class="flex flex-col justify-center">
                        <h2 class="text-xl sm:text-2xl font-bold mb-2">{{ $t('_docs._aboutMisskey.title') }}<ArrowRightIco class="ml-2" /></h2>
                        <p class="text-slate-500 dark:text-slate-300">{{ $t('_docs._aboutMisskey.description') }}</p>
                    </div>
                    <div class="hidden sm:block ml-auto flex-shrink-0 relative pt-4 pr-4 h-48 w-auto">
                        <GDots class="absolute top-0 right-0 h-20 w-20 text-accent-600" />
                        <GDots class="absolute bottom-0 -left-2 h-14 w-20 text-accent-600" />
                        <img class="relative h-full" src="/img/docs/mi_ai_docs.png" />
                    </div>
                </GNuxtLink>
                <DocsReadersNav section-id="forUsers" id="forUsers" />
                <DocsReadersNav section-id="forAdmin" id="forAdmin" />
                <DocsReadersNav section-id="forDevelopers" id="forDevelopers" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowRightIco from 'bi/arrow-right.svg';

const localePath = useLocalePath();
</script>

<style scoped>

</style>