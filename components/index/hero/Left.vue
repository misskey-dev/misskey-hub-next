<template>
	<div class="relative space-y-3 lg:space-y-6">
        <MkLogo class="block mx-auto lg:ml-0 w-full max-w-[120px] lg:max-w-[250px]" />
		<h2 class="text-center font-title lg:text-start font-bold tracking-wide text-3xl sm:text-5xl lg:text-6xl leading-relaxed sm:leading-relaxed lg:leading-relaxed tagline" :class="showTagline && 'shown'">
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
					<div class="font-bold text-sm md:text-base mr-2">{{ notice.title[locale === 'ja-ks' ? 'ja' : locale] ?? notice.title?.en ?? notice.title.ja }}<ArrowRightIco v-if="isLocalPath(notice.to)" class="ml-0.5" /><ArrowUpRightIco v-else class="ml-0.5" /></div>
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
			<img class="relative mx-auto rounded-lg max-w-[240px]" :src="mobileScreenShot" />
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
const localePath = useGLocalePath();
const showTagline = ref(false);
const colorMode = useColorMode();
const mobileScreenShot = computed(() => (colorMode.value === 'dark') ? '/img/hero/' + locale.value + '/misskey-mobile-dark.png' : '/img/hero/' + locale.value + '/misskey-mobile-light.png');

// お知らせ欄にブログが来る可能性もあるので
const localeState = useState('miHub_blog_originalLocale', () => locale.value);
localeState.value = locale.value;

onMounted(() => {
	setTimeout(() => {
		showTagline.value = true;
	}, 100);
});
</script>

<style scoped>
.row {
	@apply lg:opacity-0 lg:translate-x-24 transition duration-1000 pointer-events-none;
}
.tagline.shown .row {
	@apply lg:opacity-100 lg:translate-x-0 pointer-events-auto;
}
.tagline.shown .row:nth-child(1) {
	@apply delay-[200ms];
}
.tagline.shown .row:nth-child(2) {
	@apply delay-[400ms];
}
.tagline.shown .row:nth-child(3) {
	@apply delay-[600ms];
}

.dots {
	@apply absolute pointer-events-none select-none text-accent-600;
}

.notice {
	background-image: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
}
</style>
