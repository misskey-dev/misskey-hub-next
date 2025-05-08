<template>
    <div class="bg-white dark:bg-slate-950 rounded-2xl p-6 lg:p-12 lg:pt-20">
        <I18nT scope="global" keypath="_landing._decenterized.title" tag="h2" class="text-center text-xl lg:text-3xl font-bold font-title mb-6" :class="$style.title">
            <span :class="$style.em">{{ $t('_landing._decenterized.decenterizedPlatform') }}</span>
        </I18nT>
        <I18nT scope="global" keypath="_landing._decenterized.description" tag="p" class="lg:text-lg leading-relaxed lg:leading-loose mb-6 lg:mb-12">
            <span :class="$style.em" class="font-bold">{{ $t('_landing._decenterized.activityPub') }}</span>
        </I18nT>
        <div class="bg-accent-600/10 p-6 lg:p-8 rounded-xl">
            <h2 class="text-lg lg:text-2xl font-bold font-title mb-3">{{ $t('_landing._donation.title') }}</h2>
            <p class="lg:text-lg !leading-relaxed mb-6">{{ $t('_landing._donation.description') }}</p>
            <div class="mb-2">
                <GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useGLocalePath();
</script>

<style module>
.title {
    word-break: auto-phrase;
}

.em {
    background: linear-gradient(transparent 70%,rgba(191,255,0,.5019607843) 0%);
}
</style>
