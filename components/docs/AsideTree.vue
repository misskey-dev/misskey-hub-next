<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
	links: {
		type: Array as PropType<any>,
		default: () => [],
	},
	level: {
		type: Number,
		default: 0,
	},
	max: {
		type: Number,
		default: null,
	},
	parent: {
		type: Object as PropType<any>,
		default: null,
	},
});

const route = useRoute();

const collapsedMap = useState(
	`docus-docs-aside-collapse-map-${props.parent?._path || "/"}`,
	() => {
		if (props.level === 0) {
			return {};
		}
		return (props.links as any[])
			.filter((link) => !!link.children)
			.reduce((map, link) => {
				map[link._path] = true;
				return map;
			}, {});
	}
);

const isActive = (link: any) => {
	return route.path === link._path;
};

const isCollapsed = (link: any) => {
	if (link.children) {
		// Directory has been toggled manually, use its state
		if (typeof collapsedMap.value[link._path] !== "undefined") {
			return collapsedMap.value[link._path];
		}

		// Check if aside.collapsed has been set in YML
		if ([true, false].includes(link?.aside?.collapsed)) {
			return link.aside.collapsed;
		}

		// Return value grabbed from the link
		if (link?.collapsed) {
			return link?.collapsed;
		}

	}

	return false;
};

const toggleCollapse = (link: any) =>
	(collapsedMap.value[link._path] = !isCollapsed(link));

const hasNesting = computed(() =>
	props.links.some((link: any) => link.children)
);
</script>

<template>
	<ul class="docs-aside-tree">
		<li
			v-for="link in links"
			:key="link._path"
			:class="{
				'has-parent-icon': parent?.icon,
				'has-children': level > 0 && link.children,
				bordered: level > 0 || !hasNesting,
				active: isActive(link),
			}"
		>
			<button
				v-if="link.children"
				class="title-collapsible-button"
				@click="toggleCollapse(link)"
			>
				<span class="content">
					<Icon
						v-if="link?.navigation?.icon || link.icon"
						:name="link?.navigation?.icon || link.icon"
						class="icon"
					/>
					<span>{{
						link?.navigation?.title || link.title || link._path
					}}</span>
				</span>
				<span>
					<Icon
						:name="
							isCollapsed(link)
								? 'lucide:chevrons-up-down'
								: 'lucide:chevrons-down-up'
						"
						class="collapsible-icon"
					/>
				</span>
			</button>

			<NuxtLink
				v-else
				:to="link.redirect ? link.redirect : link._path"
				class="link"
				:exact="link.exact"
				:class="{
					padded: level > 0 || !hasNesting,
					active: isActive(link),
				}"
			>
				<span class="content">
					<Icon
						v-if="link?.navigation?.icon || link.icon"
						:name="link?.navigation?.icon || link.icon"
						class="icon"
					/>
					<span>{{
						link?.navigation?.title || link.title || link._path
					}}</span>
				</span>
			</NuxtLink>

			<DocsAsideTree
				v-show="!isCollapsed(link)"
				v-if="
					link.children?.length && (max === null || level + 1 < max)
				"
				:links="link.children"
				:level="level + 1"
				:parent="link"
				:max="max"
				class="recursive"
			/>
		</li>
	</ul>
</template>

<style scoped lang="ts">
</style>
