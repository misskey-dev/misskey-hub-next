<template>
    <div :class="['sticky top-0 z-[9900] transition', { 'backdrop-blur-lg shadow bg-opacity-75': (!disableShadow && scrollPos <= -40), 'bg-white dark:bg-gray-950': (disableShadow || scrollPos <= -40)}, (slim ? 'h-16 border-b border-slate-300' : 'h-16 lg:h-20')]">
        <nav :class="['container mx-auto max-w-screen-xl grid items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-4 h-full transition-[height]']">
            <div class="">
                <GNuxtLink :to="localePath('/')" class="flex items-center space-x-2 hover:opacity-80">
                    <MiIcon class="h-8 w-8" />
                    <div class="font-title font-bold text-lg">{{ $t('_seo.siteName') }}</div>
                </GNuxtLink>
            </div>
            <ul class="hidden lg:col-span-4 lg:space-x-8 xl:space-x-10 lg:flex justify-center">
                <li v-for="item in NavData.center">
                    <GNuxtLink :to="localePath(item.to)" :class="['rounded-full px-4 py-1.5 hover:bg-slate-300 dark:hover:bg-slate-800 hover:bg-opacity-50 bg-blend-multiply', { 'bg-slate-200 dark:bg-slate-800 font-bold': currentPath.includes(item.to) }]">
                        <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
                        <template v-else>
                            {{ $t(item.i18n) }}
                        </template>
                    </GNuxtLink>
                </li>
            </ul>
            <div>
                <ul class="hidden lg:col-span-4 lg:space-x-4 lg:flex justify-center">
                    <li>
                        <button :class="['hover:opacity-80 transition-colors', { 'text-white': (landing && scrollPos >= -40) }]" @click="rotateColorMode()" aria-label="Change Color Mode">
                            <ClientOnly>
                                <SunIcon class="h-5 w-5" v-if="colorMode.preference === 'light'" />
                                <MoonIcon class="h-5 w-5" v-else-if="colorMode.preference === 'dark'" />
                                <DisplayIcon class="h-5 w-5" v-else />
                            </ClientOnly>
                        </button>
                    </li>
                    <li class="relative group">
                        <a class="hover:opacity-80" href="#"><I18nIcon :class="['h-5 w-5 transition-colors', { 'text-white': (landing && scrollPos >= -40) }]" /><span class="sr-only">{{ $t('_nav.switchLang') }}</span></a>
                        <div class="absolute top-6 right-0 hidden group-hover:block z-[9955]">
                            <ul class="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg space-y-1">
                                <li v-for="locale in locales">
                                    <GNuxtLink :to="switchLocalePath(locale.code)" :class="['hover:text-accent-600 py-1', {'text-accent-600 font-bold': currentLocale === locale.code}]">
                                        {{ locale.name }}
                                    </GNuxtLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="border-l"></li>
                    <li v-for="item in NavData.right" :class="['transition-colors', { 'text-white': (landing && scrollPos >= -40) }]">
                        <GNuxtLink :to="item.to" class="hover:opacity-80">
                            <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
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
import NavData from '@/assets/data/nav';

const props = withDefaults(defineProps<{
    disableShadow?: boolean;
    slim?: boolean;
    landing?: boolean;
}>(), {
    disableShadow: false,
    slim: false,
    landing: false,
});

const { locales, locale: currentLocale } = useI18n();
const { path } = useRoute();
const { afterEach } = useRouter();
const currentPath = ref(path);

afterEach((to) => {
    currentPath.value = to.path;
});

onMounted(() => {
    const _route = useRoute();
    currentPath.value = _route.path;
});

const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const colorMode = useColorMode();
function rotateColorMode() {
    const values = ['system', 'light', 'dark'];
    const index = values.indexOf(colorMode.preference);
    const next = (index + 1) % values.length;

    colorMode.preference = values[next];
}

const scrollPos = ref(0);

async function updatePos() {
    scrollPos.value = document.body.getBoundingClientRect().y;
}

if (process.client && !props.disableShadow) {
    window.addEventListener('scroll', updatePos);
    window.addEventListener('resize', updatePos);
}

onUnmounted(() => {
    if (process.client && !props.disableShadow) {
        window.removeEventListener('scroll', updatePos);
        window.removeEventListener('resize', updatePos);
    }
});
</script>
