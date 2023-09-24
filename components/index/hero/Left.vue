<template>
	<div class="relative space-y-3 lg:space-y-6">
        <MkLogo class="block mx-auto lg:ml-0 w-full max-w-[120px] lg:max-w-[250px]" />
		<h2 ref="tagline" class="text-center font-title lg:text-start font-bold tracking-wide text-3xl sm:text-5xl lg:text-6xl leading-relaxed sm:leading-relaxed lg:leading-relaxed" id="tagline">
			<div class="row">Interplanetary</div>
			<div class="row">microblogging</div>
			<div class="row">platform.🚀</div>
		</h2>
		<div class="max-w-lg mx-auto lg:mx-0 text-lg text-center lg:text-start">{{ $t('_landing._hero.description') }}</div>
		<div v-if="notice" class="notice w-fit mx-auto lg:mx-0 rounded-full p-0.5">
			<GNuxtLink :to="isLocalPath(notice.to) ? localePath(notice.to) : notice.to" :target="!isLocalPath(notice.to) && '_blank'">
				<div class="h-10 bg-white hover:bg-slate-50 dark:bg-slate-950 hover:dark:bg-slate-800 rounded-full flex items-center p-0.5">
					<div class="notice h-9 w-9 rounded-full mr-2 p-2">
						<MegaphoneIco class="h-5 w-5 text-white -rotate-12" />
					</div>
					<div class="font-bold text-sm md:text-base mr-2">{{ notice.title[locale] ?? notice.title.ja }}<ArrowRightIco v-if="isLocalPath(notice.to)" class="ml-0.5" /><ArrowUpRightIco v-else class="ml-0.5" /></div>
				</div>
			</GNuxtLink>
		</div>
		<div class="w-fit space-x-4 mx-auto lg:mx-0">
			<GButton button-type="button" color="accent" @click="scrollTo('#getStarted')">{{ $t('_landing._hero.gettingStarted') }}</GButton>
			<GButton button-type="button" @click="scrollTo('#learnMore')">{{ $t('learnMore') }}</GButton>
		</div>
		<div class="lg:hidden relative py-6">
			<GDots class="dots w-40 h-40 top-0 left-6" />
			<GDots class="dots w-40 h-40 bottom-0 right-6" />
			<img class="relative mx-auto rounded-lg max-w-[240px]" src="/img/hero/screenshot-mobile.png" />
		</div>
	</div>
</template>

<script setup lang="ts">
import MkLogo from '@/assets/svg/misskey-logotype.svg';
import MegaphoneIco from 'bi/megaphone.svg';
import ArrowRightIco from 'bi/arrow-right.svg';
import ArrowUpRightIco from 'bi/arrow-up-right.svg';
import { scrollTo } from '@/assets/js/scroll-to';
import { isLocalPath } from '~/assets/js/misc';

const { notice } = useAppConfig();
const { locale, fallbackLocale } = useI18n();
const localePath = useLocalePath();
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
	@apply lg:opacity-0 lg:translate-x-24 transition duration-1000
}
.row.shown {
	@apply lg:opacity-100 lg:translate-x-0;
}

.dots {
	@apply absolute pointer-events-none select-none text-accent-600;
}

.notice {
	background-image: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
}
</style>