<template>
    <MkAnimBg
        v-if="showAnimBg"
        class="fixed z-0 top-0 left-0 w-screen h-screen transition-opacity duration-[2s]"
        :class="isCanvasLoaded ? 'opacity-100' : 'opacity-0'"
        @load="isCanvasLoaded = true"
    ></MkAnimBg>
    <GMisskeyGateway
        class="relative"
        :action="{
            type: 'link',
            path: `/share?${stringifyQuery(filteredQuery)}`,
        }"
        :manualInstance="manualInstance"
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

const _query = structuredClone(query);

const manualInstance = (Array.isArray(_query.manualInstance) ? _query.manualInstance[0] : _query.manualInstance) ?? undefined;

const filteredQuery = computed(() => ({
    ..._query,
    replyId: undefined,
    renoteId: undefined,
    visibleUserIds: undefined,
    fileIds: undefined,
    manualInstance: undefined,
}));

const isCanvasLoaded = ref(false);
const showAnimBg = ref(false);

if (import.meta.client && window.innerWidth >= 768) {
    showAnimBg.value = true;
}

const { t } = useI18n();

meta.title = t('_share.title');
meta.scrollButton = false;
</script>