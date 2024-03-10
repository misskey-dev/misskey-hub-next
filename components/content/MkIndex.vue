<template>
	<div :class="['grid grid-cols-1 md:grid-cols-2 gap-4', wide && 'lg:grid-cols-3']">
		<ContentNavigation v-slot="{ navigation }" :query="query">
			<GNuxtLink
				class="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:!no-underline"
				v-for="item in findDeepObject((navigation[0] as Record<string, any>), (v) => realBasePath.replace(/\/$/, '') === v?._path.replace(/\/$/, ''))?.children ?? []"
				:key="item._path"
				:to="item._path"
			>
				<h3 class="font-bold !text-lg !mt-0 !mb-2">
					{{ item.navTitle || item.title }}<ArrowRightIco class="ml-1.5" />
				</h3>
				<p class="text-sm text-slate-500 dark:text-slate-400 !mb-0 truncate-box">
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

const localePath = useGLocalePath();

const query = queryContent(realBasePath.value);
</script>

<style scoped>
.truncate-box {
	-webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
}
</style>