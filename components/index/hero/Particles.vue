<template>
	<ClientOnly>
		<transition name="fade">
			<div v-if="particleEnabled" ref="container" class="absolute top-0 left-0 w-full h-[800px] select-none pointer-events-none" :style="colorVars"></div>
		</transition>
	</ClientOnly>
</template>

<script setup lang="ts">
import { Loader } from '@/assets/js/particles/loader';

const colorMode = useColorMode();
const container = ref<HTMLElement>();
const isMounted = ref<boolean>(false);
const particleEnabled = ref<boolean>(true);

const colorVars = computed<string>(() => {
    const out = [`--c-brand: #86b300;`];
    if (colorMode.value == 'dark') {
        out.push(`--c-text: rgb(226 232 240);`);
    } else {
        out.push(`--c-text: rgb(51 65 85);`);
    }
    return out.join(' ');
});

onMounted(() => {
    isMounted.value = true;
});

let loader: Loader;

watch(container, (to) => {
    if (isMounted.value && import.meta.client && to) {
        loader = new Loader(to);

        window.addEventListener('scroll', () => {
            particleEnabled.value = false;
        }, {
            passive: true,
            once: true,
        });
        
    }
})

onUnmounted(() => {
    setTimeout(() => {
        loader.destroy();
    }, 1);
});

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
