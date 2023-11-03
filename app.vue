<script setup lang="ts">
import NProgress from 'nprogress';
import type { Graph, Thing } from 'schema-dts';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();
const baseUrl = useRuntimeConfig().public.baseUrl as string;

router.beforeEach((to, from) => {
    if (to.path === from.path) return;
    NProgress.start();
});
router.afterEach((to, from) => {
    if (to.path === from.path) return;
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

const head = useLocaleHead({
    addSeoAttributes: true
});

/** 
 * 中国大陸で Google Fonts を使う裏技
 * fonts.googleapis.com → fonts.googleapis.cn
 **/
const cnHead = (locale.value === 'cn') ? [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.cn/css2?family=Capriola&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap' }
] : [];

useHead((): Record<string, any> => ({
    htmlAttrs: {
        lang: locale.value,
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
        ...(head.value.link?.map((e) => ({ rel: e.rel, href: (e.href.endsWith('/') ? e.href : e.href + '/'), hreflang: e.hreflang, })) || []),
        ...cnHead,
    ],
    script: [
        { type: "application/ld+json", children: getLdJson(route.meta.graph) }
    ],
}));
</script>
<template>
    <div class="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-gray-900">
        <NuxtIsland name="commonNoScript">
            <noscript class="block bg-accent-800 text-white text-center py-1.5 px-3 keep-all relative z-[10005]">Please turn
                on Javascript from your browser's settings.</noscript>
        </NuxtIsland>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <ClientOnly>
            <LazyGAiChan />
        </ClientOnly>
    </div>
</template>
