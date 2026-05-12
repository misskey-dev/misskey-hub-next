<template>
    <div class='container mx-auto max-w-screen-xl px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_shareLinkGenerator.title') }}
        </h1>
        <Tip>
            <I18nT scope="global" keypath="_shareLinkGenerator.documentationIs" tag="span">
                <template #here>
                    <GNuxtLink
                        :to="localePath('/docs/for-users/features/share-form/#hub-share-disclaimer')"
                        class="text-blue-600 hover:underline underline-offset-4"
                    >{{ $t('_shareLinkGenerator.here') }}</GNuxtLink>
                </template>
            </I18nT>
        </Tip>
        <div class='rounded-lg grid md:grid-cols-2 gap-8'>
            <div class="space-y-4">
                <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-neutral-950">
                    <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b">
                        {{ $t('_shareLinkGenerator.body') }}
                    </header>
                    <div>
                        <div class="flex">
                            <label for="shareLinkGeneratorBody">{{ $t('_shareLinkGenerator.body') }}</label>
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
                            id="shareLinkGeneratorBody"
                            v-model="mfmText"
                        ></textarea>
                        <div class="form-text">{{ $t('_shareLinkGenerator.bodyWarning') }}</div>
                    </div>
                    <div>
                        <label for="shareLinkGeneratorUrl">{{ $t('_shareLinkGenerator.url') }}</label>
                        <input class="form-control" id="shareLinkGeneratorUrl" v-model="mfmUrl" />
                        <div class="form-text">{{ $t('_shareLinkGenerator.urlCaption') }}</div>
                    </div>
                    <div>
                        {{ $t('_mfmPlayground.preview') }}
                        <div :class="$style.mfmRoot" class="mb-2 bg-white dark:bg-[#212529] border-neutral-200 dark:border-neutral-600">
                            <MkMfm :text="mfmPreviewString" />
                        </div>
                        <div class="form-text">{{ $t('_mfmPlayground.disclaimer') }}</div>
                    </div>
                </div>
                <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-neutral-950">
                    <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b">
                        {{ $t('_shareLinkGenerator.settings') }}
                    </header>
                    <div>
                        <label for="shareLinkGeneratorManualInstance">{{ $t('_shareLinkGenerator.manualInstance') }}</label>
                        <input class="form-control" id="shareLinkGeneratorManualInstance" v-model="manualInstance" />
                        <div class="form-text">{{ $t('_shareLinkGenerator.manualInstanceDescription') }}</div>
                    </div>
                    <div>
                        <label for="shareLinkGeneratorVisibility">{{ $t('_shareLinkGenerator.visibility') }}</label>
                        <select class="form-select" id="shareLinkGeneratorVisibility" v-model="visibility">
                            <option v-for="visibility in noteVisibilities" :key="visibility" :value="visibility">{{ $t(`_noteVisibility.${visibility}`) }}</option>
                        </select>
                    </div>
                    <div v-if="visibility === 'specified'">
                        <label for="shareLinkGeneratorRecipents">{{ $t('_shareLinkGenerator.recipents') }}</label>
                        <textarea
                            class="form-control"
                            id="shareLinkGeneratorRecipents"
                            placeholder="@someone@misskey.example.com"
                            v-model="recipents"
                            :rows="(recipents || '').split('\n').length >= 5 ? (recipents || '').split('\n').length + 2 : 7"
                        ></textarea>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="localOnly" id="shareLinkGeneratorLocalOnly">
                        <label class="form-check-label" for="shareLinkGeneratorLocalOnly">
                            {{ $t('_noteVisibility.localOnly') }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-neutral-950">
                    <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b">
                        {{ $t('_shareLinkGenerator.resultLink') }}
                    </header>
                    <div v-if="(mfmText?.length ?? 0) === 0" class="p-8 text-center font-bold text-lg">
                        {{ $t('_shareLinkGenerator.typeSomethingToGetLink') }}
                    </div>
                    <template v-else>
                        <div class="input-group">
                            <input readonly class="form-control" :value="generatedUrl" />
                            <GBsCopyButton :text="generatedUrl" />
                        </div>
                        <div class="form-text">
                            <GNuxtLink :to="generatedUrl" target="_blank" class="hover:underline underline-offset-1">{{ $t('_shareLinkGenerator.testLink') }}<ExtIco class="ml-1" /></GNuxtLink>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { noteVisibilities } from 'misskey-js';
import { joinURL, withQuery } from 'ufo';
import ExtIco from 'bi/box-arrow-up-right.svg';
import type { entities as MisskeyEntities } from 'misskey-js';
import type { QueryObject } from 'ufo';

definePageMeta({
    layout: 'tools',
});

const mfmText = ref<string>('');
const mfmUrl = ref<string>('');
const visibility = ref<MisskeyEntities.Note['visibility']>('public');
const localOnly = ref<boolean>(false);
const recipents = ref<string>('');
const manualInstance = ref<string>('');
const runtimeConfig = useRuntimeConfig();

const mfmPreviewString = computed(() => {
    if (mfmText.value != '') {
        if (mfmUrl.value != '') {
            return mfmText.value + '\n' + mfmUrl.value;
        } else {
            return mfmText.value;
        }
    } else if (mfmUrl.value != '') {
        return mfmUrl.value;
    } else {
        return '';
    }
})

const generatedUrl = computed(() => {
    const query: QueryObject = {
        text: mfmText.value,
        url: mfmUrl.value ? mfmUrl.value : undefined,
        visibility: visibility.value,
        localOnly: localOnly.value ? '1' : '0',
        visibleAccts: (visibility.value === 'specified') ? recipents.value.split('\n').join(',') : undefined,
        manualInstance: manualInstance.value ? manualInstance.value : undefined,
    };

    const baseUrl = runtimeConfig.public.baseUrl;
    return withQuery(joinURL(baseUrl, '/share/'), query);
});

const generatedHtml = computed(() => '');

const { t, locale } = useI18n();
const localePath = useGLocalePath();
const route = useRoute();

route.meta.title = (locale.value === 'ja' ? '【公式】' : '') + t('_shareLinkGenerator.title');
route.meta.description = t('_shareLinkGenerator.description');
</script>

<style module>
.mfmRoot {
    @apply rounded-lg p-4 border break-words overflow-hidden;
    font-family: Hiragino Maru Gothic Pro,BIZ UDGothic,Roboto,HelveticaNeue,Arial,sans-serif;
    line-height: 1.35;
}

.shareLink {

}

.shareLinkIcon {

}
</style>
