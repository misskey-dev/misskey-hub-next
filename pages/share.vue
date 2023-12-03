<template>
    <div class="min-h-screen">
        <div class="sm:py-20 sm:max-w-xl mx-auto">
            <div class="p-6 bg-white dark:bg-gray-800 sm:rounded-lg min-h-screen sm:min-h-[230px]">
                <div v-if="loading" class="mx-auto py-12">
                    <MkLoading />
                </div>
                <div v-else class="space-y-6">
                    <div class="w-12 h-12 mx-auto bg-accent-600/20 text-accent-600 rounded-full p-3">
                        <ShareIco class="w-6 h-6" />
                    </div>
                    <h1 class="font-bold text-center text-lg md:text-xl">{{ $t('_share.chooseServer') }}</h1>
                    <ul class="rounded-lg border divide-y border-gray-300 dark:border-gray-600 divide-gray-300 dark:divide-gray-600">
                        <li v-for="instance in displayInstances" :key="instance.url" class="group">
                            <GNuxtLink
                                :to="`https://${instance.url}/share?${stringifyQuery(query)}`"
                                class="group-first:rounded-t-lg group-last:rounded-b-lg p-4 w-full flex items-center hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <div class="h-9 w-9 flex-shrink-0 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mr-3">
                                    <template v-if="instance.isUserDefined">
                                        <button class="relative w-full h-full rounded group/delete" @click.stop.prevent="deleteInstance(instance.url)">
                                            <img v-if="instance.icon" :src="instance.meta?.iconUrl" class="w-full h-full rounded" />
                                            <div class="pointer-events-none absolute top-0 left-0 w-full h-full rounded bg-white dark:bg-gray-800 ring-inset ring-1 ring-red-600 transition-opacity opacity-0 group-hover/delete:opacity-100 p-2 text-red-600">
                                                <DeleteIco class="h-5 w-5" />
                                            </div>
                                        </button>
                                    </template>
                                    <img v-else-if="instance.icon" :src="instance.meta?.iconUrl" class="w-full h-full rounded" />
                                </div>
                                <div class="min-w-0 mr-3">
                                    <h2 class="font-bold truncate">{{ instance.name }}</h2>
                                    <p class="text-xs truncate">{{ instance.url }}</p>
                                </div>
                                <ArrowRightIco class="block ml-auto flex-shrink-0 h-4 w-4" />
                            </GNuxtLink>
                        </li>
                        <li class="group">
                            <details class="group-first:rounded-t-lg group-last:rounded-b-lg group/details">
                                <summary class="p-4 w-full flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 group-first:rounded-t-lg group-last:rounded-b-lg group-last:group-open/details:rounded-b-none group-open/details:border-b cursor-pointer border-gray-300 dark:border-gray-600">
                                    <div class="h-9 w-9 mr-2">
                                        <div class="w-full h-full rounded bg-accent-600/20 p-2 text-accent-600">
                                            <PlusIco class="h-5 w-5 stroke-1 stroke-current" />
                                        </div>
                                    </div>
                                    <h2 class="font-bold">{{ $t('_share.addServer') }}</h2>
                                    <ArrowRightIco class="block ml-auto flex-shrink-0 h-4 w-4 transition-transform group-open/details:rotate-90" />
                                </summary>
                                <div class="p-4">
                                    <form @submit.prevent="getAndSetInstanceInfo">
                                        <label class="form-label inline-block" for="userDefinedInstanceInput">{{ $t('_share.domain') }}</label>
                                        <div class="input-group">
                                            <input id="userDefinedInstanceInput" class="form-control" autocomplete="off" placeholder="misskey.example.com" v-model="userDefinedInstanceInput" :disabled="iFetching" />
                                            <button type="submit" class="btn btn-primary !text-white hover:!text-white focus-visible:!text-white" :disabled="iFetching"><PlusIco class="h-4 w-4 stroke-1 stroke-current" /></button>
                                        </div>
                                        <div class="form-text">{{ $t('_share.compatibleWith') }}</div>
                                    </form>
                                </div>
                            </details>
                        </li>
                    </ul>
                    <div class="text-sm text-center">
                        &copy; 2023 Misskey, syuilo, and other contributors<br>
                        <GNuxtLink :to="localePath('/')" target="_blank" class="hover:underline underline-offset-1">Misskey Hub</GNuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ShareIco from 'bi/share-fill.svg';
