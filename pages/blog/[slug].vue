<template>
    <div>
        <div class="mx-auto container max-w-screen-md relative px-6 py-5">
            <GNuxtLink :to="localePath('/blog/')" class="absolute top-2.5 left-6 p-2.5 opacity-40">
                <LeftIco class="mr-2 stroke-1 stroke-current" />
            </GNuxtLink>
            <p class="text-center mb-4">{{ $t('_blog.title') }}</p>
            <h1 class="text-center font-bold text-2xl lg:text-3xl mb-4">{{ data?.title }}</h1>
            <p class="text-center">{{ $d(new Date(data?.date)) }}</p>
        </div>
        <div class="bg-white dark:bg-slate-950 pb-12 lg:mt-12 pt-6 px-6">
            <div class="mx-auto container max-w-screen-md markdown-body">
                <ContentRenderer :value="data" />
            </div>
            <div class="text-center mt-6 lg:mt-12">
                <GNuxtLink :to="localePath('/blog/')" class="text-xl font-bold hover:opacity-70">
                    <LeftIco class="mr-2" />{{ $t('_blog.back') }}
                </GNuxtLink>
            </div>
        </div>
   </div>
</template>

<script setup lang="ts">
import LeftIco from 'bi/arrow-left.svg';
import { joinURL, parseURL } from 'ufo';
import type { MiBlogParsedContent } from '~/types/content';
// 日本語でしか提供されない
defineI18nRoute({
    locales: ['ja'],
});

const localePath = useLocalePath();

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data } = await useAsyncData(`blog-${route.params.slug}`, () => queryContent<MiBlogParsedContent>(`/blog/${route.params.slug}`).findOne());

if (data.value?.thumbnail) {
    route.meta.thumbnail = (parseURL(data.value.thumbnail).host == null) ? joinURL(runtimeConfig.public.baseUrl, data.value.thumbnail) : data.value.thumbnail;
}

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found' });
}
</script>

<style scoped>

</style>