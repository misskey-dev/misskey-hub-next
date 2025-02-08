<template>
    <div class="bg-white dark:bg-slate-950 rounded-2xl p-6 lg:p-12 lg:py-24 mx-auto max-w-(--breakpoint-lg)">
        <h2 class="text-center text-xl lg:text-3xl font-bold font-title mb-6">{{ $t('_landing._donation.title') }}</h2>
        <p class="lg:text-lg leading-relaxed lg:leading-loose mb-6">{{ $t('_landing._donation.description') }}</p>
        <p class="text-center">
            <GButton button-type="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
        </p>
    </div>
</template>
<script setup lang="ts">
const localePath = useGLocalePath();
</script>
