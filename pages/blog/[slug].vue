<template>
    <div>
        <div class="mx-auto container max-w-screen-md relative px-6 py-5">
            <GNuxtLink :to="localePath('/blog/', originalLocale)" class="absolute top-2.5 left-6 p-2.5 opacity-40 hover:opacity-100 hover:-translate-x-2.5 group transition-[opacity,transform] flex items-center">
                <LeftIco class="mr-2 stroke-1 stroke-current" />
                <div class="font-bold opacity-0 group-hover:opacity-100 transition-opacity">{{ $t('_blog.back') }}</div>
            </GNuxtLink>
            <p class="text-center mb-4">{{ $t('_blog.title') }}</p>
            <h1 class="text-center font-bold text-2xl lg:text-3xl mb-4">{{ data?.title }}</h1>
            <p class="text-center">{{ $d(new Date(data?.date)) }}</p>
        </div>
        <div class="bg-white dark:bg-slate-950 pb-12 lg:mt-12 pt-6 px-6">
            <div class="mx-auto container max-w-screen-md markdown-body">
                <ContentRenderer :value="data" />
            </div>
            <div class="text-center mt-6 lg:mt-12">
                <h2 class="font-bold text-lg mb-4">{{ $t('share') }}</h2>
                <div class="mb-6 flex items-center justify-center w-full space-x-4">
                    <GNuxtLink :to="miShareUrl" target="_blank" class="h-12 p-3 flex items-center rounded-full bg-accent-600 hover:opacity-80 text-white"><MiIco class="w-7 h-7" /><span class="sr-only">Misskey</span><div class="ml-1.5 font-bold">{{ $t('note') }}</div></GNuxtLink>
                    <GNuxtLink :to="taittsuuShareUrl" target="_blank" class="w-12 h-12 p-3 rounded-full bg-[#999] dark:bg-[#666] hover:opacity-80 text-white"><TaittsuuIco class="w-6 h-6" /><span class="sr-only">タイッツー</span></GNuxtLink>
                    <GNuxtLink :to="mtdShareUrl" target="_blank" class="w-12 h-12 p-3 rounded-full bg-[#563ACC] hover:opacity-80 text-white"><MastoIco class="w-6 h-6" /><span class="sr-only">Mastodon</span></GNuxtLink>
                    <GNuxtLink :to="twShareUrl" target="_blank" class="w-12 h-12 p-3 rounded-full bg-black dark:bg-gray-700 hover:opacity-80 text-white"><TwitterXIco class="w-6 h-6" /><span class="sr-only">X (Twitter)</span></GNuxtLink>
                </div>
                <GNuxtLink :to="localePath('/blog/', originalLocale)" class="text-xl font-bold hover:opacity-70">
                    <LeftIco class="mr-2" />{{ $t('_blog.back') }}
                </GNuxtLink>
            </div>
        </div>
   </div>
</template>

<script setup lang="ts">
import LeftIco from 'bi/arrow-left.svg';
import { joinURL, parseURL, withQuery, cleanDoubleSlashes } from 'ufo';
import { isLocalPath } from '@/assets/js/misc';
import { localePathRegex } from '@/assets/data/locales';
import type { LocaleCodes } from '@/assets/data/locales';
import type { MiBlogParsedContent } from '~/types/content';

import MiIco from '@/assets/svg/misskey_mi_bi.svg';
import TaittsuuIco from '@/assets/svg/taittsuu_bi.svg';
import MastoIco from 'bi/mastodon.svg';
import TwitterXIco from 'bi/twitter-x.svg';

// 日本語でしか提供されない
defineI18nRoute({
    locales: ['ja'],
});

const route = useRoute();

// ▼他言語からやってきたときに正しいパスに戻す▼
const originalLocale = useState<LocaleCodes>('miHub_blog_originalLocale', () => 'ja');
const localePath = useGLocalePath();
let isTransformed = false;

onBeforeRouteLeave((to) => {
    if (isTransformed || !isLocalPath(to.fullPath ?? to)) {
        return;
    }

    if (isTransformed) return to;

    isTransformed = true;
    const nonLocalePath = (to.fullPath ?? to).replace(localePathRegex, '/');
    return cleanDoubleSlashes(localePath(nonLocalePath, originalLocale.value));
});
// ▲他言語からやってきたときに正しいパスに戻す▲

const runtimeConfig = useRuntimeConfig();
const { data } = await useGAsyncData(`blog-${route.params.slug}`, () => queryContent<MiBlogParsedContent>(`/blog/${route.params.slug}`).findOne());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found', fatal: true });
}

const thumbnail = !data.value.thumbnail ? undefined : (parseURL(data.value.thumbnail).host == null) ? joinURL(runtimeConfig.public.baseUrl, data.value.thumbnail) : data.value.thumbnail;

route.meta.thumbnail = thumbnail;
route.meta.title = data.value?.title;
route.meta.description = data.value?.description;

const pd = data.value.date ? new Date(data.value.date).toISOString() : undefined;

const miShareUrl = computed(() => withQuery('https://misskey-hub.net/share', {
    text: route.meta.title + ' - Misskey Hub',
    url: `${runtimeConfig.public.baseUrl}/ja/blog/${route.params.slug}/`,
}));

const taittsuuShareUrl = computed(() => withQuery('https://taittsuu.com/share', {
    text: route.meta.title + ` - Misskey Hub\n${runtimeConfig.public.baseUrl}/ja/blog/${route.params.slug}/`,
}));

const mtdShareUrl = computed(() => withQuery('https://donshare.net/share.html', {
    text: route.meta.title + ' - Misskey Hub',
    url: `${runtimeConfig.public.baseUrl}/ja/blog/${route.params.slug}/`,
}));

const twShareUrl = computed(() => withQuery('https://twitter.com/share', {
    text: route.meta.title + ' - Misskey Hub',
    url: `${runtimeConfig.public.baseUrl}/ja/blog/${route.params.slug}/`,
}));

route.meta.graph = [
    {
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${runtimeConfig.public.baseUrl}/#WebPage`,
        },
        headline: data.value.title,
        image: thumbnail,
        author: {
            "@type": "Organization",
            "@id":  `${runtimeConfig.public.baseUrl}/#Organization`,
        },
        datePublished: pd,
    },
];
</script>

<style scoped>

</style>