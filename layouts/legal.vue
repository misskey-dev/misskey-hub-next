<template>
    <div>
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" />
        <div class="main-content">
            <GHero>
                <template #title>{{ $route.meta.title }}</template>
                <template #description>
                    {{ $route.meta.description }}
                </template>
                <template #icon>
                    <div class="hidden lg:block relative px-6 py-8">
                        <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                        <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                        <div class="relative lg:w-64 h-64 flex items-center">
                            <img class="drop-shadow-xl rounded-xl" src="/img/emojis/balance_scale_3d.png" />
                        </div>
                    </div>
                </template>
            </GHero>
            <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
                <div class="container mx-auto max-w-screen-xl px-6" :class="$style.legalRoot">
                    <aside class="hidden lg:block">
                        <nav class="lg:sticky lg:top-24 lg:overflow-y-auto lg:max-h-[calc(100vh-6rem)] p-6 lg:px-0 lg:py-2 space-y-2">
                            <GNuxtLink
                                :to="localePath('/legal/')"
                                class="block px-4 py-2 rounded-xl"
                                :class="isSamePath(path, localePath('/legal/')) ? 'bg-accent-500/20 text-accent-600 font-bold' : 'hover:bg-accent-500/20 hover:text-accent-600'"
                            >{{ $t('index') }}</GNuxtLink>
                            <div class="py-1">
                                <div class="w-full h-px bg-slate-300 dark:bg-slate-700"></div>
                            </div>
                            <GNuxtLink
                                v-for="link in navigation"
                                :key="link._path"
                                :to="link._path"
                                class="block px-4 py-2 rounded-xl text-wrap break-keep"
                                :class="isSamePath(path, link._path) ? 'bg-accent-500/20 text-accent-600 font-bold' : 'hover:bg-accent-500/20 hover:text-accent-600'"
                            >{{ link.title }}</GNuxtLink>
                        </nav>
                    </aside>
                    <div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
        <GFooter class="bg-white dark:bg-slate-950" />
    </div>
</template>

<script setup lang="ts">
import { isSamePath } from 'ufo';

const isNavOpen = ref<boolean>(false);

const route = useRoute();

const { locale } = useI18n();
const localePath = useGLocalePath();
const navigation = ref();

const { data } = await useGAsyncData(`legalLinksNav_${locale.value}`, () => queryContent(`/${locale.value}/legal/`).only(['title', '_path']).find());
navigation.value = data.value;

const path = ref(route.path);

watch(() => route.path, (to) => {
    path.value = to;
}, {
    immediate: true,
});

watch(locale, async (to) => {
    console.log('locale changed');
    const { data } = await useGAsyncData(`legalLinksNav_${to}`, () => queryContent(`/${to}/legal/`).only(['title', '_path']).find());
    navigation.value = data.value;
});

useHead({
    htmlAttrs: {
        class: 'scroll-pt-20 lg:scroll-pt-24',
    },
});
</script>

<style module>
.legalRoot {
    @apply grid gap-8;
}

@screen lg {
    .legalRoot {
        grid-template-columns: 18rem 1fr;
    }
}
</style>