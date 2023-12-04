<template>
    <div class="container mx-auto max-w-screen-xl px-6 grid server-list gap-8">
        <aside
            class="fixed z-50 transition-transform -mx-6 w-full bg-slate-200 dark:bg-slate-800 bottom-0 rounded-t-xl lg:translate-y-0 lg:shadow-none lg:bg-transparent dark:lg:bg-transparent lg:mx-0 lg:relative"
            :class="sortOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3rem)]'"
        >
            <button
                class="transition-[height] block w-full font-bold text-lg leading-[3rem] overflow-hidden text-center rounded-t-xl hover:bg-slate-300 dark:hover:bg-slate-700 lg:hidden"
                :class="sortOpen ? 'h-0' : 'h-12'"
                @click="sortOpen = true"
            >
                {{ $t('_servers._search.title') }}
            </button>
            <div class="lg:sticky lg:top-24 p-6 lg:px-0 lg:py-2 space-y-4">
                <div class="flex items-center">
                    <h3 class="text-xl font-bold">{{ $t('_servers._search.title') }}</h3>
                    <button @click="sortOpen = false" class="ml-auto w-8 h-8 p-0.5 rounded-full bg-slate-100 dark:bg-slate-900 lg:hidden">
                        <XIco class="w-7 h-7" />
                    </button>
                </div>
                <form @submit.prevent="() => { f_query = f_query_partial }">
                    <label class="form-label" for="query">{{ $t('_servers._search.query') }}</label>
                    <div class="input-group">
                        <input class="form-control" type="search" autocomplete="off" id="query" v-model="f_query_partial" />
                        <button type="submit" class="btn btn-outline-primary hover:!text-white">
                            <SearchIco class="stroke-[0.5] stroke-current" />
                        </button>
                    </div>
                </form>
                <div>
                    <label class="form-label" for="languages">{{ $t('_servers._search.lang') }}</label>
                    <select id="languages" v-model="f_langs" class="form-select">
                        <option :value="null">{{ $t('_servers._search.all') }}</option>
                        <option v-for="lang in langs" :value="lang.lang">{{ lang.label }}</option>
                    </select>
                </div>
                <div>
                    <label class="form-label" for="orderBy">{{ $t('_servers._search.orderBy') }}</label>
                    <div class="input-group">
                        <select id="orderBy" v-model="f_orderBy" class="form-select">
                            <option value="recomendded">{{ $t('_servers._search.recomendded') }}</option>
                            <option value="notesCount">{{ $t('_servers._search.notesCount') }}</option>
                            <option value="usersCount">{{ $t('_servers._search.usersCount') }}</option>
                        </select>
                        <button class="btn btn-outline-primary hover:!text-white" @click="switchOrder()">
                            <SortDownIco v-if="f_order === 'desc'" class="stroke-[0.5] stroke-current" />
                            <SortUpIco v-else class="stroke-[0.5] stroke-current" />
                        </button>
                    </div>
                </div>
                <div>
                    <div class="mb-1">{{ $t('_servers._registerAcceptance.title') }}</div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="registerAcceptance" v-model="f_registerAcceptance" :value="null" id="registerAcceptance0">
                        <label class="form-check-label" for="registerAcceptance0">
                            {{ $t('_servers._search.all') }}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="registerAcceptance" v-model="f_registerAcceptance" value="public" id="registerAcceptance1">
                        <label class="form-check-label" for="registerAcceptance1">
                            {{ $t('_servers._registerAcceptance.public') }}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="registerAcceptance" v-model="f_registerAcceptance" value="inviteOnly" id="registerAcceptance2">
                        <label class="form-check-label" for="registerAcceptance2">
                            {{ $t('_servers._registerAcceptance.inviteOnly') }}
                        </label>
                    </div>
                </div>
            </div>
        </aside>
        <div>
            <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                <ServersItem v-if="filteredInstances.length > 0" v-for="item in filteredInstances.slice(0, f_limit)" :instance="item" />
                <div v-else-if="data" class="rounded-lg p-6 min-h-[40vh] flex items-center sm:col-span-2 md:col-span-2 lg:col-span-2 bg-slate-100 dark:bg-slate-800">
                    <div class="mx-auto text-center">
                        <img src="https://xn--931a.moe/assets/info.jpg" class="rounded-lg mx-auto mb-4" />
                        <p class="max-w-xs">{{ $t('_servers._list.notFound') }}</p>
                    </div>
                </div>
                <div v-else class="rounded-lg p-6 min-h-[40vh] flex items-center sm:col-span-2 md:col-span-2 lg:col-span-2 bg-slate-100 dark:bg-slate-800">
                    <div class="mx-auto text-center">
                        <MkLoading class="mx-auto"></MkLoading>
                        <p class="max-w-xs">{{ $t('loading') }}</p>
                    </div>
                </div>
                <button v-if="f_limit < filteredInstances.length" @click="f_limit += 24" class="btn btn-outline-primary btn-lg hover:!text-white block sm:col-span-2 md:col-span-3 lg:col-span-2 px-4">
                    <ArrowIco class="mr-1" />{{ $t('_servers._list.showMore') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InstanceInfo, InstanceItem, InstancesStatsObj } from '@/types/instances-info';
import { resolveObjPath } from '@/assets/js/misc';
import langs from '@/assets/data/lang';

import SearchIco from 'bi/search.svg';
import SortUpIco from 'bi/sort-down-alt.svg';
import SortDownIco from 'bi/sort-down.svg';
import ArrowIco from 'bi/arrow-down-circle.svg';
import XIco from 'bi/x.svg';

const { t, locale } = useI18n();
const route = useRoute();
const emits = defineEmits<{
    (e: 'load', value?: InstancesStatsObj): void;
}>();

// ▼スマホ用ソート▼
const sortOpen = ref(false);

// ▲スマホ用ソート▲

// ▼フォームデータ初期化▼
type MiHubSFStorage = {
    f_langs: string;
    f_orderBy: 'recomendded' | 'notesCount' | 'usersCount';
    f_order: 'asc' | 'desc';
    f_registerAcceptance: 'public' | 'inviteOnly' | null;
};

let savedSettings: MiHubSFStorage | null = null;
if (process.client) {
    savedSettings = JSON.parse(window.localStorage.getItem('miHub_server_finder') ?? 'null') as MiHubSFStorage | null;
}

const f_query_partial = ref<string>("");

const f_query = ref<string>("");
const f_langs = ref<MiHubSFStorage['f_langs']>(savedSettings?.f_langs ?? locale.value);
const f_orderBy = ref<MiHubSFStorage['f_orderBy']>(savedSettings?.f_orderBy ?? 'recomendded');
const f_order = ref<MiHubSFStorage['f_order']>(savedSettings?.f_order ?? 'desc');
const f_registerAcceptance = ref<MiHubSFStorage['f_registerAcceptance']>(savedSettings?.f_registerAcceptance || null);

const f_limit = ref<number>(24);
// ▲フォームデータ初期化▲

// ▼フォームデータ保存処理▼
watch([f_langs, f_orderBy, f_order, f_registerAcceptance], (to, from) => {
    f_limit.value = 24;

    const newSettings: MiHubSFStorage = {
        f_langs: to[0],
        f_orderBy: to[1],
        f_order: to[2],
        f_registerAcceptance: to[3],
    };

    if (process.client) {
        window.localStorage.setItem('miHub_server_finder', JSON.stringify(newSettings));
    }
});
// ▲フォームデータ保存処理▲

route.meta.title = t('_servers.title');
route.meta.description = t('_servers.description');

const { data } = await useFetch<InstanceInfo>('https://instanceapp.misskey.page/instances.json', {
    onRequestError: () => {
        alert(t('_servers._system.fetchError'));
    }
});

if (data.value?.stats.usersCount) {
    emits('load', {
        notesCount: data.value.stats.notesCount,
        usersCount: data.value.stats.usersCount,
        instancesCount: data.value.stats.instancesCount,
    });
}

watch(data, (to) => {
    if (to?.stats.usersCount) {
        emits('load', {
            notesCount: to.stats.notesCount,
            usersCount: to.stats.usersCount,
            instancesCount: to.stats.instancesCount,
        });
    }
}, {
    deep: true,
});

const filteredInstances = computed<InstanceItem[]>(() => {
    let instances = data.value?.instancesInfos ?? [];

    if (instances.length === 0) {
        return [];
    }

    if (f_query.value) {
        instances = instances.filter((instance) => instance.name.includes(f_query.value) || instance.description?.includes(f_query.value));
    }
    if (f_langs.value) {
        instances = instances.filter((instance) => instance.langs.includes(f_langs.value));
    }
    if (f_registerAcceptance.value) {
        instances = instances.filter((instance) => {
            if (f_registerAcceptance.value === 'inviteOnly') {
                return instance.meta?.disableRegistration;
            } else {
                return !instance.meta?.disableRegistration ?? true;
            }
        });
    }
    if (f_orderBy.value) {
        instances.sort((a, b) => {
            let orderKey: string;
            
            switch(f_orderBy.value) {
                case 'recomendded':
                    orderKey = 'value';
                    break;
                case 'notesCount':
                    orderKey = 'stats.originalNotesCount';
                    break;
                case 'usersCount':
                    orderKey = 'stats.originalUsersCount';
                    break;
            }

            if (f_order.value === 'desc') {
                return resolveObjPath(a, orderKey) > resolveObjPath(b, orderKey) ? -1 : 1;
            } else {
                return resolveObjPath(a, orderKey) < resolveObjPath(b, orderKey) ? -1 : 1;
            }
        });
    }

    return instances;
});

function switchOrder() {
    f_order.value = f_order.value === 'asc' ? 'desc' : 'asc';
}
</script>

<style scoped>
@screen lg {
    .server-list {
        grid-template-columns: 300px 1fr;
    }
}
</style>