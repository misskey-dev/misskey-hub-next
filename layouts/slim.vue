<script setup lang="ts">
import 'virtual:uno.css';

const isNavOpen = ref<boolean>(false);

useHead({
    htmlAttrs: {
        class: 'scroll-pt-32 lg:scroll-pt-20',
    },
});

</script>

<template>
    <div class="bg-white dark:bg-neutral-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" :slim="true" :disable-shadow="true" :hasBorder="true" />
        <div class="main-content" :class="$style.slimPageRoot">
            <slot />
        </div>
        <GFooter class="bg-neutral-100 dark:bg-neutral-900" />
    </div>
</template>

<style module>
.slimPageRoot {
    min-height: calc(100vh - 4rem);
}
</style>
