<template>
    <div>
        <GHero>
            <template #title>{{ $t('_other.title') }}</template>
            <template #description>
                {{ $t('_other.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64 h-64 flex items-center">
                        <img class="drop-shadow-xl hoverRubber" src="/img/emojis/custard_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-xl px-6 space-y-6 lg:space-y-8">
                <GLargeLinks :items="[
                    {
                        to: localePath('/brand-assets/'),
                        title: $t('_brandAssets.title'),
                        description: $t('_brandAssets.description'),
                        img: '/img/emojis/artist_palette_3d.png',
                    },
                    {
                        to: localePath('/tools/'),
                        title: $t('_tools.title'),
                        description: $t('_tools.description'),
                        img: '/img/emojis/toolbox_3d.png',
                    },
                    {
                        to: 'https://github.com/misskey-dev',
                        title: $t('_links._github.title'),
                        description: $t('_links._github.description'),
                        img: '/img/links/github.png',
                    },
                    {
                        to: 'https://crowdin.com/project/misskey',
                        title: $t('_links._crowdin.title'),
                        description: $t('_links._crowdin.description'),
                        img: '/img/links/crowdin.svg',
                    },
                    {
                        to: 'https://discord.com/invite/Wp8gVStHW3',
                        title: $t('_links._discord.title'),
                        description: $t('_links._discord.description'),
                        img: '/img/links/discord.png',
                    },
                    {
                        to: 'https://藍.moe/',
                        title: $t('_links._aiChan.title'),
                        description: $t('_links._aiChan.description'),
                        img: '/img/links/ai.png',
                        cutBottom: true,
                        cutLeft: true,
                    },
                    {
                        to: localePath('/about-us/'),
                        title: $t('_aboutUs.title'),
                        description: $t('_aboutUs.description'),
                        img: '/img/misc/midev.png',
                    },
										{
                        to: localePath('/contact/'),
                        title: $t('_contact.title'),
                        description: $t('_contact.description'),
                        img: '/img/emojis/envelope_3d.png',
                    },
                ]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useGLocalePath();
const route = useRoute();

route.meta.title = t('_other.title');
route.meta.description = t('_other.description');
</script>
