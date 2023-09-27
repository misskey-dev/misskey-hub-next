<script setup lang="ts">
const isNavOpen = ref<boolean>(false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-32 lg:scroll-pt-20',
    },
});

const { locale } = useI18n();
const { data: docsNavigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent(`/${locale.value}/docs/`)));
const { data: epDocsNavigation } = await useAsyncData('ep_navigation', () => fetchContentNavigation(queryContent(`/api-docs/endpoints`)));

const route = useRoute();
const slugs = (Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]).filter((v) => v !== '');
const isEPDocs = ref((slugs[0] === 'for-developers' && slugs[1] === 'api' && slugs[2] === 'endpoints'));

watch(() => route.path, (_) => {
    const slugs = (Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]).filter((v) => v !== '');
    isEPDocs.value = (slugs[0] === 'for-developers' && slugs[1] === 'api' && slugs[2] === 'endpoints');
});
</script>

<template>
    <div class="bg-white dark:bg-slate-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" :slim="true" :disable-shadow="true" />
        <div class="main-content">
            <div class="relative container mx-auto max-w-screen-xl p-6 lg:py-0 grid docs-root pb-12">
                <div class="hidden lg:block">
                    <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-scroll border-r border-slate-200 dark:border-slate-700 py-6 pr-3">
                        <DocsAsideNav v-if="isEPDocs" :links="epDocsNavigation ?? []" :isEPDocs="true" />
                        <DocsAsideNav v-else :links="docsNavigation ?? []" />
                    </div>
                </div>
                <slot />
            </div>
        </div>
        <GFooter class="bg-slate-100 dark:bg-gray-900" />
    </div>
</template>

<style scoped>
.docs-root {
    grid-template-columns: 1fr;
}
@screen lg {
    .docs-root {
        grid-template-columns: 16rem 1fr;
    }
}
</style>
