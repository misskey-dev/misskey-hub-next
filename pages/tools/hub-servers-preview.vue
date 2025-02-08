<template>
    <div class='container mx-auto max-w-(--breakpoint-xl) px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_miHubServerListPreview.title') }}
        </h1>
        <div class='rounded-lg grid md:grid-cols-2 gap-4'>
            <div class="space-y-4">
                <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-slate-950">
                    <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b">
                        {{ $t('preview') }}
                    </header>
                    <div inert>
                        <ServersItem    
                            class="max-w-[380px] mx-auto"
                            :instance="instance"
                            :disableDomParser="true"
                            :manualIcon="iconUrl"
                            :manualBackground="bgUrl"
                        />
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-slate-950">
                    <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b">
                        {{ $t('settings') }}
                    </header>
                    <div class="space-y-6">
                        <div>
                            <label for="name" class="mb-1">
                                {{ $t('_miHubServerListPreview.name') }}
                            </label>
                            <input v-model="name" type="text" id="name" class="form-control" />
                        </div>
                        <div>
                            <label for="description" class="mb-1">
                                {{ $t('_miHubServerListPreview.serverDescription') }}
                            </label>
                            <textarea v-model="description" id="description" class="form-control"></textarea>
                        </div>
                        <div>
                            <label for="icon" class="mb-1">
                                {{ $t('_miHubServerListPreview.icon') }}
                            </label>
                            <div class="input-group">
                                <input ref="iconEl" type="file" accept="image/*" id="icon" class="form-control" @change="onIconChange" />
                                <button v-if="icon !== null" type="button" class="btn btn-outline-primary" @click="removeIcon">
                                    <XIco class="stroke-1 stroke-current" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label for="bg" class="mb-1">
                                {{ $t('_miHubServerListPreview.bannerOrBg') }}
                            </label>
                            <div class="input-group">
                                <input ref="bgEl" type="file" accept="image/*" id="bg" class="form-control" @change="onBgChange" />
                                <button v-if="bg !== null" type="button" class="btn btn-outline-primary" @click="removeBg">
                                    <XIco class="stroke-1 stroke-current" />
                                </button>
                            </div>
                            <div class="form-text">{{ $t('_miHubServerListPreview.bannerOrBgDescription') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import XIco from 'bi/x-lg.svg';

import type { InstanceItem } from '@/types/instances-info';

definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const route = useRoute();

const name = ref('');
const description = ref('');

const icon = ref<File | null>(null);
const iconEl = shallowRef<HTMLInputElement | null>(null);
const iconUrl = computed<string | null>(() => icon.value ? URL.createObjectURL(icon.value) : null);
function onIconChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        icon.value = target.files[0];
    }
}
function removeIcon() {
    icon.value = null;
    if (iconEl.value) {
        iconEl.value.value = '';
    }
}

const bg = ref<File | null>(null);
const bgEl = shallowRef<HTMLInputElement | null>(null);
const bgUrl = computed<string | null>(() => bg.value ? URL.createObjectURL(bg.value) : null);
function onBgChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        bg.value = target.files[0];
    }
}
function removeBg() {
    bg.value = null;
    if (bgEl.value) {
        bgEl.value.value = '';
    }
}

const instance = computed<InstanceItem>(() => ({
    url: "misskey.example.com",
    langs: [],
    value: 0,
    meta: {
        disableRegistration: false,
    },
    nodeinfo: {
        software: {
            version: "2025.0.0",
        },
    },
    stats: {
        notesCount: 10000000,
        originalNotesCount: 10000000,
        usersCount: 1000000,
        originalUsersCount: 1000000,
        instances: 0,
        driveUsageLocal: 0,
        driveUsageRemote: 0,
    },
    npd15: 146602.4,
    name: name.value || "Misskey",
    description: description.value || "The most powerful, flexible, and customizable open-source social network software.",
    isAlive: true,
    background: false,
    icon: false,
    banner: false,
}));


route.meta.title = t('_miHubServerListPreview.title');
route.meta.description = t('_miHubServerListPreview.description');
</script>
