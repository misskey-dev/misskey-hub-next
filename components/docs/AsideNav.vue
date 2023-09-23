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
                path.includes(link._path) ? 'border-accent-500' : 'border-gray-300',
            ]"
        >
            <GNuxtLink
                :to="link._path"
                @click.passive="emit('child-click');"
                :class="[
                    'block hover:text-accent-600',
                    depth === 1 && 'text-base',
                    depth === 2 ? 'px-2 py-1' : 'py-1',
                    isSamePath(path, link._path) && 'text-accent-600 font-bold',
                ]"
            >
                <div class="flex">
                    <div v-if="link.children && link.children.filter((v) => !isSamePath(v._path, link._path)).length > 0" class="mr-2">
                        <ArrowIco 
                            :class="[
                                'transition-transform',
                                path.includes(link._path) && 'rotate-90'
                            ]"
                        />
                    </div>
                    <div>{{ link.title }}</div>
                </div>
            </GNuxtLink>
            <AsideNav
                v-if="link.children && link.children.filter((v) => !isSamePath(v._path, link._path)).length > 0"
                v-show="path.includes(link._path)"
                :links="[link]"
                :depth="depth + 1"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import { findDeepObject } from '@/assets/js/misc';
import { isSamePath } from 'ufo';
import ArrowIco from "bi/chevron-right.svg";

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

router.afterEach((to) => {
    path.value = to.path;
});

onMounted(() => {
    const _route = useRoute();
    path.value = _route.path;
});

const realLinks = findDeepObject(props.links[0], (v) => {
    if (props.depth === 1) {
        return isSamePath(`/${locale.value}/docs/`, v._path);
    } else {
        return v._path.includes(props.links[0]._path);
    }
})?.children?.filter((v) => !isSamePath(v._path, props.links[0]._path));

const emit = defineEmits(['move', 'child-click']);

</script>

<style scoped>
.toc-links:not(.depth-1) {
    @apply ml-6;
}
</style>