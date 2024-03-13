<template>
    <GMisskeyGateway
        v-if="path"
        :action="actionConfig"
        :branding="{
            heading: $t('_goToMisskey.heading'),
            icon: WindowIco,
        }"
    ></GMisskeyGateway>
</template>

<script setup lang="ts">
import WindowIco from 'bi/window.svg';
import { parseQuery } from 'ufo';

definePageMeta({
    layout: 'blank',
});

useHead({
    meta: [
        { name: 'robots', content: 'noindex' },
    ],
});

const { meta } = useRoute();
const { t } = useI18n();

// 遷移用パス
const path = ref<string | null>(null);

const actionConfig = computed(() => {
    return {
        type: 'link' as const,
        path: path.value ?? '/',
    };
});

if (process.client) {
    const query = parseQuery(location.search);
    if (Array.isArray(query.path)) {
        path.value = query.path[0] as string;
    } else {
        path.value = query.path;
    }
}

meta.title = t('_goToMisskey.title');
meta.scrollButton = false;
</script>