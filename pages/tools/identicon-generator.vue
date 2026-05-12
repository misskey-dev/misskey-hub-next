<template>
    <div class='container mx-auto max-w-screen-xl px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_identiconGenerator.title') }}
        </h1>
        <div class="mx-auto max-w-lg">
            <label class="mb-1" for="acct">{{ $t('_identiconGenerator.userName') }}</label>
            <input class="form-control" id="acct" v-model="acct" placeholder="@ai@misskey.example.com" />
            <div class="form-text">{{ $t('_identiconGenerator.includeDomain') }}</div>
            <div class="mt-2 mb-4 text-center">
                <button class="btn btn-primary" @click="genIdenticon()">{{ $t('generate') }}</button>
            </div>
            <div class="text-center">
                <CaretDownFillIco class="w-12 h-12 mx-auto" />
            </div>
            <div class="mb-2 p-4 rounded-lg border bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-800">
                <canvas ref="canvas" width="128" height="128" class="w-full max-w-40 h-auto mx-auto mb-4 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                <div class="text-center">
                    <button class="btn btn-primary" @click="download()" :disabled="!onceGenerated">{{ $t('download') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { genIdenticon as _genIdenticon } from '@/assets/js/mi/gen-identicon';
import CaretDownFillIco from 'bi/caret-down-fill.svg';

definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const route = useRoute();

const onceGenerated = ref(false);
const acct = ref('@ai@misskey.example.com');
const normalizedAcct = computed(() => {
    const normalized = acct.value.replace(/^@/, '').toLowerCase();
    if (normalized.includes('@')) {
        return normalized;
    } else {
        return null;
    }
});
const canvas = ref<HTMLCanvasElement | null>(null);

function genIdenticon() {
    if (!import.meta.client || !canvas.value) return;
    if (!normalizedAcct.value) {
        onceGenerated.value = false;
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        }
        return;
    }
    _genIdenticon(normalizedAcct.value, canvas.value);
    onceGenerated.value = true;
}

function download() {
    if (!import.meta.client || !normalizedAcct.value || !canvas.value) return;
    const url = canvas.value.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'identicon.png';
    a.click();
    a.remove();
}

route.meta.title = t('_identiconGenerator.title');
route.meta.description = t('_identiconGenerator.description');
</script>

<style module>
.mfmRoot {
    @apply rounded-lg p-6 border break-words overflow-hidden;
    font-family: Hiragino Maru Gothic Pro,BIZ UDGothic,Roboto,HelveticaNeue,Arial,sans-serif;
    line-height: 1.35;
}

.mfmRoot img {
    display: inline;
}
</style>
