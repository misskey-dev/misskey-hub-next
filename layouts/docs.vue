<script setup lang="ts">
import type { NavItem } from '@nuxt/content/types';

const isNavOpen = ref<boolean>(false);
const isAsideNavOpen = useState<boolean>('miHub_docs_asideNav_openState', () => false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-32 lg:scroll-pt-20',
    },
});

const route = useRoute();
const { locale } = useI18n();
const docsNavigation = ref<NavItem[] | null>(null);
const epDocsNavigation = ref<NavItem[] | null>(null);
const asideNavKey = ref(0);
const { data: docsNavigationRes } = await useGAsyncData(`navigation_${locale.value}`, () => fetchContentNavigation(queryContent(`/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/`)));
const { data: epDocsNavigationRes } = await useGAsyncData(`ep_navigation_${locale.value}`, () => fetchContentNavigation(queryContent(`/api-docs/endpoints/`)));
docsNavigation.value = docsNavigationRes.value;
epDocsNavigation.value = epDocsNavigationRes.value;
const slugs = (Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]).filter((v) => v !== '');
const isEPDocs = ref((slugs[0] === 'for-developers' && slugs[1] === 'api' && slugs[2] === 'endpoints'));

watch(() => route.path, (_) => {
    const slugs = (Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]).filter((v) => v !== '');
    isEPDocs.value = (slugs[0] === 'for-developers' && slugs[1] === 'api' && slugs[2] === 'endpoints');
});

watch(locale, async (to) => {
    console.log('locale changed');
    const { data: docsNavigationRes } = await useGAsyncData(`navigation_${to}`, () => fetchContentNavigation(queryContent(`/${to}/docs/`)));
    docsNavigation.value = docsNavigationRes.value;
    asideNavKey.value++;
});
</script>

<template>
    <div class="bg-white dark:bg-slate-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :isOpen="isNavOpen" :slim="true" :disableShadow="true" :hasBorder="true" />
        <div class="main-content">
            <div
                class="relative container mx-auto max-w-screen-xl p-6 lg:py-0 grid pb-12"
                :class="$style.docsRoot"
            >
                <div
                    class="fixed top-[7.25rem] left-0 z-20 w-64 pl-6 transition-transform bg-slate-50 dark:bg-slate-900 lg:top-auto lg:bg-transparent dark:lg:bg-transparent lg:pl-0 lg:transform-none lg:relative"
                    :class="isAsideNavOpen ? 'translate-x-0' : '-translate-x-64'"
                >
                    <div class="lg:sticky lg:top-16 h-[calc(100vh-7.25rem)] lg:h-[calc(100vh-4rem)] overflow-y-scroll border-r border-slate-200 dark:border-slate-700 py-6 pr-3">
                        <DocsAsideNav v-if="isEPDocs" :links="epDocsNavigation ?? []" :isEPDocs="true" />
                        <DocsAsideNav v-else :links="docsNavigation ?? []" />
                    </div>
                </div>
                <div class="relative">
                    <slot></slot>
                    <div
                        class="fixed top-16 z-10 w-full h-full lg:hidden transition-opacity bg-black"
                        :class="isAsideNavOpen ? 'opacity-70' : 'opacity-0 pointer-events-none'"
                        @click="isAsideNavOpen = false"
                    ></div>
                </div>
            </div>
        </div>
        <GFooter class="bg-slate-100 dark:bg-gray-900" />
    </div>
</template>

<style module>
.docsRoot {
    grid-template-columns: 1fr;
}

@screen lg {
    .docsRoot {
        grid-template-columns: 16rem 1fr;
    }
}
</style>
