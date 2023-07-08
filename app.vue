<script setup lang="ts">
import type { Graph, Thing } from 'schema-dts';

const { t, locale } = useI18n();
const route = useRoute();
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
                "@id": "https://misskey-hub.net/#Organization",
                "name": "Misskey",
                "url": `https://misskey-hub.net/`,
                "sameAs": [
                    "https://join.misskey.page/",
					"https://ja.wikipedia.org/wiki/Misskey",
                ],
                "logo": {
                    "@type": "ImageObject",
                    // TODO
                    "url": "https://misskey-hub.net/img/logo.png"
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://misskey-hub.net/#WebPage",
                "name": t('_seo.siteName'),
                "inLanguage": locale.value,
                "url": `https://misskey-hub.net${route.path}`,
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://misskey-hub.net/#Organization"
                },
                "headline": getTitle(),
                "description": getDescription()
            },
        ]
    };
    ldJson['@graph'] = ldJson['@graph'].concat(additionalGraphes);
    return JSON.stringify(ldJson);
};

useHead((): Record<string, any> => ({
    htmlAttrs: {
        lang: locale.value,
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
            property: "og:description",
            content: getDescription(),
        },
        {
            property: "og:image",
            // TODO
            content: () => route.meta.thumbnail ? route.meta.thumbnail : "https://misskey-hub.net/img/logo.jpg",
        }
    ],
    link: [
        { rel: "canonical", href: "https://misskey-hub.net" + route.path },
    ],
    script: [
        { type: "application/ld+json", children: getLdJson(route.meta.graph) }
    ],
}));
</script>
<template>
	<div>
		<noscript class="block bg-accent-800 text-white text-center py-1.5 px-3 keep-all relative z-[10005]">Please turn on Javascript from your browser's settings.</noscript>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
