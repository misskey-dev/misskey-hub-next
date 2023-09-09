<script setup lang="ts">
const isNavOpen = ref<boolean>(false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-32 lg:scroll-pt-20',
    },
});
</script>
<template>
    <div class="bg-white dark:bg-slate-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" :slim="true" :disable-shadow="true" />
        <div class="main-content">
            <slot></slot>
        </div>
        <GFooter class="bg-slate-100 dark:bg-gray-900" />
    </div>
</template>
