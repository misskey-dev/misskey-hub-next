<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<span v-if="errored">:{{ customEmojiName }}:</span>
<img v-else :class="[$style.root, { [$style.normal]: normal, [$style.noStyle]: noStyle }]" :src="url ?? undefined" :alt="alt" :title="alt" decoding="async" @error="errored = true" @load="errored = false"/>
</template>

<script lang="ts" setup>
import { getProxiedImageUrl } from '@/assets/js/mi/io-media-proxy';
import { customEmojisMap } from '@/assets/js/mi/io-emojis';
import { parseURL } from 'ufo';

const props = defineProps<{
    name: string;
    normal?: boolean;
    noStyle?: boolean;
    host?: string | null;
    url?: string;
    useOriginalSize?: boolean;
}>();

const customEmojiName = computed(() => (props.name[0] === ':' ? props.name.substring(1, props.name.length - 1) : props.name).replace('@.', ''));
const isLocal = computed(() => props.host === 'misskey.io' && (customEmojiName.value.endsWith('@.') || !customEmojiName.value.includes('@')));

const rawUrl = computed(() => {
	if (props.url) {
		return props.url;
	}
	if (isLocal.value) {
		return customEmojisMap.get(customEmojiName.value)?.url ?? null;
	}
	return props.host !== 'misskey.io' ? `/emoji/${customEmojiName.value}@${props.host}.webp` : `/emoji/${customEmojiName.value}.webp`;
});

const url = computed(() => {
	if (rawUrl.value == null) return null;

    if (props.url) {
        return rawUrl.value;
    }

	const proxied =
		(rawUrl.value.startsWith('/emoji/') || (props.useOriginalSize && isLocal.value))
			? parseURL(rawUrl.value).host ? rawUrl.value : 'https://misskey.io' + rawUrl.value
			: getProxiedImageUrl(
				rawUrl.value,
				props.useOriginalSize ? undefined : 'emoji',
				false,
				true,
			);
	return proxied;
});

const alt = computed(() => `:${customEmojiName.value}:`);
const errored = ref(props.host == null && !props.url);
</script>

<style lang="scss" module>
.root {
    display: inline;
    height: 2em;
    vertical-align: middle;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.2);
    }
}

.normal {
    display: inline;
    height: 1.25em;
    vertical-align: -0.25em;

    &:hover {
        transform: none;
    }
}

.noStyle {
    height: auto !important;
}
</style>