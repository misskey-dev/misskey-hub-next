<template>
    <div style="background: #fffc; backdrop-filter: blur(12px); height: 65px;"
			class="root"
        :class="[
            'top-0 z-[9900] w-full transition',
            fixed ? 'fixed' : 'sticky',,
        ]">
        <nav class="container mx-auto max-w-screen-xl grid items-center grid-cols-2 lg:grid-cols-6 h-full transition-[height]">
            <div class="">
                <GNuxtLink :to="localePath('/')" class="flex items-center space-x-2 hover:opacity-80">
                    <MiIcon class="h-8 w-8" />
                    <div class="font-title font-bold text-lg">{{ $t('_seo.siteName') }}</div>
                </GNuxtLink>
            </div>
            <ul
                class="fixed z-[9902] top-16 right-0 text-right p-4 w-[80vw] sm:w-[50vw] bg-neutral-100/90 dark:bg-neutral-950/90 space-y-2 transition-[transform,border-radius,box-shadow] lg:transition-none lg:translate-x-0 lg:backdrop-blur-none lg:w-auto lg:rounded-none lg:shadow-none lg:space-y-0 lg:p-0 lg:relative lg:top-0 lg:right-auto lg:bg-transparent dark:lg:bg-transparent lg:col-span-4 lg:space-x-8 xl:space-x-10 lg:flex lg:justify-center"
                :class="[(scrollPos <= -40) ? 'rounded-bl-lg' : 'rounded-l-lg', navOpen ? 'translate-x-0 shadow-lg' : 'translate-x-full']"
            >
                <li v-for="item in NavData.center">
                    <GNuxtLink :to="localePath(item.to)" @click.native="navOpen = !navOpen" :class="['block rounded-full px-4 py-2 lg:px-4 lg:py-1.5 hover:bg-neutral-300 dark:hover:bg-neutral-800', { 'bg-neutral-300 dark:bg-neutral-800 font-bold': currentPath.includes(item.to) }]">
                        <component v-if="'icon' in item" :is="item.icon" class="h-5 w-5" />
                        <template v-else>
                            {{ $t(item.i18n) }}
                        </template>
                    </GNuxtLink>
                </li>
                <li class="lg:hidden px-4 py-2 flex space-x-4">
                    <button 
                        class="hover:opacity-80 disabled:opacity-70 relative before:absolute before:-z-10 before:-top-2 before:-left-2 before:w-9 before:h-9 before:rounded-full hover:before:bg-neutral-300 dark:hover:before:bg-neutral-600 h-5 w-5"
                        @click="rotateColorMode()"
                        :disabled="colorMode.forced"
                        aria-label="Change Color Mode"
                    >
                        <ClientOnly>
                            <SunIcon class="h-5 w-5" v-if="colorMode.preference === 'light' || (colorMode.forced && colorMode.value === 'light')" />
                            <MoonIcon class="h-5 w-5" v-else-if="colorMode.preference === 'dark' || (colorMode.forced && colorMode.value === 'dark')" />
                            <DisplayIcon class="h-5 w-5" v-else />
                        </ClientOnly>
                    </button>
                    <div class="input-group">
                        <span class="input-group-text !rounded-l-full"><I18nIcon class="h-5 w-5" /><span class="sr-only">{{ $t('_nav.switchLang') }}</span></span>
                        <select class="form-select !rounded-r-full" v-model="spLocaleOption" @change="changeLocale()">
                            <option v-for="locale in localesConst" :value="locale.code">{{ locale.name }}</option>
                        </select>
                    </div>
                </li>
            </ul>
            <div class="text-right">
                <button class="p-1 lg:hidden" @click="navOpen = !navOpen">
                    <XIcon v-if="navOpen" class="h-5 w-5" />
                    <MenuIcon v-else class="h-5 w-5" />
                </button>
                <ul class="hidden lg:col-span-4 lg:space-x-4 lg:flex justify-center">
                    <li>
                        <button 
                            :class="['hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed', { 'text-white 3xl:text-neutral-800 3xl:dark:text-neutral-200': (landing && scrollPos >= -40) }]"
                            @click="rotateColorMode()"
                            :disabled="colorMode.forced"
                            aria-label="Change Color Mode"
                        >
                            <ClientOnly>
                                <SunIcon class="h-5 w-5" v-if="colorMode.preference === 'light' || (colorMode.forced && colorMode.value === 'light')" />
                                <MoonIcon class="h-5 w-5" v-else-if="colorMode.preference === 'dark' || (colorMode.forced && colorMode.value === 'dark')" />
                                <DisplayIcon class="h-5 w-5" v-else />
                            </ClientOnly>
                        </button>
                    </li>
                    <li class="relative group">
                        <button class="hover:opacity-80"><I18nIcon :class="['h-5 w-5', { 'text-white 3xl:text-neutral-800 3xl:dark:text-neutral-200': (landing && scrollPos >= -40) }]" /><span class="sr-only">{{ $t('_nav.switchLang') }}</span></button>
                        <div class="absolute top-6 right-0 hidden group-hover:block group-focus-within:block z-[9955]">
                            <ul class="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg shadow-lg space-y-1">
                                <li v-for="locale in localesConst">
                                    <GNuxtLink :to="switchLocalePath(locale.code)" :lang="locale.code" :class="['block _i18n whitespace-nowrap hover:text-accent-600 py-0.5', {'text-accent-600 font-bold': currentLocale === locale.code}]">
                                        <span v-if="currentLocale === locale.code"><DotIcon class="stroke-[3] stroke-current" /></span>{{ locale.name }}
                                    </GNuxtLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="border-l"></li>
                    <li v-for="item in NavData.right" :class="['transition-colors', { 'text-white 3xl:text-neutral-800 3xl:dark:text-neutral-200': (landing && scrollPos >= -40) }]">
                        <GNuxtLink :to="item.to" class="hover:opacity-80">
                            <component v-if="'icon' in item" :is="item.icon" class="h-5 w-5" />
                            <template v-else>
                                {{ $t(item.i18n) }}
                            </template>
                        </GNuxtLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import MiIcon from '@/assets/svg/misskey_mi_bi.svg';
