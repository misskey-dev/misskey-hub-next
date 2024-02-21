<template>
    <ul class="toc-links text-sm" :class="[
        `depth-${depth}`,
        depth === 1 ? 'mb-4' : 'mb-2',
    ]">
        <li v-if="isEPDocs && depth === 1" class="mb-4">
            <GNuxtLink
                class="block hover:text-accent-600 text-base"
                :to="localePath('/docs/for-developers/api/')"
                @click.passive="isAsideNavOpen = false"
            >
                <ArrowLeftIco class="mr-1" />{{ $t('_docs.exitEndpointDocs') }}
            </GNuxtLink>
            <div class="mt-4 border-b border-slate-300 dark:border-slate-800"></div>
        </li>
        <li
            v-for="link in realLinks ?? []"
            :key="link._path"
            :class="[
                depth === 2 && 'border-l-2 flex flex-col',
                path.includes(link._path) ? 'border-accent-500' : 'border-gray-300 dark:border-gray-600',
            ]"
        >
            <component
                :is="(!isEPDocs || (isEPDocs && link._extension === 'json')) ? GNuxtLink : 'button'"

                v-bind="(!isEPDocs || (isEPDocs && link._extension === 'json')) ? {
                    to: link._path,
                } : {}"

                v-on="(!isEPDocs || (isEPDocs && link._extension === 'json')) ? {} : {
                    'click': () => {
                        if (!isEPDocs) return;
                        manualOpen[link._path] = !manualOpen[link._path] ?? true;
                    }
                }"
                
                @click.passive="isAsideNavOpen = false"
                :class="[
                    'block w-full hover:text-accent-600',
                    depth === 1 && 'text-base',
                    depth === 2 ? 'px-2 py-1' : 'py-1',
                    isSamePath(path, link._path) && 'text-accent-600 font-bold',
                ]"
            >
                <div class="flex">
                    <button
                        v-if="link.children && link.children.filter((v) => !isSamePath(v._path, link._path)).length > 0"
                        class="block px-1 mr-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    </div>
                    <div>{{ (isEPDocs && link._extension !== 'json') ? link.title.replace(/\s/g, '-').toLowerCase() + '/' : link.title }}</div>
                </div>
            </component>
            <AsideNav
                v-if="link.children && link.children.filter((v) => !isSamePath(v._path, link._path)).length > 0"
                v-show="(path.includes(link._path) && (manualOpen[link._path] !== false)) || manualOpen[link._path]"
                :links="[link]"
                :isEPDocs="isEPDocs"
                :depth="depth + 1"
                :parent="link"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import { findDeepObject } from '@/assets/js/misc';
import { isSamePath } from 'ufo';
import ArrowIco from "bi/chevron-right.svg";
import ArrowLeftIco from "bi/arrow-left.svg";
import GNuxtLink from '@/components/g/NuxtLink.vue';

const isAsideNavOpen = useState<boolean>('miHub_docs_asideNav_openState', () => false);

const manualOpen = useState<Record<string, boolean>>('miHub-docs-aside-manual-collapse', () => ({}));

onUnmounted(() => {
    manualOpen.value = {};
});

const props = withDefaults(defineProps<{
    links: NavItem[];
    depth?: number;
    parent?: NavItem | null;
    isEPDocs?: boolean;
}>(), {
    depth: 1,
    parent: null,
    isEPDocs: false,
});

const manualOpen = useState<Record<string, boolean>>('miHub-docs-aside-manual-collapse', () => ({}));

onUnmounted(() => {
    manualOpen.value = {};
});

const { locale } = useI18n();
const route = useRoute();
const path = ref(route.path);
const localePath = useLocalePath();

watch(() => route.path, (to) => {
    path.value = to;
}, {
    immediate: true,
});

onMounted(() => {
    const _route = useRoute();
    path.value = _route.path;
});

const realLinks = findDeepObject(props.links[0], (v) => {
    if (props.depth === 1) {
        if (props.isEPDocs) {
            return isSamePath('/api-docs/endpoints/', v._path);
        }
        return isSamePath(`/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/`, v._path);
    } else {
        return v._path.includes(props.links[0]._path);
    }
})?.children?.map((e) => {
    if (!props.isEPDocs || e._path.includes('docs/for-developers/api/endpoints')) return e;

    e._path = localePath(e._path.replace('api-docs/endpoints', 'docs/for-developers/api/endpoints'));

    return e;
}).filter((v) => !isSamePath(v._path, props.links[0]._path));

const emit = defineEmits(['move', 'child-click']);

</script>

<style scoped>
.toc-links:not(.depth-1) {
    @apply ml-6;
}
</style>