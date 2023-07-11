<template>
    <div class="relative container mx-auto max-w-screen-xl p-6 lg:py-0 grid docs-root pb-12">
        <div class="hidden lg:block">
            <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-scroll border-r border-slate-200 dark:border-slate-700 py-6 pr-6">
                あ
            </div>
        </div>
        <div class="lg:p-6 w-full overflow-x-hidden">
            <ContentRenderer :value="data" class="markdown-body w-full">
            </ContentRenderer>
        </div>
        <div class="hidden lg:block text-sm">
            <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pl-6">
                <h3 class="font-bold mb-6">{{ $t('_docs._toc.title') }}</h3>
                <DocsTocLinks :links="data?.body.toc.links" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';

const { locale, locales } = useI18n();

definePageMeta({
    layout: 'docs',
});

defineI18nRoute({
    locales: (locales.value as LocaleObject[]).map((e) => e.code),
});

const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');
const currentLocaleISO = () => {
    if (!locales.value) {
        return null;
    }
    return (locales.value as LocaleObject[]).find((v) => v.code === locale.value)?.iso || null;
}

const { data } = await useAsyncData(`blog-${locale.value}-${slugs.join('-')}`, () => queryContent(`/${locale.value}/docs/${slugs.join('/')}`).findOne());

route.meta.title = data.value?.title;
</script>

<style scoped>
@screen lg {
    .docs-root {
        grid-template-columns: 14rem 1fr 14rem;
    }
}
</style>