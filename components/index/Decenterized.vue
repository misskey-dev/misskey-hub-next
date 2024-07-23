<template>
    <div class="bg-white dark:bg-slate-950 rounded-2xl p-6 lg:p-12 lg:py-24">
        <I18nT scope="global" keypath="_landing._decenterized.title" tag="h2" class="text-center text-xl lg:text-3xl font-bold font-title mb-6">
            <span :class="$style.em">{{ $t('_landing._decenterized.decenterizedPlatform') }}</span>
        </I18nT>
        <I18nT scope="global" keypath="_landing._decenterized.description" tag="p" class="lg:text-lg leading-relaxed lg:leading-loose">
            <span :class="$style.em" class="font-bold">{{ $t('_landing._decenterized.activityPub') }}</span>
        </I18nT>
    </div>
</template>

<script setup lang="ts">

</script>

<style module>
.em {
    background: linear-gradient(transparent 70%,rgba(191,255,0,.5019607843) 0%);
}
</style>
