<template>
	<div :class="['grid gap-4', wide && 'lg:grid-cols-3']">
		<GNuxtLink
			class="block p-4 rounded-lg border border-slate-200 dark:border-accent-900 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:!no-underline"
			v-for="item in data"
			:key="item._path"
			:to="localePath(item._path.replace('api-docs', 'docs/for-developers/api'))"
		>
			<h3 class="font-bold font-mono !text-lg !my-0">
				{{ item.navTitle || item.title }}<ArrowRightIco class="ml-1.5" />
			</h3>
			<p class="text-sm text-slate-500 dark:text-slate-400 mt-2 !mb-0 truncate-box" v-if="!$t(`_api._endpoints.${item.title}.post.description`).includes('Untranslated')">
				{{ $t(`_api._endpoints.${item.title}.post.description`) }}
			</p>
		</GNuxtLink>
	</div>
</template>

<script setup lang="ts">
import ArrowRightIco from "bi/arrow-right.svg";
import type { NavItem as ContentNavItem } from '@nuxt/content/dist/runtime/types';

const props = withDefaults(defineProps<{
    wide?: boolean;
}>(), {
    wide: false,
});

const localePath = useLocalePath();

const { data } = await useAsyncData('eps', () => queryContent().where({ _path: "--REGEX /^\\/api\\-docs\\/endpoints//", _extension: { $eq: 'json' } }).only(['_path', 'title', '_extention']).find());
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