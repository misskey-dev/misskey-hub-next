<template>
<ul class="toc-links mb-2 space-y-2" :class="{ 'mt-2': (links != null && links[0]?.depth > 1) }">
	<li
		v-for="link in links"
		:key="link.text"
		:class="[`depth-${link.depth}`]"
	>
		<a
			:href="`#${link.id}`"
			@click.prevent="emit('child-click'); scrollToHeading(link.id);"
			:class="['hover:text-accent-600', activeHeadings.includes(link.id) ? 'font-bold text-accent-600' : '']"
		>
			{{ link.text }}
		</a>
		<TocLinks
			v-if="link.children && (link.depth ?? 0 + 1) < maxDepth"
			:links="link.children"
			@move="childMove($event)"
		/>
	</li>
</ul>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content';

const props = withDefaults(defineProps<{
	links?: TocLink[];
	maxDepth?: number;
}>(), {
	maxDepth: Infinity,
});

const emit = defineEmits(['move', 'child-click']);

const { activeHeadings, updateHeadings } = useScrollspy();

if (import.meta.client) {
	setTimeout(() => {
			updateHeadings([
					...document.querySelectorAll('.markdown-body h1'),
					...document.querySelectorAll('.markdown-body h2'),
					...document.querySelectorAll('.markdown-body h3'),
					...document.querySelectorAll('.markdown-body h4'),
			]);
	}, 300);
}

function scrollToHeading (id: string) {
	if (import.meta.client) {
			if (!decodeURIComponent(location.href).includes(`#${id}`)) {
					// ページ遷移させずにハッシュだけ置き換えるために、history APIに直接書き込み
					history.pushState({}, '', `#${id}`);
			}
			document.getElementById(id)?.scrollIntoView({
					behavior: 'smooth'
			});
	}
	emit('move', id)
}

function childMove(id: string) {
	emit('move', id)
}
</script>

<style scoped>
.toc-links ::v-deep(.depth-3) {
	@apply ml-2;
}
.toc-links ::v-deep(.depth-4) {
	@apply ml-4;
}
</style>
