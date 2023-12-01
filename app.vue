<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import NProgress from 'nprogress';
import type { Graph, Thing } from 'schema-dts';
import { normalizeURL, withTrailingSlash } from 'ufo';

const nuxtApp = useNuxtApp();

const { t, locale, locales } = useI18n();
const route = useRoute();
const colorMode = useColorMode();
const baseUrl = useRuntimeConfig().public.baseUrl as string;

nuxtApp.hook('page:start', () => {
    NProgress.start();
});
nuxtApp.hook('page:finish', () => {
    nextTick(() => {
        setTimeout(() => {
            NProgress.done();
        }, 100);
    });    
});

const getDescription = (): string => {
    if (route.meta.description != null && route.meta.description != "") {
        return route.meta.description;
    } else {
        return t('_seo.defaultDescription');
    }
}
const getTitle = () => route.meta.title ? `${route.meta.title} | ${t('_seo.siteName')}` : t('_seo.siteName');
const getLdJson = (additionalGraphes: Thing[] = []): string => {
    const ldJson: Graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${baseUrl}/#Organization`,
                "name": "Misskey",
                "url": `${baseUrl}/`,
                "sameAs": [
                    "https://join.misskey.page/",
                    "https://ja.wikipedia.org/wiki/Misskey",
                ],
                "logo": {
                    "@type": "ImageObject",
                    // TODO
                    "url": `${baseUrl}/img/logo.png`
                }
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#WebPage`,
                "name": t('_seo.siteName'),
                "inLanguage": locale.value,
                "url": `${baseUrl}${route.path}`,
                "publisher": {
                    "@type": "Organization",
                    "@id": `${baseUrl}/#Organization`
                },
                "headline": getTitle(),
                "description": getDescription()
            },
        ]
    };
    ldJson['@graph'] = ldJson['@graph'].concat(additionalGraphes);
    return JSON.stringify(ldJson);
};
const currentLocaleIso = computed(() => (locales.value as LocaleObject[]).find((e) => e?.code === locale.value)?.iso);

const head = useLocaleHead({
    addSeoAttributes: true,
});

/** 
 * 中国大陸で Google Fonts を使う裏技
 * fonts.googleapis.com → fonts.googleapis.cn
 **/
const cnHead = (locale.value === 'cn') ? [
    { rel: 'preconnect', href: 'https://fonts.googleapis.cn' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.cn' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.cn/css2?family=Capriola&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap' }
] : [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Capriola&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap' },
];

useHead((): Record<string, any> => ({
    htmlAttrs: {
        lang: currentLocaleIso.value,
        'data-bs-theme': colorMode.value,
    },
    title: getTitle(),
    meta: [
        {
            name: "description",
            content: getDescription(),
        },
        {
            property: "og:title",
            content: getTitle(),
        },
        {
            property: "og:site_name",
            content: t('_seo.siteName'),
        },
        {
            property: "og:description",
            content: getDescription(),
        },
        {
            property: "og:image",
            // TODO
            content: () => route.meta.thumbnail ? route.meta.thumbnail : `${baseUrl}/img/logo.jpg`,
        },
        ...(head.value.meta?.map((e) => ({ property: e.property, content: e.content, })) || []),
    ],
    link: [
        ...(head.value.link?.map((e) => ({ rel: e.rel, href: normalizeURL(withTrailingSlash(e.href)), hreflang: e.hreflang, })) || []),
        ...cnHead,
    ],
    script: [
        { type: "application/ld+json", children: getLdJson(route.meta.graph) }
    ],
}));
</script>
<template>
    <div class="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-gray-900">
        <NuxtIsland name="GNoScript" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <ClientOnly>
            <LazyGAiChan />
        </ClientOnly>
    </div>
</template>
