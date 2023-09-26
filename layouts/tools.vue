<script setup lang="ts">
import sections from '@/assets/data/toolsNav';

const emit = defineEmits([
    'toggleNav',
]);

const isNavOpen = ref<boolean>(false);
const isAsideNavOpen = ref<boolean>(false);

const localePath = useLocalePath();

useHead({
    htmlAttrs: {
        class: 'scroll-pt-20',
    },
});

</script>

<template>
    <div class="bg-white dark:bg-slate-950">
        <GNav @toggleNav="isNavOpen = !isNavOpen" :is-open="isNavOpen" :slim="true" :disable-shadow="true" />
        <div :class="$style.slimPageRoot" class="overflow-x-hidden">
            <aside
                class="w-80 lg:w-72 fixed top-0 mt-16 h-screen flex transition-transform lg:translate-x-0"
                :class="[isAsideNavOpen ? 'translate-x-0' : '-translate-x-72']"
            >
                <nav class="border-r pr-2 py-5 flex flex-col w-72 overflow-y-scroll">
                    <NuxtLink @click.native="emit('toggleNav')" class="block pl-6 pr-4 py-2 rounded-r-full hover:text-accent-600 hover:bg-accent-50 dark:hover:text-accent-100 dark:hover:bg-accent-800" :to="localePath('/tools/')">
                        {{ $t('_tools.index') }}
                    </NuxtLink>
                    <hr class="mb-1 mt-2" />
                    <ToolsAsideNavSection :d="section" @toggleNav="emit('toggleNav')" v-for="section in sections" />
                </nav>
                <div class="lg:hidden">
                    <button @click="isAsideNavOpen = !isAsideNavOpen" class="bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700" :class="$style.toolsMenuToggle"><span>{{ $t('_tools.menuToggle') }}</span></button>
                </div>
            </aside>
            <main class="ml-8 lg:ml-72 lg:translate-x-0 transition-transform bg-slate-100 dark:bg-slate-900" :class="[isAsideNavOpen ? 'translate-x-72' : 'translate-x-0']">
                <div :class="$style.slimPageRoot">
                    <slot />
                </div>
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
