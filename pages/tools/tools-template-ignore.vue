<!--
    ツール集のテンプレート

    翻訳キーの `aaaaaaaa` となっている場所を置き換えればあとは普通のVueとほぼ同じ
    コンポーネントは、命名規則に従っている限り自動インポート
    ref/reactiveなどのvue関連も自動インポート
-->

<template>
    <div class='container mx-auto max-w-(--breakpoint-xl) px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_aaaaaaaa.title') }}
        </h1>

        <!-- ここに書く！ -->
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const route = useRoute();

route.meta.title = t('_aaaaaaaa.title');
route.meta.description = t('_aaaaaaaa.description');
</script>

<style module>

</style>
