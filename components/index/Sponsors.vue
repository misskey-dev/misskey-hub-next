<template>
    <div>
        <h2 class="mb-12 text-2xl lg:text-3xl text-center font-bold font-title">{{ $t('_landing._sponsors.title') }}</h2>
        <div class="mx-auto max-w-screen-lg gap-8 grid items-center lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
            <!-- スポンサーはscriptタグから追加してください -->
            <GNuxtLink
                v-for="sponsor in sponsors"
                :to="sponsor.to"
                target="_blank"
                class="block aspect-square bg-white overflow-clip"
                :class="[
                    { 'rounded-full': !sponsor.noRounded }
                ]"
            >
                <img    
                    :src="sponsor.img"
                    class="w-full h-full object-contain"
                    :class="[
                        { 'p-5': sponsor.margin === undefined || sponsor.margin === true || sponsor.margin === 'true' },
                    ]"
                    :style="(typeof sponsor.margin === 'string' && sponsor.margin !== 'true' ? sponsor.margin : undefined)"
                />
            </GNuxtLink>
            <GNuxtLink
                :to="localePath('/docs/become-a-sponsor/')"
                class="flex flex-col p-5 items-center justify-center aspect-square bg-white hover:bg-gray-50 rounded-full border-2 border-dashed dark:border-0 hover:border-solid dark:hover:opacity-80 border-gray-300 text-gray-500"
            >
                <div class="text-center text-lg sm:text-xl" style="word-break: auto-phrase;">{{ $t('_landing._sponsors.becomeASponsor') }}<ArrowRightIco class="ml-1" /></div>
            </GNuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowRightIco from 'bi/arrow-right.svg';

type Sponsor = {
    /** 画像URL */
    img: string;
    /** イメージにマージンを設けない場合はこちら */
    margin?: boolean | string;
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
        img: '/img/sponsors/rss3.png',
        to: 'https://rss3.io/',
    },
    {
        img: '/img/sponsors/skeb.svg',
        to: 'https://skeb.jp/',
    },
    {
        img: '/img/sponsors/dcadvirth.png',
        margin: false,
        noRounded: true,
        to: 'https://www.dotchain.ltd/advirth',
    },
    {
        img: '/img/sponsors/xserver.png',
        margin: false,
        to: 'https://www.xserver.ne.jp/',
    },
    {
        img: '/img/sponsors/gmo_pepabo.svg',
        margin: 'padding: 0.625rem',
        to: 'https://pepabo.com/',
    }
];

const localePath = useGLocalePath();
</script>