import I18nIcon from 'bi/translate.svg';
import SunIcon from 'bi/sun.svg';
import MoonIcon from 'bi/moon-stars.svg';
import DisplayIcon from 'bi/display.svg';
import MenuIcon from 'bi/list.svg';
import XIcon from 'bi/x.svg';
import DotIcon from 'bi/dot.svg';

import { sanitizeInternalPath } from '@/assets/js/misc';
import { withTrailingSlash, cleanDoubleSlashes } from 'ufo';

import NavData from '@/assets/data/nav';
import { localesConst } from '@/assets/data/locales';
import type { LocaleCodes } from '@/assets/data/locales';

const props = withDefaults(defineProps<{
    disableShadow?: boolean;
    slim?: boolean;
    hasBorder?: boolean;
    landing?: boolean;
    fixed?: boolean;
}>(), {
    disableShadow: false,
    slim: false,
    hasBorder: false,
    landing: false,
    fixed: false,
});

const navOpen = ref(false);

const { locale: currentLocale } = useI18n();
const route = useRoute();
const { push } = useRouter();
const currentPath = ref(route.path);

watch(() => route.path,(to) => {
    currentPath.value = to;
}, {
    immediate: true,
});

const switchLocalePath = useGSwitchLocalePath();
const localePath = useGLocalePath();
const spLocaleOption = ref(currentLocale.value as LocaleCodes);
function changeLocale() {
    const path = switchLocalePath(spLocaleOption.value);
    push(withTrailingSlash(cleanDoubleSlashes(sanitizeInternalPath(path)), true));
}

const colorMode = useColorMode();
function rotateColorMode() {
    const values = ['system', 'light', 'dark'];
    const index = values.indexOf(colorMode.preference);
    const next = (index + 1) % values.length;

    colorMode.preference = values[next];
}

const scrollPos = useState<number>('miHub_global_scrollPos');
</script>

<style scoped>
.root {
	mask-image: linear-gradient(#000, #000), url("/header-mask-r.svg");
  mask-repeat: no-repeat;
  mask-position: center center, calc(50dvw + 300px) -5px;
  mask-size: 100% 100%, 1000px 100px;
	mask-composite: exclude;
}
</style>
