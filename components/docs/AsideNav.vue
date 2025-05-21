<template>
<ul class="toc-links text-sm" :class="[
	`depth-${depth}`,
	depth === 1 ? 'mb-4' : 'mb-2',
]">
	<li
		v-for="link in realLinks ?? []"
		:key="link.text"
		:class="[
			depth === 2 && 'border-l-2 flex flex-col',
			path.includes(link._path) ? 'border-accent-500' : 'border-gray-300 dark:border-gray-600',
		]"
	>
		<GNuxtLink
			:to="link._path"
			@click.passive="isAsideNavOpen = false"
			:class="[
				'block hover:text-accent-600',
				depth === 1 && 'text-base',
				depth === 2 ? 'px-2 py-1' : 'py-1',
				isSamePath(path, link._path) && 'text-accent-600 font-bold',
			]"
		>
			<div class="flex">
				<button
					v-if="link.children && link.children.filter((v) => !isSamePath(v._path, link._path)).length > 0"
					class="block px-1 mr-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
					@click.prevent.stop="() => {
						console.log('State:', path.includes(link._path));
						manualOpen[link._path] = !(manualOpen[link._path] ?? path.includes(link._path));
					}"
				>
					<ArrowIco 
						:class="[
							'transition-transform',
							((path.includes(link._path) && (manualOpen[link._path] !== false)) || manualOpen[link._path]) && 'rotate-90'
						]"
					/>
				</button>
				<div>{{ link.title }}</div>
			</div>
		</GNuxtLink>
		<AsideNav
			v-if="link.children && link.children.filter((v) => !isSamePath(v._path, link._path)).length > 0"
			v-show="(path.includes(link._path) && (manualOpen[link._path] !== false)) || manualOpen[link._path]"
			:links="[link]"
			:depth="depth + 1"
		/>
	</li>
</ul>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content';
import { findDeepObject } from '@/assets/js/misc';
import { isSamePath } from 'ufo';
import ArrowIco from "bi/chevron-right.svg";

const isAsideNavOpen = useState<boolean>('miHub_docs_asideNav_openState', () => false);

const manualOpen = useState<Record<string, boolean>>('miHub-docs-aside-manual-collapse', () => ({}));

onUnmounted(() => {
	manualOpen.value = {};
});

const props = withDefaults(defineProps<{
	links: NavItem[];
	depth?: number;
}>(), {
	depth: 1,
});

const { locale } = useI18n();
const router = useRouter();
const route = useRoute();
const path = ref(route.path);

watch(() => route.path, (to) => {
	path.value = to;
}, {
	immediate: true,
});

const realLinks = findDeepObject(props.links[0], (v) => {
	if (props.depth === 1) {
		return isSamePath(`/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/`, v._path);
	} else {
		return v._path.includes(props.links[0]._path);
	}
})?.children?.filter((cv: NavItem) => !isSamePath(cv._path, props.links[0]._path));

const emit = defineEmits(['move', 'child-click']);

</script>

<style scoped>
.toc-links:not(.depth-1) {
	@apply ml-6;
}
</style>
