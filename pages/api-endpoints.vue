<template>
    <div>
        <ApiReferenceBase
            :class="$style.apiReferenceRoot"
            :configuration="{
                spec: { content: openApiJson },
                isEditable: false,
                darkMode: colorMode.value === 'dark' ?? true,
            }"
        >
            <template #header>
                <GNav @toggleNav="isNavOpen = !isNavOpen" slim disableShadow hasBorder :sticky="false" />
            </template>
            <template #content-end>
                <GFooter class="bg-slate-100 dark:bg-gray-900" />
            </template>
        </ApiReferenceBase>
    </div>
</template>

<script setup lang="ts">
import { ApiReferenceBase, SearchButton } from '@scalar/api-reference';
import { Buffer } from 'buffer';
import openApiJson from '@/assets/data/api.json';

definePageMeta({
    layout: 'blank',
});

const isNavOpen = ref(false);
const colorMode = useColorMode();

if (process.client) {
    (window as any).Buffer = Buffer;
}
</script>

<style module>
.apiReferenceRoot {
    --theme-font: 'Nunito', var(--mi-localized-font, '');
    --theme-font-code: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
    --theme-header-height: 4rem;
}
</style>