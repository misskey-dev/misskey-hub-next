<template>
	<div :class="['grid grid-cols-1 md:grid-cols-2 gap-4', wide && 'lg:grid-cols-3']">
		<ContentNavigation v-slot="{ navigation }" :query="query">
			<GNuxtLink
				class="block p-4 rounded-lg border border-slate-200 dark:border-accent-900 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:!no-underline"
				v-for="item in findDeepObject((navigation[0] as Record<string, any>), (v) => realBasePath.replace(/\/$/, '') === v?._path.replace(/\/$/, ''))?.children ?? []"
				:key="item._path"
				:to="localePath(item._path)"
			>
				<h3 class="font-bold text-lg mb-2">
					{{ item.navTitle || item.title }}<ArrowRightIco class="ml-1.5" />
				</h3>
				<p class="text-sm opacity-80">
					{{ item.description ?? "" }}
				</p>
			</GNuxtLink>
		</ContentNavigation>
	</div>
</template>

<script setup lang="ts">
import ArrowRightIco from "bi/arrow-right.svg";

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
    return route.path.replace(/^.*\/docs/, `/${locale.value}/docs`);
});

const localePath = useLocalePath();

const findDeepObject = (obj: Record<string, any>, condition: (v: any) => boolean): Record<string, any> | null => {
	if (condition(obj)) {
		return obj;
	}

	if (obj?.children && obj.children.length > 0) {
		for (let i = 0; i < obj.children.length; i++) {
            console.log(obj.children[i]);
			const result = findDeepObject(obj.children[i], condition);
			if (result) {
				return result;
			}
		}
	}

	return null;
};

const query = queryContent(realBasePath.value);
</script>

<style scoped></style>