<template>
    <div>
        <GHero>
            <template #title>{{ $t('_contact.title') }}</template>
            <template #description>
                {{ $t('_contact.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/envelope_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
                <div>
									<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf9hV92NTcfzZnJg_mrB11MINpBFdTf8dzGKAmzX8dvwXwZfw/viewform?embedded=true" width="640" height="1058" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

route.meta.title = t('_contact.title');
route.meta.description = t('_contact.description');
</script>

<style scoped>

</style>
