<script setup lang="ts">
const isNavOpen = ref<boolean>(false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-32 lg:scroll-pt-20',
    },
});

const { locale } = useI18n();
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent(`/${locale.value}/docs/`)));
</script>

<template>
    <div class="bg-white dark:bg-slate-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" :slim="true" :disable-shadow="true" />
        <div class="main-content">
            <div class="relative container mx-auto max-w-screen-xl p-6 lg:py-0 grid docs-root pb-12">
                <div class="hidden lg:block">
                    <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-scroll border-r border-slate-200 dark:border-slate-700 py-6 pr-3">
                        <DocsAsideNav :links="navigation ?? []" />
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
