<template>
    <div>
        <GHero>
            <template #title>{{ $t('_servers._statistics.title') }}</template>
            <template #description>
                {{ $t('_servers._statistics.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/chart_increasing_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950 min-h-screen text-center">
            現在サーバー統計情報は準備中です。<br>
            Please bear with us as we are working on this page.
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

route.meta.title = t('_servers._statistics.title');
route.meta.description = t('_servers._statistics.description');
</script>

<style scoped>
</style>