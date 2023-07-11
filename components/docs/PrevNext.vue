<script setup lang="ts">
import { upperFirst } from "scule";

const { prev, next, navigation } = useContent();
const { navDirFromPath } = useContentHelpers();

const directory = (link: any) => {
	const nav = navDirFromPath(link._path, navigation.value || []);

	if (nav && nav[0]) {
		return nav[0]?._path ?? "";
	} else {
		const dirs = link.split("/");
		const directory = dirs.length > 1 ? dirs[dirs.length - 2] : "";
		return directory.split("-").map(upperFirst).join(" ");
	}
};
</script>

<template>
	<div v-if="prev || next" class="docs-prev-next">
		<NuxtLink v-if="prev && prev._path" :to="prev._path" class="prev">
			<Icon name="heroicons-outline:arrow-sm-left" class="icon" />
			<div class="wrapper">
				<span v-if="directory(prev._path)" class="directory">
					{{ directory(prev._path) }}
				</span>
				<span class="title">{{ prev.title }}</span>
			</div>
		</NuxtLink>

		<span v-else />

		<NuxtLink v-if="next && next._path" :to="next._path" class="next">
			<div class="wrapper">
				<span v-if="directory(next._path)" class="directory">
					{{ directory(next._path) }}
				</span>
				<span class="title">{{ next.title }}</span>
			</div>
			<Icon name="heroicons-outline:arrow-sm-right" class="icon" />
		</NuxtLink>
	</div>
</template>
