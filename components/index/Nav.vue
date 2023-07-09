<template>
    <nav class="sticky top-0 z-[9900] md:relative container mx-auto max-w-screen-xl h-16 lg:h-20 grid items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-4 bg-white bg-opacity-80 lg:bg-transparent">
        <div class="">
            <GNuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80">
                <MiIcon class="h-8 w-8" />
                <div class="font-title font-bold text-lg">{{ $t('_seo.siteName') }}</div>
            </GNuxtLink>
        </div>
        <ul class="hidden lg:col-span-4 lg:space-x-8 xl:space-x-10 lg:flex justify-center">
            <li v-for="item in NavData.center">
                <GNuxtLink :to="localePath(item.to)" class="rounded-full px-4 py-1.5 hover:bg-slate-300 hover:bg-opacity-50 bg-blend-multiply">
                    <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
                    <template v-else>
                        {{ $t(item.i18n) }}
                    </template>
                </GNuxtLink>
            </li>
        </ul>
        <div>
            <ul class="hidden lg:col-span-4 lg:space-x-4 lg:flex justify-center">
                <li class="relative group">
                    <a class="text-white hover:opacity-80" href="#"><I18nIcon class="h-5 w-5" /><span class="sr-only">{{ $t('_nav.switchLang') }}</span></a>
                    <div class="absolute top-6 right-0 hidden group-hover:block z-[9955]">
                        <ul class="px-4 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-lg space-y-1">
                            <li v-for="locale in locales">
                                <GNuxtLink :to="switchLocalePath(locale.code)" class="hover:text-accent-600">
                                    {{ locale.name }}
                                </GNuxtLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="border-l"></li>
                <li v-for="item in NavData.right" class="text-white">
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
</template>

<script setup>
import MiIcon from '@/assets/svg/misskey_mi_bi.svg';
import I18nIcon from 'bi/translate.svg';
import NavData from '@/assets/data/nav';

const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
</script>
