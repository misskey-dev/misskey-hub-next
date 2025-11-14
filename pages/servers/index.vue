<template>
    <div>
        <GHero>
            <template #title>{{ $t('_servers.title') }}</template>
            <template #description>
                {{ $t('_servers.description') }}<br>
            </template>
        </GHero>
        <div class="pb-12 pt-6 px-6 bg-white dark:bg-neutral-950 min-h-screen font-bold text-center whitespace-pre-wrap">
            {{ $t('serverListGone') }}
        </div>
    </div>
</template>

<script setup lang="ts">
// import type { InstancesStatsObj } from '@/types/instances-info';
// import ArrowRightIco from "bi/arrow-right.svg";

const { t } = useI18n();
// const localePath = useGLocalePath();
const route = useRoute();

// const instancesStats = ref<InstancesStatsObj>();
// const updatedAt = shallowRef<Date>();

// const i18nDateFormatConfig: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
// };

// function setServerStats(val?: InstancesStatsObj, updated?: string) {
//     instancesStats.value = val;
//     if (updated) updatedAt.value = new Date(updated);
// }

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
