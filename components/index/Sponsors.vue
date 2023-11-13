<template>
    <div>
        <h2 class="mb-12 text-2xl lg:text-3xl text-center font-bold">{{ $t('_landing._sponsors.title') }}</h2>
        <div class="mx-auto max-w-screen-lg gap-8 grid items-center lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
            <!-- スポンサーはscriptタグから追加してください -->
            <GNuxtLink
                v-for="sponsor in sponsors"
                :to="sponsor.to"
                target="_blank"
                class="block aspect-square bg-white overflow-clip"
                :class="[
                    { 'p-5': !sponsor.noMargin },
                    { 'rounded-full': !sponsor.noRounded }
                ]"
            >
                <img :src="sponsor.img" class="w-full h-full object-contain" />
            </GNuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
type Sponsor = {
    /** 画像URL */
    img: string;
    /** イメージにマージンを設けない場合はこちら */
    noMargin?: boolean;
    /** イメージを角丸にしない場合はこちら */
    noRounded?: boolean;
    /** 外部ページURL */
    to?: string;
};

const sponsors: Sponsor[] = [
    {
        img: '/img/sponsors/mask.svg',
        to: 'https://mask.io/',
    },
    {
        img: '/img/sponsors/rss3.svg',
        noMargin: true,
        to: 'https://rss3.io/',
    },
    {
        img: '/img/sponsors/skeb.svg',
        to: 'https://skeb.jp/',
    },
    {
        img: '/img/sponsors/dcadvirth.png',
        noMargin: true,
        noRounded: true,
        to: 'https://www.dotchain.ltd/advirth',
    },
    {
        img: '/img/sponsors/xserver.png',
        noMargin: true,
        to: 'https://www.xserver.ne.jp/',
    }
];
</script>

<style scoped>

</style>
