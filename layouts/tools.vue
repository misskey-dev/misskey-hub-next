<script setup lang="ts">
import 'virtual:uno.css';
import sections from '@/assets/data/toolsNav';
import { isSamePath } from 'ufo';

const emit = defineEmits([
    'toggleNav',
]);

function clickNav() {
    isAsideNavOpen.value = false;
    emit('toggleNav');
}

const isNavOpen = ref<boolean>(false);
const isAsideNavOpen = ref<boolean>(false);

const localePath = useGLocalePath();

useHead({
    htmlAttrs: {
        class: 'scroll-pt-20',
    },
});

const route = useRoute();
</script>

<template>
    <div class="bg-white dark:bg-neutral-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" :slim="true" :disable-shadow="true" :hasBorder="true" />
        <div :class="$style.slimPageRoot" class="overflow-x-hidden">
            <aside
                class="w-80 lg:w-72 fixed top-0 mt-16 h-screen flex transition-transform lg:translate-x-0"
                :class="[isAsideNavOpen ? 'translate-x-0' : '-translate-x-72']"
            >
                <nav class="border-r pr-2 py-5 flex flex-col w-72 overflow-y-scroll">
                    <NuxtLink
                        @click.native="clickNav()"
                        class="block pl-6 pr-4 py-2 rounded-r-full hover:text-accent-600 hover:bg-accent-50 dark:hover:text-accent-100 dark:hover:bg-accent-800"
                        :class="isSamePath(route.path, localePath('/tools/')) && 'bg-accent-100 text-accent-600 dark:text-accent-100 dark:bg-accent-800 font-bold'"
                        :to="localePath('/tools/')"
                    >
                        {{ $t('_tools.index') }}
                    </NuxtLink>
                    <hr class="mb-1 mt-2" />
                    <ToolsAsideNavSection :d="section" @toggleNav="clickNav()" v-for="section in sections" />
                </nav>
                <div class="lg:hidden bg-neutral-100 dark:bg-neutral-900">
                    <button @click="isAsideNavOpen = !isAsideNavOpen" class="bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-700" :class="$style.toolsMenuToggle"><span>{{ $t('_tools.menuToggle') }}</span></button>
                </div>
            </aside>
            <main class="ml-8 lg:ml-72 lg:translate-x-0 transition-transform bg-neutral-100 dark:bg-neutral-900" :class="[isAsideNavOpen ? 'translate-x-72' : 'translate-x-0']">
                <div :class="$style.slimPageRoot">
                    <slot />
                </div>
                <GFooter class="mt-12 rounded-tl-3xl lg:rounded-tl-none bg-white dark:bg-neutral-950" />
            </main>
        </div>
    </div>
</template>

<style module>
.slimPageRoot {
    min-height: calc(100vh - 4rem);
}
.toolsMenuToggle {
    @apply block mt-6 w-8 h-min py-2 rounded-r-lg;
}

.toolsMenuToggle span {
    @apply tracking-wide;
    writing-mode: vertical-rl;
}
</style>
