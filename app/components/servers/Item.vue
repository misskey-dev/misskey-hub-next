<template>
    <div class="border border-gray-300 dark:border-gray-800 dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden focus-within:ring-2 ring-accent-500 ring-offset-2">
        <GNuxtLink :to="`https://${instance.url}`" target="_blank" class="relative">
            <template v-if="view === 'grid'">
                <div class="relative aspect-video bg-gray-200 dark:bg-gray-600">
                    <img v-if="instance.background" loading="lazy" :src="`https://instanceapp.misskey.page/instance-backgrounds/${instance.url}.webp`" class="w-full h-full object-cover" />
                    <img v-else-if="instance.banner" loading="lazy" :src="`https://instanceapp.misskey.page/instance-banners/${instance.url}.webp`" class="w-full h-full object-cover" />
                    <div class="absolute h-1/2 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black text-white p-4 flex items-end">
                        <div class="h-14 w-14 min-w-0 flex-shrink-0 mr-4">
                            <img v-if="instance.icon" :src="`https://instanceapp.misskey.page/instance-icons/${instance.url}.webp`" class="w-full h-full rounded" />
                        </div>
                        <div class="min-w-0 flex flex-col justify-end">
                            <h2 class="font-bold text-2xl whitespace-nowrap truncate">{{ instance.name }}</h2>
                            <p class="opacity-90 text-sm truncate">{{ instance.url }} / v.{{ instance.nodeinfo?.software.version }}</p>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <p class="description h-12 mb-2">{{ instance.description }}</p>
                    <div class="grid grid-cols-3 text-center">
                        <dl>
                            <dt class="text-xs opacity-90">{{ $t('_servers._statistics.notes') }}</dt>
                            <dd :title="$n(instance.stats?.originalNotesCount)" class="font-bold text-accent-600">{{ instance.stats?.originalNotesCount ? $n(instance.stats.originalNotesCount, instance.stats.originalNotesCount >= 100000 ? { notation: 'compact', maximumFractionDigits: 1 } : { notation: 'standard' }) : '' }}</dd>
                        </dl>
                        <dl>
                            <dt class="text-xs opacity-90">{{ $t('_servers._statistics.users') }}</dt>
                            <dd :title="$n(instance.stats?.originalUsersCount)" class="font-bold text-accent-600">{{ instance.stats?.originalUsersCount ? $n(instance.stats.originalUsersCount, instance.stats.originalUsersCount >= 100000 ? { notation: 'compact', maximumFractionDigits: 1 } : { notation: 'standard' }) : '' }}</dd>
                        </dl>
                        <dl>
                            <dt class="text-xs opacity-90">{{ $t('_servers._registerAcceptance.title') }}</dt>
                            <dd class="font-bold text-accent-600">{{ instance.meta?.disableRegistration ? $t('_servers._registerAcceptance.inviteOnly') : $t('_servers._registerAcceptance.public')}}</dd>
                        </dl>
                    </div>
                </div>
            </template>
            <template v-else-if="view === 'list'">
                <div class="absolute h-full w-4/5 top-0 left-0 overflow-hidden">
                    <img v-if="instance.background" loading="lazy" :src="`https://instanceapp.misskey.page/instance-backgrounds/${instance.url}.webp`" class="h-full w-full object-cover object-center opacity-40 blur-md" />
                    <img v-else-if="instance.banner" loading="lazy" :src="`https://instanceapp.misskey.page/instance-banners/${instance.url}.webp`" class="h-full w-full object-cover object-center opacity-40 blur-md" />
                    <div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent to-white dark:to-slate-800"></div>
                </div>
                <div class="relative flex w-full items-center p-2">
                    <div class="h-14 w-14 min-w-0 flex-shrink-0 mr-4">
                        <img v-if="instance.icon" :src="`https://instanceapp.misskey.page/instance-icons/${instance.url}.webp`" class="w-full h-full rounded" />
                    </div>
                    <div class="truncate">
                        <h2 class="font-bold text-xl whitespace-nowrap truncate">{{ instance.name }}</h2>
                        <p class="opacity-90 hidden sm:block text-sm truncate">{{ instance.url }} / v.{{ instance.nodeinfo?.software.version }}</p>
                        <p class="text-sm flex sm:hidden space-x-2">
                            <dl class="flex space-x-1">
                                <dt class="opacity-90">{{ $t('_servers._statistics.users') }}</dt>
                                <dd class="font-bold text-accent-600">{{ instance.stats?.originalUsersCount.toLocaleString() }}</dd>
                            </dl>
                            <dl class="flex space-x-1">
                                <dt class="opacity-90">{{ $t('_servers._registerAcceptance.title') }}</dt>
                                <dd class="font-bold text-accent-600">{{ instance.meta?.disableRegistration ? $t('_servers._registerAcceptance.inviteOnly') : $t('_servers._registerAcceptance.public')}}</dd>
                            </dl>
                        </p>
                    </div>
                    <div class="ml-auto flex-shrink-0 hidden min-w-[17rem] sm:grid grid-cols-3 text-center">
                        <dl>
                            <dt class="text-xs opacity-90">{{ $t('_servers._statistics.notes') }}</dt>
                            <dd class="font-bold text-accent-600">{{ instance.stats?.originalNotesCount.toLocaleString() }}</dd>
                        </dl>
                        <dl>
                            <dt class="text-xs opacity-90">{{ $t('_servers._statistics.users') }}</dt>
                            <dd class="font-bold text-accent-600">{{ instance.stats?.originalUsersCount.toLocaleString() }}</dd>
                        </dl>
                        <dl>
                            <dt class="text-xs opacity-90">{{ $t('_servers._registerAcceptance.title') }}</dt>
                            <dd class="font-bold text-accent-600">{{ instance.meta?.disableRegistration ? $t('_servers._registerAcceptance.inviteOnly') : $t('_servers._registerAcceptance.public')}}</dd>
                        </dl>
                    </div>
                </div>
            </template>
        </GNuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { InstanceItem } from '@@/types/instances-info';

withDefaults(defineProps<{
    instance: InstanceItem;
    view?: 'grid' | 'list';
}>(), {
    view: 'grid',
});
</script>

<style scoped>
.description {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
}
</style>