<!--
SPDX-FileCopyrightText: syuilo and other misskey contributors
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<GNuxtLink :class="$style.root" :to="url" target="_blank">
    <img :class="$style.icon" :src="`https://${localHost}/avatar/@${username}@${host}`" alt="">
    <span>
        <span>@{{ username }}</span>
        <span v-if="host != localHost" :class="$style.host">@{{ host }}</span>
    </span>
</GNuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    username: string;
    host: string;
    localHost: string;
}>();

const canonical = props.host === props.localHost ? `@${props.username}` : `@${props.username}@${props.host}`;

const url = `https://${props.localHost}/${canonical}`;
</script>

<style lang="scss" module>
.root {
    display: inline-block;
    padding: 4px 8px 4px 4px;
    border-radius: 999px;
    color: rgb(134, 179, 0)!important;
    background-color: rgba(134, 179, 0, 0.1)!important;
}

.icon {
    width: 1.5em;
    height: 1.5em;
    object-fit: cover;
    margin: 0 0.2em 0 0;
    vertical-align: bottom;
    border-radius: 100%;
}

.host {
    opacity: 0.5;
}
</style>