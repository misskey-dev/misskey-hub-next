<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<span v-if="errored">:{{ customEmojiName }}:</span>
<img v-else :class="[$style.root, { [$style.normal]: normal, [$style.noStyle]: noStyle }]" :src="url" :alt="alt" :title="alt" decoding="async" @error="errored = true" @load="errored = false"/>
</template>

<script lang="ts" setup>

const props = defineProps<{
    name: string;
    normal?: boolean;
    noStyle?: boolean;
    host?: string | null;
    url?: string;
    useOriginalSize?: boolean;
}>();

const customEmojiName = computed(() => (props.name[0] === ':' ? props.name.substring(1, props.name.length - 1) : props.name).replace('@.', ''));
const isLocal = computed(() => !props.host && (customEmojiName.value.endsWith('@.') || !customEmojiName.value.includes('@')));

function getCustomEmojiName(ceNameRaw: string) {
    return (ceNameRaw.startsWith(":") ? ceNameRaw.substr(1, ceNameRaw.length - 2) : ceNameRaw).replace('@.', '');
}

function getCustomEmojiUrl(ceName: string) {
    const remote = remoteCustomEmojis.find((emoji) => emoji.name === ceName);
    if (remote) {
        return remote.url;
    }
	return `/emoji/${ceName}.webp`;
}

const alt = computed(() => `:${customEmojiName.value}:`);
const errored = ref(url.value == null);
</script>

<style lang="scss" module>
.root {
    height: 2em;
    vertical-align: middle;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.2);
    }
}

.normal {
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