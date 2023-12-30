<script setup lang="ts">
import MiIco from '@/assets/svg/misskey_mi_bi.svg';
import ExtIco from 'bi/box-arrow-up-right.svg';
import { parseURL, isRelative, joinURL } from 'ufo';
import { isLocalPath, sanitizeInternalPath } from '@/assets/js/misc';

const runtimeConfig = useRuntimeConfig();
const rootDomain = parseURL(runtimeConfig.public.baseUrl);
const { resolve } = useRouter();
const localePath = useGLocalePath();

const props = defineProps({
    href: {
        type: String,
        default: ''
    },
    target: {
        type: String,
        default: undefined,
        required: false
    },
})

const realHref = ref(props.href);
const realTarget = ref(props.target);

const url = parseURL(realHref.value);

if (isLocalPath(realHref.value)) {
    // 相対パスの場合（trailing slashがあるので１つくり下げる）
    if (isRelative(realHref.value)) {
        realHref.value = joinURL('../', realHref.value.replace(/^\.\//, ''));
    }

    // 内部リンクの場合
    if (/^\/[a-z]{2}\//.test(realHref.value)) {
        realHref.value = sanitizeInternalPath(realHref.value);
    } else {
        // 渡されたパスがローカライズされたルートでない場合はローカライズされたパスを返す
        realHref.value = sanitizeInternalPath(localePath(resolve(realHref.value).fullPath));
    }
} else if (rootDomain.host !== url.host) {
    realTarget.value = '_blank';
}
</script>

<template>
    <GNuxtLink :href="realHref" :target="realTarget">
        <slot></slot>
        <MiIco v-if="realHref.startsWith('x-mi-web://')" class="text-xs mx-1" />
        <ExtIco v-else-if="realTarget === '_blank'" class="text-xs mx-1" />
    </GNuxtLink>
</template>