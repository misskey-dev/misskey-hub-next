<template>
    <div class="relative container mx-auto max-w-screen-xl p-6 lg:py-0 grid docs-root pb-12">
        <div class="hidden lg:block">
            <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-scroll border-r border-slate-200 dark:border-slate-700 py-6 pr-6">
                <DocsAsideTree :links="navigation" />
            </div>
        </div>
        <div class="lg:p-6 w-full overflow-x-hidden">
            <ContentRenderer :value="data" class="markdown-body w-full mb-6">
            </ContentRenderer>
            <DocsPrevNext :ignore-dir-based-nav="data?.ignoreDirBasedNav ?? false" />
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
    //locales: (locales.value as LocaleObject[]).map((e) => e.code),
    // 【一時対応】とりあえずビルドできるようにする
    locales: ['ja'],
});

const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

const { data } = await useAsyncData(`blog-${locale.value}-${slugs.join('-')}`, () => queryContent(`/${locale.value}/docs/${slugs.join('/')}`).findOne());
const { navigation } = await useAsyncData('navigation', () => fetchContentNavigation());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found' });
}

route.meta.title = data.value?.title;
</script>

<style scoped>
@screen lg {
    .docs-root {
        grid-template-columns: 14rem 1fr 14rem;
    }
}
</style>