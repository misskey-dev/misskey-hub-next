<template>
	<div class="flex justify-between space-y-3 lg:space-y-0 items-center">
		<div class="lg:w-2/5">
			<GNuxtLink v-if="prev && (ignoreDirBasedNav || prev._path.includes(currentDirectory))" :to="prev._path" class="rounded-lg transition-colors p-4 border dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-start flex justify-start items-center">
				<div class="mr-3"><GIcon :icon="'arrow-left'" /></div>
				<div>
					<div class="mb-1 text-sm">{{ $t('_docs._prevNext.prev') }}</div>
					<div class="font-bold text-lg">{{ prev.title }}</div>
				</div>
			</GNuxtLink>
		</div>
		<div class="lg:w-2/5">
			<GNuxtLink v-if="next && (ignoreDirBasedNav || prev._path.includes(currentDirectory))" :to="next._path" class="rounded-lg transition-colors p-4 border dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-end flex justify-end items-center">
				<div>
					<div class="mb-1 text-sm">{{ $t('_docs._prevNext.next') }}</div>
					<div class="font-bold text-lg">{{ next.title }}</div>
				</div>
				<div class="ml-3"><GIcon :icon="'arrow-right'" /></div>
			</GNuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

withDefaults(defineProps<{
	ignoreDirBasedNav?: boolean;
}>(), {
	ignoreDirBasedNav: false,
});

const currentPath = `/${locale.value}/docs/${slugs.join('/')}`;
const currentDirectory = `/${locale.value}/docs/${slugs.slice(0, -1).join('/')}`;

const [prev, next] = await queryContent().only(['_path', 'title']).where({ _path: { $contains: 'docs' }, _partial: false }).findSurround(currentPath);
</script>

<style scoped>

</style>