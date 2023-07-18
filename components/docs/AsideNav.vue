<template>
    <ul class="toc-links mb-4 space-y-2">
        <li
            v-for="link in findDeepObject((links[0] as NavItem), (v) => realBasePath.replace(/\/$/, '') === v?._path.replace(/\/$/, ''))?.children ?? []"
            :key="link.text"
            :class="[`depth-${link.depth}`]"
        >
            <GNuxtLink
                :to="link._path"
                @click.passive="emit('child-click');"
                :class="['hover:text-accent-600']"
            >
                {{ link.text }}
            </GNuxtLink>
            <AsideNav
                class="mt-2"
                v-if="link.children"
                :links="link.children"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import { findDeepObject } from 'assets/js/misc';

const props = defineProps({
    links: {
        type: Array as PropType<NavItem[]>,
        default: () => []
    },
    basePath: {
        type: String,
        default: '',
    }
});

const { locale } = useI18n();
const route = useRoute();

const realBasePath = computed<string>(() => {
    if (props.basePath) {
        return props.basePath;
    }
    return route.path.replace(/^.*\/docs/, `/${locale.value}/docs`);
});

const emit = defineEmits(['move', 'child-click']);

</script>

<style scoped>
.toc-links ::v-deep(.depth-3) {
    @apply ml-2;
}
.toc-links ::v-deep(.depth-4) {
    @apply ml-4;
}
</style>