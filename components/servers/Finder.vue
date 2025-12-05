<template>
    <div 
        class="px-6 grid server-list gap-8"
        :class="[
            (v_view === 'list') && 'container mx-auto max-w-screen-xl',
            (v_view === 'grid') && 'mx-auto max-w-[2560px]',
        ]"
    >
        <aside
            class="fixed z-50 transition-transform -mx-6 w-full lg:w-[calc(100%+3rem)] bg-neutral-200 dark:bg-neutral-800 bottom-0 rounded-t-xl lg:translate-y-0 lg:shadow-none lg:bg-transparent dark:lg:bg-transparent lg:relative"
            :class="sortOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3rem)]'"
        >
            <button
                class="transition-[height] block w-full font-bold text-lg leading-[3rem] overflow-hidden text-center rounded-t-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 lg:hidden"
                :class="sortOpen ? 'h-0' : 'h-12'"
                @click="sortOpen = true"
            >
                {{ $t('_servers._search.title') }}
            </button>
            <div class="lg:sticky lg:top-24 lg:overflow-y-auto lg:max-h-[calc(100vh-6rem)] p-6 lg:py-2 space-y-4">
                <div class="flex items-center">
                    <h3 class="text-xl font-bold">{{ $t('_servers._search.title') }}</h3>
                    <button @click="sortOpen = false" class="ml-auto w-8 h-8 p-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 lg:hidden">
                        <XIco class="w-7 h-7" />
                    </button>
                </div>
                <form @submit.prevent="applyQuery">
                    <label class="form-label" for="query">{{ $t('_servers._search.query') }}</label>
                    <div class="input-group">
                        <input class="form-control" type="search" autocomplete="off" id="query" v-model="f_query_partial" />
                        <button type="submit" class="btn btn-outline-primary">
                            <SearchIco class="stroke-[0.5] stroke-current" />
                        </button>
                    </div>
                </form>
                <div>
                    <label class="form-label" for="languages">{{ $t('_servers._search.lang') }}</label>
                    <select id="languages" v-model="f_langs" class="form-select">
                        <option :value="null">{{ $t('_servers._search.all') }}</option>
                        <option v-for="langName, langCode in langs" :value="langCode">{{ langCode }} {{ langName != '' ? `(${langName})` : '' }}</option>
                    </select>
                </div>
                <div>
                    <label class="form-label" for="orderBy">{{ $t('_servers._search.orderBy') }}</label>
                    <div class="input-group">
                        <select id="orderBy" v-model="f_orderBy" class="form-select">
                            <option value="recomendded">{{ $t('_servers._search.recomendded') }}</option>
                            <option value="notesPer15Days">{{ $t('_servers._search.notesPer15Days') }}</option>
                            <option value="notesCount">{{ $t('_servers._search.notesCount') }}</option>
                            <option value="usersCount">{{ $t('_servers._search.usersCount') }}</option>
                        </select>
                        <button class="btn btn-outline-primary" @click="switchOrder()">
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
                <h3 class="pt-2 text-xl font-bold">{{ $t('_servers._view.title') }}</h3>
                <div class="btn-group w-full" role="group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="grid" v-model="v_view">
                    <label class="btn btn-outline-primary truncate" for="btnradio1"><GridIco class="mr-1" />{{ $t('_servers._view.grid') }}</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="list" v-model="v_view">
                    <label class="btn btn-outline-primary truncate" for="btnradio2"><ListIco class="mr-1" />{{ $t('_servers._view.list') }}</label>
                </div>
            </div>
        </aside>
        <div>
            <div
                class="grid gap-4"
                :class="[
                    (v_view === 'grid') && 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5',
                    (v_view === 'list') && 'grid-cols-1',
                ]"
            >
                <ServersItem v-if="filteredInstances.length > 0" v-for="item in filteredInstances.slice(0, f_limit)" :instance="item" :view="v_view" />
                <div
                    v-else-if="data"
                    class="rounded-lg p-6 min-h-[40vh] flex items-center bg-neutral-100 dark:bg-neutral-800"
                    :class="[
                        (v_view === 'grid') && 'sm:col-span-2 xl:col-span-3 2xl:col-span-4 3xl:col-span-5'
                    ]"
                >
                    <div class="mx-auto text-center">
                        <img src="https://xn--931a.moe/assets/info.jpg" class="rounded-lg mx-auto mb-4" />
                        <p class="max-w-xs" style="word-break: auto-phrase;">{{ $t('_servers._list.notFound') }}</p>
                    </div>
                </div>
                <div
                    v-else
                    class="rounded-lg p-6 min-h-[40vh] flex items-center bg-neutral-100 dark:bg-neutral-800"
                    :class="[
                        (v_view === 'grid') && 'sm:col-span-2 xl:col-span-3 2xl:col-span-4 3xl:col-span-5'
                    ]"
                >
                    <div class="mx-auto text-center">
                        <MkLoading class="mx-auto"></MkLoading>
                        <p class="max-w-xs">{{ $t('loading') }}</p>
                    </div>
                </div>
                <button
                    v-if="f_limit < filteredInstances.length" @click="f_limit += 60"
                    class="btn btn-outline-primary btn-lg block px-4"
                    :class="[
                        (v_view === 'grid') && 'sm:col-span-2 xl:col-span-3 2xl:col-span-4 3xl:col-span-5'
                    ]"
                >
                    <ArrowIco class="mr-1" />{{ $t('_servers._list.showMore') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InstanceInfo, InstanceItem, InstancesStatsObj } from '@/types/instances-info';
import { resolveObjPath, kanaHalfToFull } from '@/assets/js/misc';

import SearchIco from 'bi/search.svg';
import SortUpIco from 'bi/sort-down-alt.svg';
import SortDownIco from 'bi/sort-down.svg';
import ArrowIco from 'bi/arrow-down-circle.svg';
import XIco from 'bi/x.svg';
import GridIco from 'bi/grid-3x2-gap.svg';
import ListIco from 'bi/view-stacked.svg';

const { t, locale } = useI18n();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const emits = defineEmits<{
    (e: 'load', value?: InstancesStatsObj, updatedAt?: string): void;
}>();

// ▼スマホ用ソート▼
const sortOpen = ref(false);
// ▲スマホ用ソート▲

// ▼フォームデータ初期化▼
type MiHubSFStorage = {
    f_langs: string | null;
    f_orderBy: 'recomendded' | 'notesCount' | 'notesPer15Days' | 'usersCount';
    f_order: 'asc' | 'desc';
    f_registerAcceptance: 'public' | 'inviteOnly' | null;
    v_view: 'grid' | 'list';
};

let savedSettings: MiHubSFStorage | null = null;
if (import.meta.client) {
    savedSettings = JSON.parse(window.localStorage.getItem('miHub_server_finder') ?? 'null') as MiHubSFStorage | null;
}

// 言語フィルタはAPIの取得後に初期化するため、watcherがそれまでは動かないようにする
let f_langs_initialized = (savedSettings?.f_langs !== null);

const f_query_partial = ref<string>("");

const f_query = ref<string>("");
const f_langs = ref<MiHubSFStorage['f_langs']>(savedSettings?.f_langs ?? null);
const f_orderBy = ref<MiHubSFStorage['f_orderBy']>(savedSettings?.f_orderBy ?? 'recomendded');
const f_order = ref<MiHubSFStorage['f_order']>(savedSettings?.f_order ?? 'desc');
const f_registerAcceptance = ref<MiHubSFStorage['f_registerAcceptance']>(savedSettings?.f_registerAcceptance || null);

const f_limit = ref<number>(60);

const v_view = ref<MiHubSFStorage['v_view']>(savedSettings?.v_view ?? 'grid');
// ▲フォームデータ初期化▲

// ▼フォームデータ保存処理▼
watch([f_langs, f_orderBy, f_order, f_registerAcceptance, v_view], (to, from) => {
    f_limit.value = 60;

    const newSettings: MiHubSFStorage = {
        f_langs: f_langs_initialized ? to[0] : from[0],
        f_orderBy: to[1],
        f_order: to[2],
        f_registerAcceptance: to[3],
        v_view: to[4],
    };

    if (import.meta.client) {
        window.localStorage.setItem('miHub_server_finder', JSON.stringify(newSettings));
    }
});
// ▲フォームデータ保存処理▲

route.meta.title = t('_servers.title');
route.meta.description = t('_servers.description');

// ▼API取得処理▼
function onRequestError() {
    alert(t('_servers._system.fetchError'));
}

const { data } = await useGAsyncData<[InstanceInfo | null, Record<string, string> | null]>('serverInfo', () => Promise.allSettled([
    $fetch<InstanceInfo>(`${runtimeConfig.public.serverListApiBaseUrl}/instances.json`),
    $fetch<Record<string, string>>(`${runtimeConfig.public.serverListApiBaseUrl}/_hub/langs.json`),
]).then(([instances, langs]) => {
    if (instances.status !== 'fulfilled') {
        onRequestError();
        return [null, langs.status === 'fulfilled' ? langs.value : null];
    }

    return [
        instances.status === 'fulfilled' ? instances.value : null,
        langs.status === 'fulfilled' ? langs.value : null,
    ];
}));

const instanceInfo = computed(() => data.value?.[0]);
const langs = computed(() => data.value?.[1] ?? {});
// ▲API取得処理▲

// ▼言語フィルタ初期化処理▼
if (f_langs.value === null && instanceInfo.value && instanceInfo.value.langs.includes(locale.value)) {
    f_langs.value = locale.value;
}
f_langs_initialized = true;
// ▲言語フィルタ初期化処理▲

// ▼ページ側統計データ伝達▼
if (instanceInfo.value?.stats.usersCount) {
    emits('load', {
        notesCount: instanceInfo.value.stats.notesCount,
        usersCount: instanceInfo.value.stats.usersCount,
        instancesCount: instanceInfo.value.stats.instancesCount,
    }, instanceInfo.value.date);
}

watch(instanceInfo, (to) => {
    if (to?.stats.usersCount) {
        emits('load', {
            notesCount: to.stats.notesCount,
            usersCount: to.stats.usersCount,
            instancesCount: to.stats.instancesCount,
        }, to.date);
    }
}, {
    deep: true,
});
// ▲ページ側統計データ伝達▲

const filteredInstances = computed<InstanceItem[]>(() => {
    let instances = instanceInfo.value?.instancesInfos ?? [];

    if (instances.length === 0) {
        return [];
    }

    if (f_query.value) {
        instances = instances.filter((instance) => normalizeString(instance.name).includes(f_query.value) || normalizeString(instance?.description ?? '').includes(f_query.value));
    }
    if (f_langs.value) {
        instances = instances.filter((instance) => instance.langs.includes(f_langs.value ?? ''));
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
                case 'notesPer15Days':
                    orderKey = 'npd15';
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

function normalizeString(str: string) {
    // アルファベットは小文字に、半角カタカナは全角ひらがなに、全角カタカナは全角ひらがなに変換
    const _res = kanaHalfToFull(str.toLowerCase()).replace(/[ァ-ン]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0x60));
    return _res;
}

function applyQuery() {
    f_query.value = normalizeString(f_query_partial.value);
}
</script>

<style scoped>
@screen lg {
    .server-list {
        grid-template-columns: 300px 1fr;
    }
}
</style>
