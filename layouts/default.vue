<script setup lang="ts">
import 'virtual:uno.css';

const isNavOpen = ref<boolean>(false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-20 lg:scroll-pt-24',
    },
});
</script>
<template>
    <div class="">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" />
        <div class="main-content">
            <slot></slot>
        </div>
        <GFooter class="bg-white dark:bg-neutral-950" />
    </div>
</template>
