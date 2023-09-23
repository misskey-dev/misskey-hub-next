<template>
    <RealNuxtLink v-bind="props">
        <slot></slot>
    </RealNuxtLink>
</template>

<script setup lang="ts">
import { cleanDoubleSlashes } from 'ufo';
import { NuxtLinkProps } from 'nuxt/app';

const rawProps = defineProps();
const props = ref<NuxtLinkProps>(Object.assign({}, rawProps));

if (props.value.to && typeof props.value.to === 'string') {
    props.value.to = cleanDoubleSlashes(props.value.to);
}

if (props.value.href && typeof props.value.href === 'string') {
    props.value.href = cleanDoubleSlashes(props.value.href);
}

const RealNuxtLink = defineNuxtLink({
    trailingSlash: "append",
});
</script>

<style scoped>

</style>