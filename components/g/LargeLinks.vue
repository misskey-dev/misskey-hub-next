<template>
    <div class="space-y-6">
        <GNuxtLink v-for="item in items" :to="item.to" :target="isLocalPath(item.to) ? undefined : '_blank'" class="rounded-xl border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 p-4 sm:pt-0 sm:pb-0 sm:pl-6 sm:pr-0 overflow-hidden flex">
            <div class="flex flex-col justify-center">
                <h2 class="text-xl sm:text-2xl font-bold mb-2">{{ item.title }}<ArrowRightIco v-if="isLocalPath(item.to)" class="ml-2" /><ArrowUpRightIco v-else class="ml-2" /></h2>
                <p class="text-neutral-500 dark:text-neutral-300">{{ item.description }}</p>
            </div>
            <div :class="['hidden sm:block ml-auto flex-shrink-0 relative h-40 w-auto', (item.cutBottom ? 'pt-4' : 'py-4'), (!item.cutLeft && 'pr-4')]">
                <GDots class="absolute top-0 right-0 h-16 w-16 text-accent-600" />
                <GDots class="absolute bottom-0 -left-2 h-12 w-16 text-accent-600" />
                <img class="relative h-full rounded-lg" :src="item.img" />
            </div>
        </GNuxtLink>
    </div>
</template>

<script setup lang="ts">
import ArrowRightIco from 'bi/arrow-right.svg';
import ArrowUpRightIco from 'bi/arrow-up-right.svg';
import { isLocalPath } from 'assets/js/misc';

defineProps<{
    items: {
        to: string;
        title: string;
        description?: string;
        img: string;
        cutBottom?: boolean;
        cutLeft?: boolean;
    }[];
}>();
</script>

<style scoped>

</style>
