<script setup lang="ts">
import TopIco from 'bi/chevron-up.svg';
import { locales } from '@/assets/data/locales';
import { uwu } from '@/assets/js/misc/uwu';
import NProgress from 'nprogress';
import type { Graph, Thing } from 'schema-dts';
import type { Meta } from '@unhead/schema';
import { cleanDoubleSlashes, joinURL, parseURL, stringifyParsedURL, withTrailingSlash } from 'ufo';

const nuxtApp = useNuxtApp();

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();
const baseUrl = useRuntimeConfig().public.baseUrl as string;

// #region NProgress
router.beforeEach((to, from) => {
    if (to.path === from.path) return;
    if (!NProgress.isStarted()) {
        NProgress.start();
    }
})

nuxtApp.hook('page:loading:end', () => {
    nextTick(() => {
        setTimeout(() => {
            NProgress.done();
        }, 100);
    });    
});
// #endregion

// #region uwu
const isUwu = useState<boolean>('miHub_uwu');
if (import.meta.client) {
    isUwu.value = uwu();
}
// #endregion

// #region SEO
const getDescription = (): string => {
    if (route.meta.description != null && route.meta.description != "") {
        return route.meta.description;
    } else {
        return t('_seo.defaultDescription');
    }
}
const getTitle = () => route.meta.title ? `${route.meta.title} | ${t('_seo.siteName')}` : t('_seo.siteNameLong');
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
                    "https://ja.wikipedia.org/wiki/Misskey",
                ],
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/img/icons/icon-256x256.png`
                }
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#WebPage`,
                "name": locale.value.includes('ja') ? '【Misskeyプロジェクト公式】Misskey Hub' : t('_seo.siteName'),
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
const currentLocaleIso = computed(() => locales.find((e) => e?.code === locale.value)?.language);

const head = useLocaleHead({
    addSeoAttributes: true,
});

const i18nLinks = computed(() => head.value.link?.map((e: any) => {
    if (e.rel === 'alternate') {
        let href = e.href;
        const url = parseURL(href);
        if (typeof e.hreflang === 'string' && (e.hreflang.includes('ja') || e.hreflang === 'x-default') && e.hreflang !== 'ja-KS') {
            url.pathname = joinURL('/ja/', url.pathname);
        }
        url.search = '';
        href = cleanDoubleSlashes(withTrailingSlash(stringifyParsedURL(url)));
        return { ...e, rel: e.rel, href, hreflang: e.hreflang };
    } else if (e.rel === 'canonical' && locale.value === 'ja') {
        let href = e.href;
        const url = parseURL(href);
        url.pathname = joinURL('/ja/', url.pathname);
        url.search = '';
        href = cleanDoubleSlashes(withTrailingSlash(stringifyParsedURL(url)));
        return { ...e, rel: e.rel, href, hreflang: e.hreflang };
    }

    return e;
}));

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

useHead(() => ({
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
            content: () => route.meta.thumbnail ? route.meta.thumbnail : `${baseUrl}/img/og/misskey-hub-screenshot-l.png`,
        },
        ...(head.value.meta?.map((e: Meta) => ({ property: e.property, content: e.content, })) || []),
    ],
    link: [
        ...(i18nLinks.value || []),
        ...cnHead,
    ],
    script: [
        { type: "application/ld+json", children: getLdJson(route.meta.graph) },
    ],
}));
// #endregion

/** サイト全体でひとつのScroll Posiitionを使う */
const scrollPos = useState('miHub_global_scrollPos', () => 0);

async function updatePos() {
    scrollPos.value = document.body.getBoundingClientRect().y;
}

if (import.meta.client) {
    window.addEventListener('scroll', updatePos, { passive: true });
    window.addEventListener('resize', updatePos, { passive: true });
    updatePos();
}

onUnmounted(() => {
    if (import.meta.client) {
        window.removeEventListener('scroll', updatePos);
        window.removeEventListener('resize', updatePos);
    }
});

const hideFrom = computed(() => route.meta.scrollButton ? route.meta.scrollButton?.hideFrom ?? -45 : -45);
const sbPositionX = computed(() => route.meta.scrollButton ? route.meta.scrollButton?.customPosition?.x ?? '2.5rem' : '2.5rem');
const sbPositionY = computed(() => route.meta.scrollButton ? route.meta.scrollButton?.customPosition?.y ?? '2.5rem' : '2.5rem');

function scrollToTop() {
    if (!import.meta.client) return;
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
</script>
<template>
    <div class="text-neutral-800 dark:text-neutral-200" :class="$style.root">
        <NuxtIsland name="GNoScript" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <ClientOnly>
            <LazyGAiChan />
        </ClientOnly>
        <button
            v-if="$route.meta.scrollButton !== false"
            :class="[
                'fixed h-14 w-14 p-[1.125rem] rounded-full bg-accent-600 text-white shadow-lg transition-opacity',
                (hideFrom >= scrollPos) ? 'opacity-75 hover:opacity-100' : 'opacity-0 pointer-events-none',
                $route.meta.scrollButton?.customClass ?? '',
                $style.scrollToTopButton,
            ]"
            @click="scrollToTop"
        ><TopIco class="h-5 w-5 stroke-1 stroke-current" /></button>
    </div>
</template>

<style module>
.root {
	background: #e6e6e6;
}

.scrollToTopButton {
    bottom: v-bind(sbPositionY);
    right: v-bind(sbPositionX);
}
</style>
