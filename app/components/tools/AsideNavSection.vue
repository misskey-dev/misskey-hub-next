<script lang="ts" setup>
import type { NavSection } from '@/assets/data/nav';
import { isSamePath } from 'ufo';
import CaretRightFillIco from 'bi/caret-right-fill.svg';

const props = defineProps<{
    d: NavSection;
}>();

const emit = defineEmits([
    'toggleNav',
]);

const navData = props.d;
const route = useRoute();
const router = useRouter();
const isShown = ref(false);
const localePath = useGLocalePath();

watch(() => route.path, () => {
    if (navData.items.some((e) => isSamePath(route.path, localePath(e.to)))) {
        isShown.value = true;
    }
});

onMounted(() => {
    if (navData.items.some((e) => isSamePath(route.path, localePath(e.to)))) {
        isShown.value = true;
    }
});

function toggleCollapse() {
    isShown.value = !isShown.value;
}
</script>

<template>
    <button @click="toggleCollapse()" class="hover:text-accent-600 hover:bg-accent-50 dark:hover:text-accent-100 dark:hover:bg-accent-800 px-4 py-2 rounded-r-full flex items-center text-start"><CaretRightFillIco :class="[{ 'rotate-90': (isShown) }, 'mr-1 h-3 w-3 transition-transform']" />{{ $t(navData.title) }}</button>
    <div v-show="isShown">
        <GNuxtLink v-for="item in navData.items" @click.native="emit('toggleNav')" :class="[isSamePath(route.path, localePath(item.to)) ? 'bg-accent-100 text-accent-600 dark:text-accent-100 dark:bg-accent-800 font-bold' : 'hover:text-accent-600 hover:bg-accent-50 dark:hover:text-accent-100 dark:hover:bg-accent-800', 'block pl-6 pr-4 py-2 rounded-r-full']" :to="localePath(item.to)">
            {{ $t(item.i18n) }}
        </GNuxtLink>
    </div>
    <hr class="mb-1 mt-2" />
</template>