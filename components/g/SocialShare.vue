<template>
    <div class="text-center">
        <h2 class="font-bold text-lg mb-4">{{ $t('share') }}</h2>
        <div class="mb-6 flex items-center justify-center w-full space-x-4">
            <GNuxtLink :to="miShareUrl" target="_blank" class="h-12 p-3 flex items-center rounded-full bg-accent-600 hover:opacity-80 text-white"><MiIco class="w-7 h-7" /><span class="sr-only">Misskey</span><div class="ml-1.5 font-bold">{{ $t('note') }}</div></GNuxtLink>
            <GNuxtLink :to="taittsuuShareUrl" target="_blank" class="w-12 h-12 p-3 rounded-full bg-[#999] dark:bg-[#666] hover:opacity-80 text-white"><TaittsuuIco class="w-6 h-6" /><span class="sr-only">タイッツー</span></GNuxtLink>
            <GNuxtLink :to="mtdShareUrl" target="_blank" class="w-12 h-12 p-3 rounded-full bg-[#563ACC] hover:opacity-80 text-white"><MastoIco class="w-6 h-6" /><span class="sr-only">Mastodon</span></GNuxtLink>
            <GNuxtLink :to="twShareUrl" target="_blank" class="w-12 h-12 p-3 rounded-full bg-black dark:bg-neutral-700 hover:opacity-80 text-white"><TwitterXIco class="w-6 h-6" /><span class="sr-only">X (Twitter)</span></GNuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { withQuery } from 'ufo';

import MiIco from '@/assets/svg/misskey_mi_bi.svg';
import TaittsuuIco from '@/assets/svg/taittsuu_bi.svg';
import MastoIco from 'bi/mastodon.svg';
import TwitterXIco from 'bi/twitter-x.svg';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const props = defineProps<{
    url?: string;
    text?: string;
}>();

const _url = computed(() => props.url ?? runtimeConfig.public.baseUrl + route.fullPath);
const _text = computed(() => props.text ?? route.meta.title + ' - Misskey Hub');

const miShareUrl = computed(() => withQuery('https://misskey-hub.net/share', {
    text: _text.value,
    url: _url.value,
}));

const taittsuuShareUrl = computed(() => withQuery('https://taittsuu.com/share', {
    text: _text.value + '\n' + _url.value,
}));

const mtdShareUrl = computed(() => withQuery('https://donshare.net/share.html', {
    text: _text.value,
    url: _url.value,
}));

const twShareUrl = computed(() => withQuery('https://twitter.com/share', {
    text: _text.value,
    url: _url.value,
}));
</script>

<style scoped>

</style>