<script setup lang="ts">
const isNavOpen = ref<boolean>(false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-20 lg:scroll-pt-24',
    },
});
</script>
<template>
    <div>
        <div class="main-content">
            <div class="block bg-accent-800 text-white text-center py-1.5 px-3 keep-all relative z-[10005]">
                このウェブサイトはMisskeyプロジェクト公式ではありません。<br>
                <GNuxtLink to="https://misskey-hub.net" target="_blank" class="hover:underline text-accent-200">公式のMisskey Hubはこちら<ExtIco class="ml-0.5" /></GNuxtLink>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
