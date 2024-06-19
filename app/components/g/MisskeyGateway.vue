<template>
    <div class="min-h-screen">
        <div class="sm:py-20 sm:max-w-xl mx-auto">
            <div class="p-6 bg-white dark:bg-gray-800 sm:rounded-lg min-h-screen sm:min-h-[230px]">
                <div v-if="loading" class="mx-auto py-12">
                    <MkLoading />
                </div>
                <div v-else class="space-y-6">
                    <div class="w-12 h-12 mx-auto bg-accent-600/20 text-accent-600 rounded-full p-3">
                        <component :is="branding?.icon ?? ShareIco" class="w-6 h-6" />
                    </div>
                    <h1 class="font-bold text-center text-lg sm:text-xl">{{ branding?.heading ?? $t('_share.chooseServer') }}</h1>
                    
                    <div v-if="manualInstanceData">
                        <div class="text-xs sm:text-sm mb-1 opacity-70">
                            {{ $t('_share.recommendedByWebsite') }}
                            <NuxtLink :to="localePath('/docs/for-users/features/share-form/#hub-share-disclaimer')" target="_blank"><HelpIco class="ml-1" /></NuxtLink>
                        </div>
                        <div class="rounded-lg border border-gray-300 dark:border-gray-600 group">
                            <component
                                :is="action.type === 'link' ? GNuxtLink : 'button'"
                                v-bind="action.type === 'link' && { to: joinURL(`https://${manualInstanceData.url}/`, action.path) }"
                                @click="handleClick(manualInstanceData)"
                                class="group-first:rounded-t-lg group-last:rounded-b-lg py-2 px-4 sm:p-4 w-full flex items-center hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
                            >
                                <div
                                    class="h-6 w-6 sm:h-9 sm:w-9 flex-shrink-0 overflow-hidden rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mr-3"
                                >
                                    <img v-if="manualInstanceData.icon && manualInstanceData.meta?.iconUrl" :src="manualInstanceData.meta?.iconUrl" class="w-full h-full" />
                                </div>
                                <div class="min-w-0 mr-3 text-start">
                                    <h2 class="text-sm sm:text-base font-bold truncate">{{ manualInstanceData.name }}</h2>
                                    <p class="text-xs truncate">{{ manualInstanceData.url }}</p>
                                </div>
                                <ArrowRightIco class="block ml-auto flex-shrink-0 h-4 w-4" />
                            </component>
                        </div>
                    </div>

                    <ul class="rounded-lg border divide-y border-gray-300 dark:border-gray-600 divide-gray-300 dark:divide-gray-600">
                        <li v-for="instance in displayInstances" :key="instance.url" class="group">
                            <component
                                :is="action.type === 'link' ? GNuxtLink : 'button'"
                                v-bind="action.type === 'link' && { to: joinURL(`https://${instance.url}/`, action.path) }"
                                @click="handleClick(instance)"
                                class="group-first:rounded-t-lg group-last:rounded-b-lg py-2 px-4 sm:p-4 w-full flex items-center hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
                            >
                                <div
                                    class="h-6 w-6 sm:h-9 sm:w-9 flex-shrink-0 overflow-hidden rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mr-3"
                                    :class="instance.isUserDefined && 'transition-[border-color] hover:border-red-600 dark:hover:border-red-600'"
                                >
                                    <template v-if="instance.isUserDefined">
                                        <button class="relative w-full h-full group/delete" @click.stop.prevent="deleteInstance(instance.url)">
                                            <img v-if="instance.icon && instance.meta?.iconUrl" :src="getInstanceImage(instance)" class="w-full h-full" />
                                            <div v-else-if="['forked', 'notDetermined'].includes(getPlaceholderImage(instance))" class="w-full h-full bg-accent-600/20 p-1 sm:p-2 text-accent-600">
                                                <ForkedIco v-if="getPlaceholderImage(instance) === 'forked'" class="block h-4 w-4 sm:h-5 sm:w-5 stroke-1 stroke-current" />
                                                <QuestionIco v-else class="block h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                            <img v-else :src="getPlaceholderImage(instance)" class="w-full h-full" />
                                            <div class="pointer-events-none absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-800 transition-opacity opacity-0 group-hover/delete:opacity-100 p-1 sm:p-2 text-red-600">
                                                <DeleteIco class="block h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                        </button>
                                    </template>
                                    <img v-else-if="instance.icon && instance.meta?.iconUrl" :src="instance.meta?.iconUrl" class="w-full h-full" />
                                </div>
                                <div class="min-w-0 mr-3 text-start">
                                    <h2 class="text-sm sm:text-base font-bold truncate">{{ instance.name }}</h2>
                                    <p class="text-xs truncate">{{ instance.url }}</p>
                                </div>
                                <ArrowRightIco class="block ml-auto flex-shrink-0 h-4 w-4" />
                            </component>
                        </li>
                        <li class="group">
                            <details class="group-first:rounded-t-lg group-last:rounded-b-lg group/details">
                                <summary class="p-4 w-full flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 group-first:rounded-t-lg group-last:rounded-b-lg group-last:group-open/details:rounded-b-none group-open/details:border-b cursor-pointer border-gray-300 dark:border-gray-600">
                                    <div class="h-6 w-6 sm:h-9 sm:w-9 mr-2">
                                        <div class="w-full h-full rounded bg-accent-600/20 p-1 sm:p-2 text-accent-600">
                                            <PlusIco class="block h-4 w-4 sm:h-5 sm:w-5 stroke-1 stroke-current" />
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
                                            <button type="submit" class="btn btn-primary" :disabled="iFetching"><PlusIco class="h-4 w-4 stroke-1 stroke-current" /></button>
                                        </div>
                                        <div class="form-text">{{ $t('_share.compatibleWith') }}</div>
                                    </form>
                                </div>
                            </details>
                        </li>
                    </ul>
                    <div class="text-sm text-center">
                        &copy; 2024 syuilo and Misskey Project<br>
                        <GNuxtLink to="https://misskey-hub.net/" target="_blank" class="hover:underline underline-offset-1">Misskey Hub</GNuxtLink>
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
import QuestionIco from 'bi/question-lg.svg';
import HelpIco from 'bi/question-circle.svg';
import ForkedIco from '@/assets/svg/repo-forked.svg';
import { isLocalPath, resolveObjPath } from '@/assets/js/misc';
import { parseURL, joinURL } from 'ufo';
import { api as misskeyApi } from 'misskey-js';
import { forkedSoftwares } from '@/assets/data/forks';
import { GNuxtLink } from '#components';
import type { InstanceInfo, InstanceItem } from '@@/types/instances-info';
import type { FunctionalComponent } from 'vue';

