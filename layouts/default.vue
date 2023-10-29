<script setup lang="ts">
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
        <GFooter class="bg-white dark:bg-slate-950" />
    </div>
</template>
