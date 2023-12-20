<template>
    <GMisskeyGateway
        :path="path"
        :branding="{
            heading: $t('_goToMisskey.heading'),
            icon: WindowIco,
        }"
    ></GMisskeyGateway>
</template>

<script setup lang="ts">
import WindowIco from 'bi/window.svg';

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

const path = computed<string>(() => {
    if (!query.path || query.path.length == 0) return '/';

    if (Array.isArray(query.path)) {
        return query.path[0] as string;
    } else {
        return query.path;
    }
})

meta.title = t('_goToMisskey.title');
meta.scrollButton = false;
</script>