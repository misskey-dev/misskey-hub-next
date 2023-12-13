<script setup lang="ts">
import MiIco from '@/assets/svg/misskey_mi_bi.svg';
import ExtIco from 'bi/box-arrow-up-right.svg';
import { $URL, isRelative, joinURL } from 'ufo';
import { isLocalPath, sanitizeInternalPath } from '@/assets/js/misc';

const runtimeConfig = useRuntimeConfig();
const rootDomain = new $URL(runtimeConfig.public.baseUrl);
const { resolve } = useRouter();
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
    },
})

const realHref = ref(props.href);
const realTarget = ref(props.target);

const url = new $URL(realHref.value);

if (isLocalPath(realHref.value)) {
    // 内部リンクの場合
    const route = resolve(realHref.value);
    if (route.name && !route.name.toString().includes('___')) {
        // 渡されたパスがローカライズされたルートではない場合はローカライズされたパスを返す
        realHref.value = sanitizeInternalPath(localePath(url.fullpath));
    }

    // 相対パスの場合（trailing slashがあるので１つくり下げる）
    if (isRelative(realHref.value)) {
        realHref.value = joinURL('../', realHref.value);
    }
} else if (rootDomain.host !== url.host) {
    realTarget.value = '_blank';
}
</script>

<template>
    <GNuxtLink :to="realHref" :target="realTarget">
        <slot></slot>
        <MiIco v-if="realHref.startsWith('x-mi-web://')" class="text-xs mx-1" />
        <ExtIco v-else-if="realTarget === '_blank'" class="text-xs mx-1" />
    </GNuxtLink>
</template>