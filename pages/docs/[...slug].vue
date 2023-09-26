<template>
    <div class="grid docs-main">
        <div v-if="data?.body" class="lg:hidden sticky top-16 -mx-6 -mt-6 overflow-y-auto bg-white bg-opacity-60 backdrop-blur-lg z-[9890] border-b text-sm">
            <details :open="openState">
                <summary class="py-4 px-6 cursor-pointer">
                    {{ $t('_docs._toc.title') }}
                </summary>
                <div class="pb-4 px-6 max-h-[65vh] overflow-y-auto">
                    <DocsTocLinks :links="data?.body.toc.links" @child-click="openState = false" />
                </div>
            </details>
        </div>
        <div class="pt-6 lg:p-6 w-full overflow-x-hidden">
            <template v-if="data?.body">
                <ContentRenderer v-if="data.body.children.length > 0" :value="data" class="markdown-body w-full mb-6">
                </ContentRenderer>
                <DocsPrevNext :ignore-dir-based-nav="data?.ignoreDirBasedNav ?? false" />
            </template>
            <template v-else>
                <div class="markdown-body">
                    <h1>{{ data?.title ?? data?._dir?.title }}</h1>
                    <MkIndex :is-dir="data?._file?.endsWith('index.md') || (!data?._file)" />
                </div>
            </template>
        </div>
        <div class="hidden lg:block text-sm">
            <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pl-6">
                <h3 class="font-bold mb-6">{{ $t('_docs._toc.title') }}</h3>
                <DocsTocLinks v-if="data?.body" :links="data?.body.toc.links" class="break-words" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';

const { locale, locales } = useI18n();
const openState = ref<boolean>(false);

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

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found' });
}

route.meta.title = data.value?.title;
</script>

<style scoped>
.docs-main {
    grid-template-columns: 1fr;
}

@screen lg {
    .docs-main {
        grid-template-columns: 1fr 14rem;
    }
}
</style>