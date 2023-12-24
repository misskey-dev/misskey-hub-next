<template>
    <GMisskeyGateway
        :path="`/share?${stringifyQuery(query)}`"
    ></GMisskeyGateway>
</template>

<script setup lang="ts">
import { stringifyQuery } from 'ufo';

definePageMeta({
    layout: 'blank',
});

useHead({
    meta: [
        { name: 'robots', content: 'noindex' },
    ],
});

const { meta, query } = useRoute();
const { t } = useI18n();

meta.title = t('_share.title');
meta.scrollButton = false;
</script>