import ArrowRightIco from 'bi/chevron-right.svg';
import PlusIco from 'bi/plus-lg.svg';
import DeleteIco from 'bi/trash.svg';
import { resolveObjPath } from '@/assets/js/misc';
import { stringifyQuery, parseURL } from 'ufo';
import { api as misskeyApi } from 'misskey-js';
import type { InstanceInfo, InstanceItem } from '@/types/instances-info';

definePageMeta({
    layout: 'blank',
});

useHead({
    meta: [
        { name: 'robots', content: 'noindex' },
    ],
});

const { query, meta } = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

meta.title = t('_share.title');

type ExtendedInstanceItem = InstanceItem & {
    isUserDefined?: boolean;
};

const loading = ref(true);
const iFetching = ref(false);
const featuredInstances = ref<ExtendedInstanceItem[]>([]);
const userDefinedInstances = ref<ExtendedInstanceItem[]>([]);
const displayInstances = computed(() => [
    ...userDefinedInstances.value,
    ...featuredInstances.value,
]);
const userDefinedInstanceInput = ref<string>('');

async function getAndSetInstanceInfo() {
    if (!process.client) return;
    iFetching.value = true;

    nextTick(async () => {
        const realHost = parseURL(userDefinedInstanceInput.value.startsWith('https://') ? userDefinedInstanceInput.value : 'https://' + userDefinedInstanceInput.value);
        if (!realHost.host) {
            alert(t('_servers._system.fetchError'));
            return;
        }

        const miApi = new misskeyApi.APIClient({
            origin: `https://${realHost.host}`,
        });

        try {
            const res = await miApi.request('meta', { detail: true });

            userDefinedInstances.value.push({
                background: !(!res.backgroundImageUrl),
                banner: !(!res.bannerUrl),
                description: res.description,
                icon: !(!res.iconUrl),
                isAlive: true,
                langs: res.langs,
                meta: res,
                name: res.name ?? '',
                nodeinfo: null,
                stats: {},
                url: realHost.host ?? '',
                value: 0,

                isUserDefined: true,
            });

            userDefinedInstanceInput.value = '';
        } catch (err) {
            alert(t('_servers._system.fetchError'));
            console.error(err);
        } finally {
            iFetching.value = false;
        }
    });
}

function deleteInstance(host: string) {
    const i = userDefinedInstances.value.findIndex((v) => v.url === host);
    userDefinedInstances.value.splice(i, 1);
}

onMounted(async () => {
    if (process.client) {
        const fetchedInfo = await window.fetch('https://instanceapp.misskey.page/instances.json');
        if (![200, 304].includes(fetchedInfo.status)) {
            alert(t('_servers._system.fetchError'));
            return;
        }
        const fetchedInfoJson = await fetchedInfo.json() as InstanceInfo;
        featuredInstances.value = fetchedInfoJson.instancesInfos.sort((a, b) => {
            return resolveObjPath(a, 'stats.originalUsersCount') > resolveObjPath(b, 'stats.originalUsersCount') ? -1 : 1;
        }).slice(0, 5);

        const ls = localStorage.getItem('miHub_share_instances');
        if (ls) {
            const lsJ = JSON.parse(ls) as ExtendedInstanceItem[];
            userDefinedInstances.value = [...lsJ];
        }
    }

    loading.value = false;
});

watch(userDefinedInstances, (to) => {
    if (process.client) {
        localStorage.setItem('miHub_share_instances', JSON.stringify(to));
    }
}, {
    deep: true,
});
</script>

<style scoped>

</style>