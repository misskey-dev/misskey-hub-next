<template>
    <NuxtLink
        :to="realHref"
        :href="undefined"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script setup lang="ts">
import { cleanDoubleSlashes, withTrailingSlash } from 'ufo';
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
}>();

const realHref = computed(() => {
    const rhf = rawProps.to ?? rawProps.href;

    if (rhf && typeof rhf === 'string') {

        if (isLocalPath(rhf)) {
            return withTrailingSlash(cleanDoubleSlashes(sanitizeInternalPath(rhf)), true);
        }

        return rhf;
    }

    // TODO: ルート定義をオブジェクトで渡された時のバリデーション

    return rhf;
});

</script>
