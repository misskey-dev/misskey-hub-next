<template>
    <div>
        <GHero>
            <template #title>{{ $t('_servers.title') }}</template>
            <template #description>
                {{ $t('_servers.description') }}<br>
                <I18nT keypath="_servers.addYourServer" tag="span">
                    <NuxtLink class="font-bold hover:underline underline-offset-4" to="https://github.com/joinmisskey/api">{{ $t('_servers.addYourServerLink') }}</NuxtLink>
                </I18nT>
            </template>
            <template #icon>
                <div class="relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative bg-white dark:bg-slate-800 shadow-lg rounded-lg lg:w-64 p-6 space-y-4">
                        <dl>
                            <dt>{{ $t('_servers._statistics.notes') }}</dt>
                            <dd class="font-bold text-accent-600 text-2xl">{{ instancesStats?.notesCount?.toLocaleString() || $t('loading') }}</dd>
                        </dl>
                        <dl>
                            <dt>{{ $t('_servers._statistics.users') }}</dt>
                            <dd class="font-bold text-accent-600 text-2xl">{{ instancesStats?.usersCount?.toLocaleString() || $t('loading') }}</dd>
                        </dl>
                        <dl>
                            <dt>{{ $t('_servers._statistics.servers') }}</dt>
                            <dd class="font-bold text-accent-600 text-2xl">{{ instancesStats?.instancesCount?.toLocaleString() || $t('loading') }}</dd>
                        </dl>
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <ClientOnly>
                <ServersFinder @load="setServerStats" />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();

type InstancesStatsObj = { 
    notesCount?: number;
    usersCount?: number;
    instancesCount?: number;
};

const instancesStats = ref<InstancesStatsObj>();

function setServerStats(val: InstancesStatsObj) {
    console.log(val);
    instancesStats.value = val;
}

route.meta.title = t('_servers.title');
</script>

<style scoped>
@screen lg {
    .server-list {
        grid-template-columns: 300px 1fr;
    }
}
</style>