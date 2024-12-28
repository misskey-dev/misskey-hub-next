<template>
	<div class="flex flex-col lg:flex-row justify-between items-center">
		<div class="order-2 mt-4 lg:mt-0 lg:order-1 w-full lg:w-2/5">
			<GNuxtLink v-if="prev && prev._path != null && prev._path.includes(currentDirectory)" :to="prev._path" class="rounded-lg transition-colors p-4 border dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-start flex justify-start items-center">
				<div class="mr-3"><LeftIco /></div>
				<div>
					<div class="mb-1 text-sm">{{ $t('_docs._prevNext.prev') }}</div>
					<div class="font-bold text-lg">{{ prev.title }}</div>
				</div>
			</GNuxtLink>
		</div>
		<div class="order-1 lg:order-2 w-full lg:w-2/5">
			<GNuxtLink v-if="next && next._path != null && next._path.includes(currentDirectory)" :to="next._path" class="rounded-lg transition-colors p-4 border dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-end flex justify-end items-center">
				<div>
					<div class="mb-1 text-sm">{{ $t('_docs._prevNext.next') }}</div>
					<div class="font-bold text-lg">{{ next.title }}</div>
				</div>
				<div class="ml-3"><RightIco /></div>
			</GNuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import LeftIco from 'bi/arrow-left.svg';
import RightIco from 'bi/arrow-right.svg';

const { locale } = useI18n();
const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

const props = withDefaults(defineProps<{
	ignoreDirBasedNav?: boolean;
	isDir?: boolean;
}>(), {
	ignoreDirBasedNav: false,
	isDir: false
});

const currentPath = `/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/${slugs.join('/')}`;
const currentDirectory = props.ignoreDirBasedNav ? `/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/` : props.isDir ? `/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/${slugs.join('/')}` : `/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/${slugs.slice(0, -1).join('/')}`;

const [prev, next] = await queryContent().where({ _partial: { $eq: false } }).findSurround(currentPath);
</script>

<style scoped>

</style>