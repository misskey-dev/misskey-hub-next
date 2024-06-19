<template>
    <div class="mx-auto max-w-lg p-6">
        <MiscAiSign :class="mounted ? 'active' : ''" />
        <div class="mt-4 text-center">How did you get here?</div>
    </div>
</template>

<script setup lang="ts">
const localePath = useGLocalePath();

const mounted = ref(false);

useHead({
    meta: [
        { name: 'robots', content: 'noindex' },
    ],
});

onMounted(() => {
    mounted.value = true;
});

onBeforeRouteLeave(() => {
    mounted.value = false;
});
</script>

<style scoped>

</style>