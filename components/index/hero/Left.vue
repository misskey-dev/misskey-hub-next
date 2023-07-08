<template>
	<div class="relative space-y-6">
        <MkLogo class="block mx-auto lg:ml-0 w-full max-w-[250px]" />
		<h2 ref="tagline" class="text-center font-title lg:text-start font-bold tracking-wide text-3xl sm:text-5xl md:text-6xl leading-relaxed sm:leading-relaxed md:leading-relaxed" id="tagline">
			<div class="row">Interplanetary</div>
			<div class="row">microblogging</div>
			<div class="row">platform.🚀</div>
		</h2>
		<div class="max-w-lg mx-auto lg:mx-0 text-lg text-center lg:text-start">{{ $t('_landing._hero.description') }}</div>
		<div class="w-fit space-x-4 mx-auto lg:mx-0">
			<GButton button-type="button" color="accent" @click="scrollTo('#getStarted')">{{ $t('_landing._hero.gettingStarted') }}</GButton>
			<GButton button-type="button" @click="scrollTo('#learnMore')">{{ $t('learnMore') }}</GButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import MkLogo from '@/assets/svg/misskey-logotype.svg';
import { scrollTo } from '@/assets/js/scroll-to';

const tagline = ref<HTMLElement>();

onMounted(() => {
	window.setTimeout(() => {
		if (tagline.value) {
			for (let i = 0; i < tagline.value.children.length; i++) {
				const row = tagline.value.children[i];
				window.setTimeout(() => { row.classList.add('shown'); }, 200 * i);
			}
		}
	}, 250);
});
</script>

<style scoped>
.row {
	@apply opacity-0 translate-x-24 transition duration-1000
}
.row.shown {
	@apply opacity-100 translate-x-0;
}
</style>