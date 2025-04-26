<template>
    <div class="relative min-h-full">
        <IndexHeroBg />
        <GNav :landing="true" />
        <IndexHeroRight />
        <div class="relative container mx-auto p-6 md:p-8 max-w-screen-sm lg:max-w-screen-xl">
            <IndexHeroLeft />
        </div>
        <main class="relative container mx-auto max-w-screen-xl px-6 mt-32 mb-24 space-y-16">
            <IndexKeyFeatures id="learnMore" />
            <IndexDonation />
            <GDots class="w-[95%] mx-auto text-accent-600" :space="30" />
            <IndexFeatures />
            <IndexFeaturesServer />
						<IndexFeaturesClient />
						<IndexFeaturesUpcoming />
            <GDots class="w-[95%] mx-auto text-accent-600" :space="30" />
            <IndexGetStarted id="getStarted" />
            <GDots class="w-[95%] mx-auto text-accent-600" :space="30" />
            <IndexSponsors />
        </main>
        <GFooter class="relative !bg-transparent dark:!bg-transparent" />
    </div>
</template>

<script setup lang="ts">
const isUwu = useState<boolean>('isUwu');

useHead(() => ({
    link: isUwu ? [
        { rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-light.png' },
        { rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-dark.png' },
        { rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-mobile-light.png' },
        { rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-mobile-dark.png' },
    ] : [],
}));

definePageMeta({
    layout: 'landing',
});
</script>

<style scoped>

</style>
