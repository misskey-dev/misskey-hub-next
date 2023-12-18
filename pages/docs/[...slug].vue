<template>
    <div class="grid docs-main">
        <div class="lg:hidden sticky top-16 -mx-6 -mt-6 overflow-y-auto bg-slate-50 dark:bg-slate-900 z-[9890] border-b dark:border-slate-700 text-sm flex items-start">
            <details v-if="data?.body && data.body.toc?.links.length > 0" class="peer order-2 flex-grow flex-shrink-0" :open="openState">
                <summary class="py-4 cursor-pointer">
                    {{ $t('_docs._toc.title') }}
                </summary>
                <div class="pb-4 px-6 max-h-[65vh] overflow-y-auto">
                    <DocsTocLinks :links="data?.body.toc?.links" :max-depth="data?.maxTocDepth ?? undefined" @child-click="openState = false" />
                </div>
            </details>
            <button @click="isAsideNavOpen = !isAsideNavOpen" class="p-4 order-1 dark:border-slate-800 border-r peer-open:border-b mr-2">
                <AsideNavIco class="block w-5 h-5" />
            </button>
        </div>
        <div class="pt-6 p-0 sm:p-12 lg:p-6 w-full overflow-x-hidden">
            <template v-if="data?.body">
                <Tip v-if="locale !== 'ja'" class="mb-6" :label="$t('_i18n._missing.title')">
                    <I18nT keypath="_i18n._missing.description" tag="p">
                        <template #link>
                            <GNuxtLink class="font-bold hover:underline underline-offset-2" to="https://crowdin.com/project/misskey-hub" target="_blank">{{ $t('_i18n._missing.linkLabel') }}</GNuxtLink>
                        </template>
                    </I18nT>
                </Tip>
                <ContentRenderer v-if="data.body.children.length > 0" :value="data" class="markdown-body w-full mb-6">
                </ContentRenderer>
                <div class="mt-8 mb-4 flex flex-wrap justify-end gap-3">
                    <div><GNuxtLink class="hover:underline underline-offset-4" target="_blank" :to="`${runtimeConfig.public.repositoryUrl}/tree/master/content/${data._file}`">{{ $t('_docs._contribute.editThis') }}<ExtIco class="ml-1" /></GNuxtLink></div>
                    <div><GNuxtLink class="hover:underline underline-offset-4" target="_blank" to="https://crowdin.com/project/misskey-hub">{{ $t('_docs._contribute.translateThis') }}<ExtIco class="ml-1" /></GNuxtLink></div>
                </div>
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
                <DocsTocLinks v-if="data?.body" :links="data?.body.toc?.links" :max-depth="data?.maxTocDepth ?? undefined" class="break-words" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AsideNavIco from 'bi/text-indent-left.svg';
import ExtIco from 'bi/box-arrow-up-right.svg';
import type { MiDocsParsedContent } from '~/types/content';

const isAsideNavOpen = useState<boolean>('miHub_docs_asideNav_openState', () => false);

const { locale, locales } = useI18n();
const openState = ref<boolean>(false);
const runtimeConfig = useRuntimeConfig();

definePageMeta({
    layout: 'docs',
});

const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

const { data } = await useAsyncData(`docs-${locale.value}-${slugs.join('-')}`, () => queryContent<MiDocsParsedContent>(`/${locale.value}/docs/${slugs.join('/')}`).findOne());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found', fatal: true });
}

route.meta.title = data.value?.title;
if (data.value.description) {
    route.meta.description = data.value.description;
}
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