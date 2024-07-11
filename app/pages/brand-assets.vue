<template>
    <div>
        <GHero>
            <template #title>{{ $t('_brandAssets.title') }}</template>
            <template #description>
                {{ $t('_brandAssets.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/artist_palette_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
                <GLocalNav :items="[
                    {
                        name: $t('_brandAssets.logo'),
                        anchor: '#logo',
                    },
                    {
                        name: $t('_brandAssets.icon'),
                        anchor: '#icon',
                    },
                    {
                        name: $t('_brandAssets.banner'),
                        anchor: '#banner',
                    },
                    {
                        name: $t('_brandAssets.avatarDecorationTemplate'),
                        anchor: '#avatar-decoration'
                    }
                ]" />
                <Tip>
                    <p class="mb-2">{{ $t('_brandAssets.license') }}</p>
                    <GNuxtLink class="inline-block" to="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank"><img src="https://licensebuttons.net/l/by-sa/4.0/88x31.png" /></GNuxtLink>
                </Tip>
                <div id="logo">
                    <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_brandAssets.logo`) }}</h2>
                    <BrandAssetsImgPreview src="https://assets.misskey-hub.net/public/misskey.svg" />
                </div>
                <div id="icon">
                    <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_brandAssets.icon`) }}</h2>
                    <BrandAssetsImgPreview src="https://assets.misskey-hub.net/public/icon.png" />
                </div>
                <div id="banner">
                    <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_brandAssets.banner`) }}</h2>
                    <a class="mb-4 block mx-auto" href="https://assets.misskey-hub.net/public/banner.png" target="_blank">
                        <img class="border border-slate-200 dark:border-slate-700" src="https://assets.misskey-hub.net/public/banner.png" />
                    </a>
                    <a class="block mx-auto" href="https://assets.misskey-hub.net/public/banner-2.png" target="_blank">
                        <img class="border border-slate-200 dark:border-slate-700" src="https://assets.misskey-hub.net/public/banner-2.png" />
                    </a>
                </div>
                <div id="avatar-decoration">
                    <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_brandAssets.avatarDecorationTemplate`) }}</h2>
                    <BrandAssetsImgPreview src="/img/misc/avatar-decoration-template.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

route.meta.title = t('_brandAssets.title');
route.meta.description = t('_brandAssets.description');
</script>

<style scoped>

</style>