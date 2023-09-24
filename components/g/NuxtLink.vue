<template>
    <NuxtLink
        :to="realHref"
        :href="undefined"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { parseURL, cleanDoubleSlashes, withTrailingSlash } from 'ufo';
import { RouteLocationRaw } from '#vue-router';

/**
 * TrailingSlashをつけている（pnpm generate時の出力ディレクトリ構造の関係）ので、
 * 二重にスラッシュが入って無限ループに陥らないようにするための
 * NuxtLinkのラッパーコンポーネント
 */

const rawProps = defineProps<{
    to?: RouteLocationRaw | string;
    href?: RouteLocationRaw | string;
}>();

const realHref = computed(() => {
    const rhf = rawProps.to ?? rawProps.href;

    if (rhf && typeof rhf === 'string') {
        const runtimeConfig = useRuntimeConfig();
        const rootDomain = parseURL(runtimeConfig.public.baseUrl);
        const url = parseURL(rhf);

        if (!url.host || rootDomain.host === url.host) {
            return withTrailingSlash(cleanDoubleSlashes(rhf), true);
        }

        return rhf;
    }

    // TODO: ルート定義をオブジェクトで渡された時のバリデーション

    return rhf;
});

</script>
