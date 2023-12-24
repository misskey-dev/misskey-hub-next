<template>
    <NuxtLink
        :to="realHref"
        :href="undefined"
        :target="realTarget"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { cleanDoubleSlashes, withQuery, withTrailingSlash } from 'ufo';
import { isLocalPath, sanitizeInternalPath } from '@/assets/js/misc';
import type { RouteLocationRaw } from '#vue-router';

/**
 * TrailingSlashをつけている（pnpm generate時の出力ディレクトリ構造の関係）ので、
 * 二重にスラッシュが入って無限ループに陥らないようにするための
 * NuxtLinkのラッパーコンポーネント
 */

const rawProps = defineProps<{
    to?: RouteLocationRaw | string;
    href?: RouteLocationRaw | string;
    target?: unknown;
}>();

const localePath = useGLocalePath();

const needsToOpenExternally = ref(false);
const realHref = computed(() => {
    const rhf = rawProps.to ?? rawProps.href;

    if (rhf && typeof rhf === 'string') {
        if (rhf.startsWith('x-mi-web://')) {
            needsToOpenExternally.value = true;
            return localePath(withQuery('/mi-web/', { path: cleanDoubleSlashes(rhf.replace('x-mi-web:/', '')) }));
        }

        if (isLocalPath(rhf)) {
            return withTrailingSlash(cleanDoubleSlashes(sanitizeInternalPath(rhf)), true);
        }

        return rhf;
    }

    // TODO: ルート定義をオブジェクトで渡された時のバリデーション

    return rhf;
});

const realTarget = computed(() => (needsToOpenExternally.value ? '_blank' : (rawProps.target ?? null)));
</script>
