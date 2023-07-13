<template>
    <div>
        <div class="min-h-[150px] flex flex-col justify-center">
            <p class="text-center mb-4">{{ $t('_blog.title') }}</p>
            <h1 class="text-center font-bold text-2xl lg:text-3xl mb-4">{{ data.title }}</h1>
            <p class="text-center">{{ $d(new Date(data.date)) }}</p>
        </div>
        <div class="bg-white dark:bg-slate-950 pb-12 lg:mt-12 pt-6 px-6">
            <div class="mx-auto container max-w-screen-md markdown-body">
                <ContentRenderer :value="data" />
            </div>
        </div>
   </div>
</template>

<script setup lang="ts">
// 日本語でしか提供されない
defineI18nRoute({
    locales: ['ja'],
});

const route = useRoute();
const { data } = await useAsyncData(`blog-${route.params.slug}`, () => queryContent(`/blog/${route.params.slug}`).findOne())
</script>

<style scoped>

</style>