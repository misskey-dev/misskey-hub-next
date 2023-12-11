<template>
	<div>
		<p>
			<GNuxtLink
				v-for="head in Object.keys(devidedData)"
				:href="`#${head.toUpperCase()}`"
				class="inline-block rounded-full py-1 px-2"
			>{{ head.toUpperCase() }}</GNuxtLink>
		</p>
		<template v-for="items, head in devidedData">
			<h2 :id="head.toUpperCase()">{{ head.toUpperCase() }}</h2>
			<div :class="['grid gap-4', wide && 'lg:grid-cols-3']">
				<GNuxtLink
					class="block p-4 rounded-lg border border-slate-200 dark:border-accent-900 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:!no-underline"
					v-for="item in items"
					:key="item._path"
					:to="localePath(item._path.replace('api-docs', 'docs/for-developers/api'))"
				>
					<h3 class="font-bold font-mono !text-lg !my-0">
						{{ item.navTitle || item.title }}<ArrowRightIco class="ml-1.5" />
					</h3>
					<p class="text-sm text-slate-500 dark:text-slate-400 mt-2 !mb-0 truncate-box" v-if="!getDescription(item.title)">
						{{ getDescription(item.title) }}
					</p>
				</GNuxtLink>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import ArrowRightIco from "bi/arrow-right.svg";

const props = withDefaults(defineProps<{
    wide?: boolean;
}>(), {
    wide: false,
});

const localePath = useLocalePath();

// const { locale } = useI18n();
// 翻訳が出そろうまでの措置
const locale = ref('ja');

'ja'.slice(0, 1)

function getDescription(path: string) {
	const desc = i18n.value?.find((v) => v.title.includes(path))?.description;

	if (desc === "（説明はありません）" || !desc) {
		return null;
	}
	return desc;
}

const { data } = await useAsyncData('eps', () => queryContent().where({ _path: "--REGEX /^\\/api\\-docs\\/endpoints//", _extension: { $eq: 'json' } }).only(['_path', 'title', '_extention']).find());
const { data: i18n } = await useAsyncData('eps_i18n', () => queryContent().where({ _path: `--REGEX /^\\/${locale.value}\\/endpoints-i18n//`, _extension: { $eq: 'json' } }).only(['_path', 'title', 'description', '_extention']).find());

const devidedData = computed(() => {
	const out: Record<string, Pick<ParsedContent, string>[]> = {};
	data.value?.forEach((ep) => {
		const epHead = ep.title.slice(0, 1).toLowerCase();
		if (!out[epHead]) {
			out[epHead] = [];
		}
		out[epHead].push(ep);
	});
	return out;
});
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