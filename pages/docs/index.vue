<template>
    <div>
        <GHero>
            <template #title>{{ $t('_docs.title') }}</template>
            <template #description>
                {{ $t('_docs.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64 rotate-6">
                        <img class="drop-shadow-xl" src="/img/emojis/green_book_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 pt-6 bg-white dark:bg-neutral-950">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6 lg:space-y-12">
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
                    },
                    {
                        name: $t('other'),
                        anchor: '#other',
                    },
                ]" />
                <GLargeLinks :items="[
                    {
                        to: localePath('/docs/about-misskey/'),
                        title: $t('_docs._aboutMisskey.title'),
                        description: $t('_docs._aboutMisskey.description'),
                        img: '/img/docs/mi_ai_docs.png',
                        cutBottom: true,
                    },
                    {
                        to: localePath('/docs/releases'),
                        title: $t('_docs._changelog.title'),
                        description: $t('_docs._changelog.description'),
                        img: '/img/emojis/rocket_3d.png',
                    },
                    {
                        to: localePath('/docs/donate'),
                        title: $t('_docs._donate.title'),
                        description: $t('_docs._donate.description'),
                        img: '/img/emojis/yen_banknote_3d.png',
                    }
                ]" />
                <DocsReadersNav section-id="forUsers" id="forUsers" />
                <DocsReadersNav section-id="forAdmin" id="forAdmin" />
                <DocsReadersNav section-id="forDevelopers" id="forDevelopers" />
                <section id="other">
                    <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">
                        {{ $t('other') }}
                    </h2>
                    <GLinks :wide="true" :items="[
                        {
                            to: localePath('/about-us/'),
                            title: $t('_aboutUs.title'),
                            description: $t('_aboutUs.description'),
                        },
                    ]" />
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useGLocalePath();
const { t, locale } = useI18n();
const route = useRoute();

route.meta.title = t('_docs.title');
route.meta.description = t('_docs.description');
</script>

<style scoped>

</style>
