<script setup lang="ts">
const isNavOpen = ref<boolean>(false);
</script>
<template>
    <div>
        <div class="main-content">
            <slot></slot>
        </div>
        <GFooter />
    </div>
</template>
