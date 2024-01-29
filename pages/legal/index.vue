<template>
    <div class="space-y-4">
        <Warning>{{ $t('_legal.disclaimer') }}</Warning>
        <MkIndex :base-path="`/${locale}/legal/`" />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'legal',
});

const localePath = useGLocalePath();

const route = useRoute();

const { locale, t } = useI18n();

const { data } = await useGAsyncData(`legalLinksNav_${locale.value}`, () => queryContent(`/${locale.value}/legal/`).only(['title', '_path']).find());

route.meta.title = t('_legal.title');
route.meta.description = t('_legal.description');
</script>

<style scoped>

</style>
