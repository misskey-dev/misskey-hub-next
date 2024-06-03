<template>
    <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
        <GLocalNav :items="[
            {
                name: $t('_servers._statistics.lang'),
                anchor: '#lang',
            },
            {
                name: $t('_servers._statistics.registerAcceptance'),
                anchor: '#registerAcceptance',
            },
            {
                name: $t('_servers._statistics.notes'),
                anchor: '#notes',
            },
            {
                name: $t('_servers._statistics.users'),
                anchor: '#users',
            },
            {
                name: $t('_servers._statistics.version'),
                anchor: '#version'
            }
        ]" />
        <div id="lang">
            <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_servers._statistics.lang`) }}</h2>
            <div class="grid gap-4 md:grid-cols-2">
                <div><ChartsCircGraph class="max-w-xs mx-auto" :data="langStats" :focusedIndex="langFocus" /></div>
                <div>
                    <ul class="space-y-1">
                        <li v-for="value, key, index in trunc(langStats)" class="grid py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" :class="$style.kvRoot" @mouseenter.passive="langFocus = index" @mouseleave.passive="langFocus = undefined">
                            <div v-if="key === '__others'">{{ $t('other') }}</div>
                            <div v-else>{{ key }} {{ lang.find((v) => v.lang === key)?.label ? `(${lang.find((v) => v.lang === key)?.label})` : '' }}</div>
                            <div class="font-bold font-mono text-accent-600">{{ $n(value) }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="registerAcceptance">
            <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_servers._statistics.registerAcceptance`) }}</h2>
            <div class="grid gap-4 md:grid-cols-2">
                <div><ChartsCircGraph class="max-w-xs mx-auto" :data="regAcceptanceStats" :focusedIndex="regAcceptanceFocus" :truncMinor="false" /></div>
                <div>
                    <ul class="space-y-1">
                        <li v-for="value, key, index in regAcceptanceStats" class="grid py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" :class="$style.kvRoot" @mouseenter.passive="regAcceptanceFocus = index" @mouseleave.passive="regAcceptanceFocus = undefined">
                            <div>{{ $t(`_servers._registerAcceptance.${key}`) }}</div>
                            <div class="font-bold font-mono text-accent-600">{{ $n(value) }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="notes">
            <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_servers._statistics.notes`) }}</h2>
            <div class="grid gap-4 md:grid-cols-2">
                <div><ChartsCircGraph class="max-w-xs mx-auto" :data="notesCountStats" :focusedIndex="notesCountFocus" /></div>
                <div>
                    <ul class="space-y-1">
                        <li v-for="value, key, index in trunc(notesCountStats)" class="grid py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" :class="$style.kvRoot" @mouseenter.passive="notesCountFocus = index" @mouseleave.passive="notesCountFocus = undefined">
                            <div v-if="key === '__others'">{{ $t('other') }}</div>
                            <div v-else>{{ key }}</div>
                            <div class="font-bold font-mono text-accent-600">{{ $n(value) }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="users">
            <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_servers._statistics.users`) }}</h2>
            <div class="grid gap-4 md:grid-cols-2">
                <div><ChartsCircGraph class="max-w-xs mx-auto" :data="usersCountStats" :truncMinor="0.008" :focusedIndex="usersCountFocus" /></div>
                <div>
                    <ul class="space-y-1">
                        <li v-for="value, key, index in trunc(usersCountStats, 0.008)" class="grid py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" :class="$style.kvRoot" @mouseenter.passive="usersCountFocus = index" @mouseleave.passive="usersCountFocus = undefined">
                            <div v-if="key === '__others'">{{ $t('other') }}</div>
                            <div v-else>{{ key }}</div>
                            <div class="font-bold font-mono text-accent-600">{{ $n(value) }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="version">
            <h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">{{ $t(`_servers._statistics.version`) }}</h2>
            <div class="grid gap-4 md:grid-cols-2">
                <div><ChartsCircGraph class="max-w-xs mx-auto" :data="avgVersionStats" :truncMinor="0.005" :focusedIndex="avgVersionFocus" /></div>
                <div>
                    <ul class="space-y-1">
                        <li v-for="value, key, index in trunc(avgVersionStats, 0.005)" class="grid py-1 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" :class="$style.kvRoot" @mouseenter.passive="avgVersionFocus = index" @mouseleave.passive="avgVersionFocus = undefined">
                            <div v-if="key === '__others'">{{ $t('other') }}</div>
                            <div v-else>{{ key }}</div>
                            <div class="font-bold font-mono text-accent-600">{{ $n(value) }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InstanceInfo } from '@/types/instances-info';
import lang from '~/assets/data/lang';

const { t } = useI18n();

const { data } = await useFetch<InstanceInfo>('https://instanceapp.misskey.page/instances.json', {
    onRequestError: () => {
        alert(t('_servers._system.fetchError'));
    }
});

const langStats = computed(() => {
    const d = data.value?.instancesInfos;
    if (!d || d.length === 0) {
        return [];
    }
    const out: Record<string, number> = {};
    d.forEach((v) => {
        if (!out[v.langs[0]]) {
            out[v.langs[0]] = 1;
        } else {
            out[v.langs[0]]++;
        }
    });

    return Object.entries(out)
        .sort(([, a], [, b]) => b - a)
        .reduce(
            (r, [k, v]) => ({
            ...r,
            [k]: v
            }),
            {}
        );
});
const langFocus = ref<number | undefined>();

const regAcceptanceStats = computed(() => {
    const d = data.value?.instancesInfos;
    if (!d || d.length === 0) {
        return [];
    }
    const out = {
        public: 0,
        inviteOnly: 0,
    };
    d.forEach((v) => {
        if (v.meta?.disableRegistration) {
            out.inviteOnly++;
        } else {
            out.public++;
        }
    });

    return Object.entries(out)
        .sort(([, a], [, b]) => b - a)
        .reduce(
            (r, [k, v]) => ({
            ...r,
            [k]: v
            }),
            {}
        );
});
const regAcceptanceFocus = ref<number | undefined>();

const notesCountStats = computed(() => {
    const d = data.value?.instancesInfos;
    if (!d || d.length === 0) {
        return [];
    }
    const out: Record<string, number> = {};

    d.forEach((v) => {
        out[v.name] = v.stats?.originalNotesCount ?? 0;
    });

    return Object.entries(out)
        .sort(([, a], [, b]) => b - a)
        .reduce(
            (r, [k, v]) => ({
            ...r,
            [k]: v
            }),
            {}
        );
});
const notesCountFocus = ref<number | undefined>();

const usersCountStats = computed(() => {
    const d = data.value?.instancesInfos;
    if (!d || d.length === 0) {
        return [];
    }
    const out: Record<string, number> = {};

    d.forEach((v) => {
        out[v.name] = v.stats?.originalUsersCount ?? 0;
    });

    return Object.entries(out)
        .sort(([, a], [, b]) => b - a)
        .reduce(
            (r, [k, v]) => ({
            ...r,
            [k]: v
            }),
            {}
        );
});
const usersCountFocus = ref<number | undefined>();

const avgVersionStats = computed(() => {
    const d = data.value?.instancesInfos;
    if (!d || d.length === 0) {
        return [];
    }
    const out: Record<string, number> = {};

    d.forEach((v) => {
        const ver = v.meta?.version.replace(/[-\+].+$/g, '');
        if (ver) {
            if (!out[ver]) {
                out[ver] = 1;
            } else {
                out[ver]++;
            }
        }
    });

    return Object.entries(out)
        .sort(([, a], [, b]) => b - a)
        .reduce(
            (r, [k, v]) => ({
            ...r,
            [k]: v
            }),
            {}
        );
});
const avgVersionFocus = ref<number | undefined>();

function trunc(obj: Record<any, number>, ratio: number = 0.02) {
    const sum = Object.values(obj).reduce((p, c) => p + c, 0);
    const toBeTrunked = Object.values(obj).filter((v) => v / sum < ratio);

    return {
        ...Object.entries(obj)
            .slice(0, (Object.values(obj).length - toBeTrunked.length))
            .reduce(
                (r, [k, v]) => ({
                ...r,
                [k]: v
                }),
                {}
            ),
        __others: toBeTrunked.reduce((p, c) => p + c, 0),
    };
}

</script>

<style module>
.kvRoot {
    grid-template-columns: 1fr auto;
}
</style>