const { t } = useI18n();
const localePath = useGLocalePath();

const props = defineProps<{
    action: {
        type: 'link';
        path: string;
    } | {
        type: 'fn';
        onClick: (instance: ExtendedInstanceItem) => Promise<void>;
    };
    branding?: {
        heading?: string;
        icon?: FunctionalComponent | string;
    };
    manualInstance?: string;
}>();

type ExtendedInstanceItem = InstanceItem & {
    isUserDefined?: boolean;
};

const loading = ref(true);
const iFetching = ref(false);
const manualInstanceData = ref<ExtendedInstanceItem>();
const featuredInstances = ref<ExtendedInstanceItem[]>([]);
const userDefinedInstances = ref<ExtendedInstanceItem[]>([]);
const displayInstances = computed(() => [
    ...userDefinedInstances.value,
    ...featuredInstances.value,
]);
const userDefinedInstanceInput = ref<string>('');

async function getAndSetInstanceInfo() {
    if (!import.meta.client || !userDefinedInstanceInput.value || !userDefinedInstanceInput.value.includes('.')) return;
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
                npd15: 0,
                stats: undefined,
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

function getInstanceImage(instance: ExtendedInstanceItem | InstanceItem) {
    if (!instance.meta?.iconUrl) return;

    if (isLocalPath(instance.meta.iconUrl)) {
        return joinURL(`https://${instance.url}`, instance.meta.iconUrl);
    }
    return instance.meta.iconUrl;
}

function getPlaceholderImage(instance: ExtendedInstanceItem | InstanceItem) {
    if (instance.meta?.repositoryUrl) {
        if (forkedSoftwares.some((v) => instance.meta?.repositoryUrl ? instance.meta.repositoryUrl.toLowerCase().includes(v) : false)) {
            return 'forked';
        }
        if (instance.meta.repositoryUrl.includes('misskey')) {
            return '/img/icons/f/mi.png';
        }
    }
    return 'notDetermined';
}

async function handleClick(instance: ExtendedInstanceItem) {
    if (props.action.type !== 'fn') return;
    loading.value = true;
    await props.action.onClick(instance);
    loading.value = false;
}

onMounted(async () => {
    if (import.meta.client) {
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

        if (props.manualInstance) {
            const realHost = parseURL(props.manualInstance.startsWith('https://') ? props.manualInstance : 'https://' + props.manualInstance);
            if (!realHost.host) {
                alert(t('_servers._system.fetchError'));
                return;
            }

            const miApi = new misskeyApi.APIClient({
                origin: `https://${realHost.host}`,
            });

            try {
                const res = await miApi.request('meta', { detail: true });

                manualInstanceData.value = {
                    background: !(!res.backgroundImageUrl),
                    banner: !(!res.bannerUrl),
                    description: res.description,
                    icon: !(!res.iconUrl),
                    isAlive: true,
                    langs: res.langs,
                    meta: res,
                    name: res.name ?? '',
                    nodeinfo: null,
                    npd15: 0,
                    stats: undefined,
                    url: realHost.host ?? '',
                    value: 0,

                    isUserDefined: true,
                };
            } catch (err) {
                console.error(err);
            }

        }
    }

    loading.value = false;
});

watch(userDefinedInstances, (to) => {
    if (import.meta.client) {
        localStorage.setItem('miHub_share_instances', JSON.stringify(to));
    }
}, {
    deep: true,
});
</script>

<style scoped>

</style>