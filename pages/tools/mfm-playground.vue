<template>
    <div class='container mx-auto max-w-(--breakpoint-xl) px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t(`_mfmPlayground.title`) }}
        </h1>
        <div class='rounded-lg grid md:grid-cols-2 gap-4'>
            <div>
                {{ $t('_mfmPlayground.preview') }}
                <div :class="$style.mfmRoot" class="mb-2 bg-white dark:bg-[#212529] border-gray-200 dark:border-gray-600">
                    <MkMfm :text="mfmText ?? ''" :baseHost="mfmHost" />
                </div>
                <div class="text-xs text-gray-500">{{ $t('_mfmPlayground.disclaimer') }}</div>
            </div>
            <div class="space-y-4">
                <div>
                    <div class="flex">
                        <label for="mfmPlaygroundMFM">{{ $t('_mfmPlayground.mfm') }}</label>
                        <div
                            class="ml-auto"
                            :class="[(mfmText?.length ?? 0) >= 5000 && 'font-bold text-red-600']"
                        >
                            {{ $t('_mfmPlayground.character', [ (mfmText?.length ?? 0) ]) }}
                        </div>
                    </div>
                    <textarea
                        :rows="(mfmText || '').split('\n').length >= 8 ? (mfmText || '').split('\n').length + 5 : 10"
                        class="form-control"
                        id="mfmPlaygroundMFM"
                        v-model="mfmText"
                    ></textarea>
                </div>
                <div>
                    <label for="mfmPlaygroundDomain">{{ $t('_mfmPlayground.domain') }}</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="mfmPlaygroundDomain" v-model="mfmHost" />
                        <GNuxtLink :to="shareURL" target="_blank" class="btn btn-primary">{{ $t('_mfmPlayground.noteIt') }}<SendIco class="ml-1" /></GNuxtLink>
                    </div>
                </div>
                <div>
                    <div class="flex">
                        <div class="w-1/2 pr-2 col-form-label">
                            {{ $t('_mfmPlayground.clearEmojiCacheDescription') }}
                        </div>
                        <div class="w-1/2">
                            <button @click="clearEmojiCache()" class="btn w-full btn-outline-primary">{{ $t('_mfmPlayground.clearEmojiCache') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import SendIco from 'bi/send-fill.svg';
import { parseURL, withQuery } from 'ufo';

definePageMeta({
    layout: 'tools',
});

const mfmText = ref<string>();
const mfmHost = ref<string>('misskey.io');
const shareURL = computed(() => {
    const domain = 'https://' + (parseURL(mfmHost.value).host ?? mfmHost.value) + '/share';
    return withQuery(domain, { text: mfmText.value });
})

function clearEmojiCache() {
    if (import.meta.client) {
        localStorage.clear();
        location.reload();
    }
}

const { t } = useI18n();
const route = useRoute();

route.meta.title = t('_mfmPlayground.title');
route.meta.description = t('_mfmPlayground.description');
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