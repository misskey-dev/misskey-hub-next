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

const manualInstance = (Array.isArray(query.manualInstance) ? query.manualInstance[0] : query.manualInstance) ?? undefined;

const filteredQuery = computed(() => ({
    ...query,
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