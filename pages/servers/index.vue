<template>
    <div>
        <GHero>
            <template #title>{{ $t('_servers.title') }}</template>
            <template #description>
                {{ $t('_servers.description') }}<br>
                <I18nT scope="global" keypath="_servers.addYourServer" tag="span">
                    <GNuxtLink class="font-bold hover:underline underline-offset-4" to="https://github.com/joinmisskey/api">{{ $t('_servers.addYourServerLink') }}</GNuxtLink>
                </I18nT>
                <div class="!mt-2 space-y-2">
                    <details class="group overflow-hidden text-sm rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-950">
                        <summary class="p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 font-bold">{{ $t('_servers.disclaimerTitle') }}</summary>
                        <div class="p-3 text-start border-t border-dashed border-gray-300 dark:border-gray-950">{{ $t('_servers.disclaimer') }}</div>
                    </details>
                </div>
            </template>
            <template #icon>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950 min-h-screen text-center">
            現在サーバー一覧は準備中です。<br>
            Please bear with us as we are working on this page.
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InstancesStatsObj } from '@/types/instances-info';
import ArrowRightIco from "bi/arrow-right.svg";

const { t, locale } = useI18n();
const localePath = useGLocalePath();
const route = useRoute();

const instancesStats = ref<InstancesStatsObj>();
const updatedAt = shallowRef<Date>();

const i18nDateFormatConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
};

function setServerStats(val?: InstancesStatsObj, updated?: string) {
    instancesStats.value = val;
    if (updated) updatedAt.value = new Date(updated);
}

route.meta.title = t('_servers.title');
route.meta.description = t('_servers.description');
route.meta.scrollButton = {
    customPosition: {
        y: '4.5rem',
    }
};
</script>

<style scoped>
</style>