<template>
    <MkAnimBg
        v-if="showAnimBg"
        class="fixed z-0 top-0 left-0 w-screen h-screen transition-opacity duration-[2s]"
        :class="isCanvasLoaded ? 'opacity-100' : 'opacity-0'"
        @load="isCanvasLoaded = true"
    ></MkAnimBg>
    <GMisskeyGateway
        class="relative"
        v-if="filteredQuery"
        :action="{
            type: 'link',
            path: `/share?${stringifyQuery(filteredQuery)}`,
        }"
        :manualInstance="manualInstance"
    ></GMisskeyGateway>
</template>

<script setup lang="ts">
import { stringifyQuery, parseQuery } from 'ufo';

definePageMeta({
    layout: 'blank',
});

useHead({
    meta: [
        { name: 'robots', content: 'noindex' },
    ],
});

const { meta } = useRoute();

const manualInstance = ref<string | undefined>();

const filteredQuery = ref<Record<string, any>>({});

const isCanvasLoaded = ref(false);
const showAnimBg = ref(false);

if (process.client) {
    const query = parseQuery(location.search.slice(1));

    filteredQuery.value = {
        ...query,
        replyId: undefined,
        renoteId: undefined,
        visibleUserIds: undefined,
        fileIds: undefined,
        manualInstance: undefined,
    };

    manualInstance.value = Array.isArray(query.manualInstance) ? query.manualInstance[0] : query.manualInstance ?? undefined;
}

onMounted(() => {
    if (window.innerWidth >= 768) {
        showAnimBg.value = true;
    }
});

const { t } = useI18n();

meta.title = t('_share.title');
meta.scrollButton = false;
</script>