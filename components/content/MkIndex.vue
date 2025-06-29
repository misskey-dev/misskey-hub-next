<template>
	<div :class="['grid grid-cols-1 md:grid-cols-2 gap-4', wide && 'lg:grid-cols-3']">
		<ContentNavigation v-slot="{ navigation }" :query="query">
			<GNuxtLink
				class="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:!no-underline"
				v-for="item in findDeepObject(navigation[0], (v) => realBasePath.replace(/\/$/, '') === v?._path.replace(/\/$/, ''))?.children ?? []"
				:key="item._path"
				:to="item._path"
			>
				<h3 class="font-bold !text-lg !mt-0 !mb-2">
					{{ item.navTitle ?? item.title }}<ArrowRightIco class="ml-1.5" />
				</h3>
				<p class="text-sm text-neutral-500 dark:text-neutral-400 !mb-0 line-clamp-2">
					{{ item.description ?? "" }}
				</p>
			</GNuxtLink>
		</ContentNavigation>
	</div>
</template>

<script setup lang="ts">
import ArrowRightIco from "bi/arrow-right.svg";
import { findDeepObject } from "assets/js/misc";

const route = useRoute();
const { locale } = useI18n();

const props = withDefaults(defineProps<{
    basePath?: string;
    wide?: boolean;
}>(), {
    wide: false,
});

const realBasePath = computed<string>(() => {
    if (props.basePath) {
        return props.basePath;
    }
    return route.path.replace(/^.*\/docs/, `/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs`);
});

const query = queryContent(realBasePath.value);
</script>
