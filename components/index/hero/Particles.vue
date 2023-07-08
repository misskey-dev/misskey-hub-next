<template>
	<ClientOnly>
		<transition name="fade">
			<div v-if="particleEnabled" ref="container" class="absolute top-0 left-0 w-full h-[800px] select-none pointer-events-none" :style="colorVars"></div>
		</transition>
	</ClientOnly>
</template>

<script setup lang="ts">
import { Loader } from '@/assets/js/particles/loader';
import tailwindConfig from 'tailwindcss/resolveConfig';

const colorMode = useColorMode();
const container = ref<HTMLElement>();
const isMounted = ref<boolean>(false);
const particleEnabled = ref<boolean>(true);

const colorVars = computed<string>(() => {
    const out = [`--c-brand: ${tailwindConfig.theme?.extend.colors.accent['600'] || '#86b300'}`]
    if (colorMode.preference == 'dark') {
        out.join(`--c-text: `)
    }
    return out.join(' ');
});

onMounted(() => {
    isMounted.value = true;
});

watch(container, (to) => {
    if (isMounted.value && process.client && to) {
        const loader = new Loader(to);

        window.addEventListener('scroll', () => {
            particleEnabled.value = false;
        }, {
            passive: true,
            once: true,
        });
        

        onUnmounted(() => {
            setTimeout(() => {
                loader.destroy();
            })
        })
    }
})
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
