<template>
<div>
	<GNav :landing="true" />

	<IndexDesktop v-if="isDesktop" :clientLoaded="deviceSizeDetermined" />
	<IndexMobile v-else :clientLoaded="deviceSizeDetermined" />

	<GFooter />

	<Transition
		:leaveActiveClass="$style.xLeaveActive"
		:leaveToClass="$style.xLeaveTo"
	>
		<div v-if="!deviceSizeDetermined" :class="$style.loader">
			<MkLoading />
		</div>
	</Transition>
</div>
</template>

<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const { isHydrating } = useNuxtApp();
const deviceSizeDetermined = ref(!(!import.meta.client || isHydrating === true));

function getIsDesktop() {
	if (import.meta.client) {
		deviceSizeDetermined.value = true;
		return window.innerWidth > 1200;
	}
	return true;
}

const isDesktop = ref(true);

onMounted(() => {
	if (import.meta.client) {
		isDesktop.value = getIsDesktop();
		window.addEventListener('resize', () => {
			isDesktop.value = getIsDesktop();
		});
	}
});

definePageMeta({
	layout: 'landing',
});
</script>

<style module>
.root {
	position: relative;
}

.loader { 
	position: fixed;
	top: 0;
	left: 0;
	width: 100dvw;
	height: 100dvh;
	z-index: 10050;
	background: var(--THEME-bg);
	display: flex;
	align-items: center;
	justify-content: center;
}

.xLeaveActive {
	transition: opacity 0.5s ease;
}
.xLeaveTo {
	opacity: 0;
}
</style>
