<template>
    <div class="border border-gray-300 dark:border-gray-800 dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden focus-within:ring-2 ring-accent-500 ring-offset-2">
        <NuxtLink :to="`https://${instance.url}`" target="_blank">
            <div class="relative aspect-video bg-gray-200 dark:bg-gray-600">
                <img v-if="instance.banner" :src="`https://instanceapp.misskey.page/instance-banners/${instance.url}.webp`" class="w-full h-full object-cover" />
                <img v-else-if="instance.background" :src="`https://instanceapp.misskey.page/instance-backgrounds/${instance.url}.webp`" class="w-full h-full object-cover" />
                <div class="absolute h-1/2 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black text-white p-4 flex items-end">
                    <div class="h-14 w-14 min-w-0 flex-shrink-0 mr-4">
                        <img v-if="instance.icon" :src="`https://instanceapp.misskey.page/instance-icons/${instance.url}.webp`" class="w-full h-full" />
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
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { InstanceItem } from 'types/instances-info';

defineProps<{
    instance: InstanceItem;
}>()
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