<template>
    <NuxtLink
        v-bind="rawProps"
        :to="realHref"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { parseURL, cleanDoubleSlashes, withTrailingSlash } from 'ufo';
import { NuxtLinkProps } from 'nuxt/app';

const rawProps = defineProps<NuxtLinkProps>();
const realHref = ref(rawProps.to ?? rawProps.href);

if (realHref.value && typeof realHref.value === 'string') {
    const runtimeConfig = useRuntimeConfig();
    const rootDomain = parseURL(runtimeConfig.public.baseUrl);
    const url = parseURL(realHref.value);

    if (!url.host || rootDomain.host === url.host) {
        realHref.value = withTrailingSlash(realHref.value, true);
    }

    realHref.value = cleanDoubleSlashes(realHref.value);
}

</script>
