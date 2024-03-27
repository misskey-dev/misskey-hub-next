<template>
    <div>
        <GHero>
            <template #title>{{ $t('_contact.title') }}</template>
            <template #description>
                {{ $t('_contact.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/envelope_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
                <div ref="q1El" class="bg-gray-100 p-3 lg:p-6 rounded-xl">
                    <div class="flex items-center mb-3 lg:mb-6">
                        <div class="bg-accent-600 text-white w-9 h-9 leading-9 text-center rounded-full font-bold flex-shrink-0">1</div>
                        <h2 class="font-bold text-lg lg:text-xl ml-3">{{ $t('_contact._preFill.q1.question') }}</h2>
                    </div>
                    <div class="text-lg space-y-3 ml-2.5">
                        <div v-for="option, index in q1Options" class="form-check">
                            <input class="form-check-input" type="radio" name="contactPrefillQ1" :value="option" v-model="q1" :id="`contactPrefillQ1_${index}`">
                            <label class="form-check-label cursor-pointer p-1.5" :for="`contactPrefillQ1_${index}`">
                                {{ $t(`_contact._preFill.q1.options.${option}`) }}
                            </label>
                        </div>
                    </div>
                </div>
                <div ref="q2El" v-if="q1" class="bg-gray-100 p-3 lg:p-6 rounded-xl">
                    <div class="flex items-center mb-3 lg:mb-6">
                        <div class="bg-accent-600 text-white w-9 h-9 leading-9 text-center rounded-full font-bold flex-shrink-0">2</div>
                        <h2 class="font-bold text-lg lg:text-xl ml-3">{{ $t('_contact._preFill.q2.question') }}</h2>
                    </div>
                    <div class="text-lg space-y-3 ml-2.5">
                        <div v-for="option, index in filteredQ2Options" class="form-check">
                            <input class="form-check-input" type="radio" name="contactPrefillQ2" :value="option" v-model="q2" :id="`contactPrefillQ2_${index}`">
                            <label class="form-check-label cursor-pointer p-1.5" :for="`contactPrefillQ2_${index}`">
                                {{ $t(`_contact._preFill.q2.options.${option}`) }}
                            </label>
                        </div>
                    </div>
                </div>
                <div ref="q3aEl" v-if="q1 !== 'company' && q2 && ['report', 'request'].includes(q2)" class="bg-gray-100 p-3 lg:p-6 rounded-xl">
                    <div class="flex items-center mb-3 lg:mb-6">
                        <div class="bg-accent-600 text-white w-9 h-9 leading-9 text-center rounded-full font-bold flex-shrink-0">3a</div>
                        <h2 class="font-bold text-lg lg:text-xl ml-3">{{ $t('_contact._preFill.q3a.question') }}</h2>
                    </div>
                    <div class="text-lg space-y-3 ml-2.5">
                        <div v-for="option, index in q3aOptions" class="form-check">
                            <input class="form-check-input" type="radio" name="contactPrefillQ3a" :value="option" v-model="q3a" :id="`contactPrefillQ3a_${index}`">
                            <label class="form-check-label cursor-pointer p-1.5" :for="`contactPrefillQ3a_${index}`">
                                {{ $t(`_contact._preFill.q3a.options.${option}`) }}
                            </label>
                        </div>
                    </div>
                </div>
                <div v-if="result" class="text-center">
                    <CaretDownFillIco class="block w-12 h-12 mx-auto" />
                </div>
                <div ref="resultEl" v-if="result" class="bg-gray-100 border-4 border-accent-600 p-3 lg:p-6 rounded-xl space-y-3">
                    <template v-if="result.type === 'reportToAdminFirst'">
                        <h2 class="font-bold text-lg lg:text-xl text-center">{{ $t('_contact._preFill.result.reportToAdminFirst') }}</h2>
                        <p class="text-center">{{ $t('_contact._preFill.result.thankYouForYourCooperation') }}</p>
                    </template>
                    <template v-else-if="result.type === 'github'">
                        <h2 class="font-bold text-lg lg:text-xl text-center">{{ $t('_contact._preFill.result.github') }}</h2>
                        <p class="text-center">{{ $t('_contact._preFill.result.thankYouForYourCooperation') }}</p>
                        <div class="text-center">
                            <GNuxtLink to="https://github.com/misskey-dev/misskey/issues/new/choose" target="_blank" class="btn btn-primary">
                                {{ $t('_contact._preFill.result.goToGitHub') }}<ExtIco class="ml-1" />
                            </GNuxtLink>
                        </div>
                    </template>
                    <template v-else>
                        <h2 class="font-bold text-lg lg:text-xl text-center">{{ $t('_contact._preFill.result.form') }}</h2>
                        <p class="text-center">{{ $t('_contact._preFill.result.formGoogleAccountRequired') }}</p>
                        <div class="text-center">
                            <GNuxtLink :to="result.url" target="_blank" class="btn btn-primary">
                                {{ $t('_contact._preFill.result.formLink') }}<ExtIco class="ml-1" />
                            </GNuxtLink>
                        </div>
                    </template>
                </div>
                <div v-if="q1" class="text-center">
                    <button class="hover:underline focus:underline underline-offset-4" @click="reset"><ReloadIco class="mr-1" />{{ $t('reset') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExtIco from 'bi/box-arrow-up-right.svg';
import ReloadIco from 'bi/arrow-clockwise.svg';
import CaretDownFillIco from 'bi/caret-down-fill.svg';
import { scrollIntoViewWithOffset } from '@/assets/js/scroll-to';

const { t } = useI18n();
const route = useRoute();

type Result = {
    type: 'form';
    url: string;
} | {
    type: 'github';
} | {
    type: 'reportToAdminFirst';
};

const q1Options = [
    'user',
    'company',
    'developer',
    'apDeveloper',
    'other',
] as const;

const q2Options = [
    'report',
    'request',
    'contactToMember',
    'sponsor',
    'press',
    'other',
] as const;

const q3aOptions = [
    'yes',
    'no',
    'iAmAdmin',
] as const;

const filteredQ2Options = computed(() => {
    if (q1.value === 'user') return q2Options.filter((option) => option !== 'press');
    if (q1.value === 'company') return q2Options.filter((option) => option !== 'contactToMember');
    if (q1.value === 'developer') return q2Options.filter((option) => option !== 'sponsor' && option !== 'press');
    if (q1.value === 'apDeveloper') return q2Options.filter((option) => option !== 'sponsor' && option !== 'press');
    if (q1.value === 'other') return q2Options.filter((option) => option !== 'sponsor');
    return q2Options;
});

const q1 = ref<typeof q1Options[number] | null>(null);
const q2 = ref<typeof q2Options[number] | null>(null);
const q3a = ref<typeof q3aOptions[number] | null>(null);

const q1El = ref<HTMLDivElement | null>(null);
const q2El = ref<HTMLDivElement | null>(null);
const q3aEl = ref<HTMLDivElement | null>(null);
const resultEl = ref<HTMLDivElement | null>(null);

const result = computed<Result | null>(() => {
    if (!q1.value || !q2.value) return null;

    if (q1.value !== 'company' && ['report', 'request'].includes(q2.value)) {
        if (!q3a.value) return null;
        if (q3a.value === 'yes' || q3a.value === 'iAmAdmin') return { type: 'github' };
        if (q3a.value === 'no') return { type: 'reportToAdminFirst' };
    } else {
        return { type: 'form', url: 'https://docs.google.com/forms/d/e/1FAIpQLSf9hV92NTcfzZnJg_mrB11MINpBFdTf8dzGKAmzX8dvwXwZfw/viewform' };
    }
    return null;
});

function reset() {
    q1.value = null;
    q2.value = null;
    q3a.value = null;

    nextTick(() => {
        if (q1El.value) {
            scrollIntoViewWithOffset(q1El.value);
        }
    });
}

watch([q1, q2, result], (to, from) => {

    // 親カテゴリが変化したら子はすべてリセット
    const [newQ1, newQ2, newResult] = to;
    const [oldQ1, oldQ2, oldResult] = from;
    if (newQ1 !== oldQ1) {
        q2.value = null;
        q3a.value = null;
    }
    if (newQ2 !== oldQ2) {
        q3a.value = null;
    }

    // 結果が変化したらスクロール
    nextTick(() => {
        if (newResult != null && newResult !== oldResult) {
            if (resultEl.value) {
                scrollIntoViewWithOffset(resultEl.value);
            }
        } else if (newQ2 != null && newQ2 !== oldQ2) {
            if (q3aEl.value) {
                scrollIntoViewWithOffset(q3aEl.value);
            }
        } else if (newQ1 != null && newQ1 !== oldQ1) {
            if (q2El.value) {
                scrollIntoViewWithOffset(q2El.value);
            }
        }
    });
});

route.meta.title = t('_contact.title');
route.meta.description = t('_contact.description');
</script>

<style scoped>

</style>
