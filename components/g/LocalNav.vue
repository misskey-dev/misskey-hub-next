<template>
    <ul class="flex flex-wrap p-4" :class="$style.localNavRoot">
        <li v-for="item in items">
            <button v-if="item.anchor" class="hover:text-neutral-950 focus:text-neutral-950 dark:hover:text-neutral-200 dark:focus:text-neutral-200 " @click="scrollTo(item.anchor)">
                {{ item.name }}
                <ArrowIco class="ml-2 stroke-1 stroke-current" />
            </button>
        </li>
    </ul>
</template>
<script setup lang="ts">
import ArrowIco from 'bi/arrow-down.svg';
import { scrollTo } from '@/assets/js/scroll-to';

interface LocalNavItem {
    name: string;
    to?: string;
    anchor?: string;
}

const props = defineProps<{
    items: LocalNavItem[]
}>();

</script>
<style module>
.localNavRoot li a,
.localNavRoot li button {
    @apply font-bold tracking-wide relative px-2 py-4 text-neutral-400 transition-colors;
}
.localNavRoot li:not(:last-child) {
    @apply mr-4;
}

@media (max-width: 768px) {
    .localNavRoot li:not(:last-child) {
        @apply mr-0;
    }
    .localNavRoot li a,
    .localNavRoot li button {
        @apply w-full text-sm text-end
    }
    .localNavRoot li {
        width: calc((100% - 24px) / 2);
    }
    .localNavRoot li:nth-child(2n) {
        margin-left: 24px;
    }
}
</style>
