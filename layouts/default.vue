<script setup lang="ts">
const isNavOpen = ref<boolean>(false);
</script>
<template>
    <div>
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" />
        <div class="main-content">
            <slot></slot>
        </div>
        <GFooter />
    </div>
</template>
