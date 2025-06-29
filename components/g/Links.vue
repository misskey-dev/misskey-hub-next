<template>
	<div :class="['grid grid-cols-1 md:grid-cols-2 gap-4', wide && 'lg:grid-cols-3']">
	    <GNuxtLink
	    	class="block p-4 rounded-lg border transition-colors hover:!no-underline"
			:class="gray ? 'hover:bg-white dark:hover:bg-neutral-950 border-neutral-300 dark:border-accent-800' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-700'"
	    	v-for="item in items"
	    	:key="item.to"
	    	:to="item.to"
            :target="isLocalPath(item.to) ? undefined : '_blank'"
	    >
	    	<h3 class="font-bold !text-lg !mt-0 !mb-2">
	    		{{ item.title }}<ArrowRightIco v-if="isLocalPath(item.to)" class="ml-1.5" /><ArrowUpRightIco v-else class="ml-1.5" />
	    	</h3>
	    	<p class="text-sm text-neutral-500 dark:text-neutral-400 !mb-0 line-clamp-2">
	    		{{ item.description ?? "" }}
	    	</p>
	    </GNuxtLink>
	</div>
</template>

<script setup lang="ts">
import ArrowRightIco from 'bi/arrow-right.svg';
import ArrowUpRightIco from 'bi/arrow-up-right.svg';
import { isLocalPath } from 'assets/js/misc';

withDefaults(defineProps<{
    items: {
        to: string;
        title: string;
        description?: string;
    }[];
    basePath?: string;
	wide?: boolean;
	gray?: boolean;
}>(), {
	wide: false,
	gray: false,
});

</script>
