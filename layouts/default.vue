<script setup lang="ts">
const isNavOpen = ref<boolean>(false);
</script>
<template>
    <div>
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" />
        <div class="min-h-screen main-content overflow-x-hidden">
            <slot></slot>
        </div>
        <GFooter />
    </div>
</template>
