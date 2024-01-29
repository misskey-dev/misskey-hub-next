<template>
    <div v-if="data" class="markdown-body">
        <ContentRenderer :value="data" />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'legal',
});

const route = useRoute();

const { locale } = useI18n();
const localePath = useGLocalePath();

const { data } = await useGAsyncData(`legal_${locale.value}_${route.params.slug}`, () => queryContent(`/${locale.value}/legal/${route.params.slug}`).findOne());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found', fatal: true });
}

route.meta.title = data.value?.title;
route.meta.description = data.value?.description;
</script>

<style scoped>

</style>
