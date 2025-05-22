<script setup lang="ts">
useHead({
    htmlAttrs: {
        class: 'landing scroll-pt-20 lg:scroll-pt-24',
    },
});
</script>
<template>
    <div>
        <div class="main-content">
            <slot></slot>
        </div>
    </div>
</template>
