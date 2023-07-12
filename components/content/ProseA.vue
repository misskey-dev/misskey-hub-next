<script setup lang="ts">
import ExternalIco from 'bi/box-arrow-up-right.svg';
const runtimeConfig = useRuntimeConfig();
const rootDomain = new URL(runtimeConfig.public.baseUrl);
const localePath = useLocalePath();

const props = defineProps({
    href: {
        type: String,
        default: ''
    },
    target: {
        type: String,
        default: undefined,
        required: false
    }
})

let realHref = props.href;
let realTarget = props.target;

try {
    const url = new URL(props.href);
    if (!url.hostname || rootDomain.hostname === url.hostname) {
        realHref = localePath(realHref);
    }

    if (rootDomain.hostname !== url.hostname) {
        realTarget = '_blank';
    }
} catch(_) {
    if(realHref !== '') {
        realHref = localePath(realHref);
    }
}
</script>

<template>
    <GNuxtLink :href="realHref" :target="realTarget">
        <slot></slot><ExternalIco v-if="realTarget === '_blank'" class="text-xs mx-1" />
    </GNuxtLink>
</template>