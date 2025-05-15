<template>
<div>
	<!--<IndexHeroBg />-->

	<!--
	<div style="position: absolute; top: 0; left: 0; width: 100dvw; height: 100dvh;">
		<IndexHeroNodesAnim/>
	</div>
	-->

	<div style="position: absolute; top: 50px; left: 0; width: 100dvw; height: 700px; pointer-events: none;">
		<IndexHeroParticles style="width: 100%; height: 100%;"/>
	</div>

	<GNav :landing="true" />

	<main class="main">
		<div class="top _space">
			<div class="topLeft">
				<div class="topTagline"><strong>Interplanetary<br>microblogging<br>platform</strong></div>
				<div class="topDescription">{{ $t('_landing._hero.description') }}</div>
				<div v-if="notice" class="notice w-fit mx-auto lg:mx-0 rounded-full p-0.5">
				<GNuxtLink :to="isLocalPath(notice.to) ? localePath(notice.to) : notice.to" :target="!isLocalPath(notice.to) ? '_blank' : undefined">
					<div class="h-10 bg-white hover:bg-neutral-50 dark:bg-neutral-950 hover:dark:bg-neutral-800 rounded-full flex items-center p-0.5">
						<div class="notice h-9 w-9 rounded-full mr-2 p-2">
							<MegaphoneIco class="h-5 w-5 text-white -rotate-12" />
						</div>
						<div class="font-bold text-sm md:text-base mr-2">{{ localizedNotice }}<ArrowRightIco v-if="isLocalPath(notice.to)" class="ml-0.5" /><ArrowUpRightIco v-else class="ml-0.5" /></div>
					</div>
				</GNuxtLink>
				</div>
				<div class="topButtons">
					<GButton button-type="button" color="accent" @click="scrollTo('#getStarted')">{{ $t('_landing._hero.gettingStarted') }}</GButton>
					<GButton button-type="button" @click="scrollTo('#learnMore')">{{ $t('learnMore') }}</GButton>
				</div>
			</div>
			<div class="topRight">
				<div class="topRightMi">
					<IndexHeroMi3d />
				</div>
			</div>
		</div>

		<section class="keyFeatures _space">
			<div class="keyFeaturesItem">
				<div class="keyFeaturesItemIcon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
				<h3 class="keyFeaturesItemTitle">{{ $t('_landing._keyFeatures._open.title') }}</h3>
				<div class="keyFeaturesItemDescription">{{ $t('_landing._keyFeatures._open.description') }}</div>
			</div>
			<div class="keyFeaturesItem">
				<div class="keyFeaturesItemIcon"><img src="/img/emojis/ringed-planet_1fa90.png" aria-hidden="true"></div>
				<h3 class="keyFeaturesItemTitle">{{ $t('_landing._keyFeatures._federated.title') }}</h3>
				<div class="keyFeaturesItemDescription">{{ $t('_landing._keyFeatures._federated.description') }}</div>
			</div>
			<div class="keyFeaturesItem">
				<div class="keyFeaturesItemIcon"><img src="/img/emojis/package_1f4e6.png" aria-hidden="true"></div>
				<h3 class="keyFeaturesItemTitle">{{ $t('_landing._keyFeatures._powerful.title') }}</h3>
				<div class="keyFeaturesItemDescription">{{ $t('_landing._keyFeatures._powerful.description') }}</div>
			</div>
		</section>

		<section class="heroSwiper">
			<div class="swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="/img/hero/misskey-light.png"></div>
					<div class="swiper-slide"><img src="/img/hero/ss-jobqueue.light.png"></div>
					<div class="swiper-slide"><img src="/img/hero/misskey-light.png"></div>
					<div class="swiper-slide"><img src="/img/hero/misskey-light.png"></div>
					<div class="swiper-slide"><img src="/img/hero/misskey-light.png"></div>
				</div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</div>
		</section>

		<section class="donation _space">
			<h2 class="donationTitle">{{ $t('_landing._donation.title') }}</h2>
			<p class="donationDescription">{{ $t('_landing._donation.description') }}</p>
			<div>
				<GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
			</div>
		</section>

		<section class="sponsors _space">
			<IndexSponsors />
		</section>

		<section class="decentralized _space">
			<h2 class="decentralizedTitle">{{ $t('_landing._decenterized.title') }}</h2>
			<div class="decentralizedContainer">
				<div class="decentralizedDescription">
					<div style="line-height: 200%;">{{ $t('_landing._decenterized.description') }}</div>
					<GButton buttonType="link" color="accent">{{ $t('learnMore') }}</GButton>
				</div>
				<div class="decentralizedImage">
					aaa
				</div>
			</div>
		</section>

		<section class="useCases _space">
			<h2 class="useCasesTitle">{{ $t('_landing._useCases.title') }}</h2>
			<div class="useCasesItemsContainer">
				<div class="useCasesItem">
					<div class="useCasesItemIcon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
					<h3 class="useCasesItemTitle">{{ $t('_landing._useCases.single') }}</h3>
				</div>
				<div class="useCasesItem">
					<div class="useCasesItemIcon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
					<h3 class="useCasesItemTitle">{{ $t('_landing._useCases.official') }}</h3>
				</div>
				<div class="useCasesItem">
					<div class="useCasesItemIcon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
					<h3 class="useCasesItemTitle">{{ $t('_landing._useCases.community') }}</h3>
				</div>
			</div>
		</section>

		<section class="features _space">
			<IndexFeatures />
		</section>

		<section class="featuresServer _space">
			<IndexFeaturesServer  />
		</section>

		<section class="featuresClient _space">
			<IndexFeaturesClient />
		</section>

		<section class="featuresUpcoming _space">
			<IndexFeaturesUpcoming />
		</section>

		<section class="getStarted" id="getStarted _space">
			<IndexGetStarted />
		</section>
	</main>

	<GFooter />
</div>
</template>

<script setup lang="ts">
import { scrollTo } from '@/assets/js/scroll-to';
import { isLocalPath } from '@/assets/js/misc';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const { notice } = useAppConfig();
const isUwu = useState<boolean>('isUwu');
const localePath = useGLocalePath();
const { locale, fallbackLocale } = useI18n();

// お知らせ欄にブログが来る可能性もあるので
const localeState = useState('miHub_blog_originalLocale', () => locale.value);
localeState.value = locale.value;

const localizedNotice = computed(() => {
	if (locale.value === 'ja-ks') {
		return notice.title.ja;
	} else if (locale.value === 'ja') {
		return notice.title.ja;
	} else {
		return notice.title?.en ?? notice.title.ja;
	}
});

useHead(() => ({
		link: isUwu ? [
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-light.png' },
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-dark.png' },
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-mobile-light.png' },
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-mobile-dark.png' },
		] : [],
}));

onMounted(() => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		spaceBetween: 100,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 100,
			modifier: 2,
			slideShadows: false,
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
});

definePageMeta({
		layout: 'landing',
});
</script>

<style scoped>
.main {
	--main-width: 1200px;
	position: relative;
	z-index: 1;
}

._space {
	width: calc(100% - 32px);
	max-width: var(--main-width);
	box-sizing: border-box;
	margin-left: auto;
	margin-right: auto;
}

.top {
	display: flex;
}

.topLeft {
	padding-top: 32px;
}

.topTagline {
	font-size: 350%;
	line-height: 120%;
}

.topDescription {
	margin: 16px 0;
}

.topButtons {
	display: flex;
	gap: 16px;
	margin-top: 24px;
}

.topRightMi {
}

.keyFeatures {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 16px;
	margin-top: 64px;
	margin-bottom: 64px;
}
.keyFeaturesItem {
	background: #fff;
	border-radius: 16px;
	padding: 32px;
	text-align: center;
}
.keyFeaturesItemIcon {
	width: 50px;
	height: 50px;
	margin: 0 auto;
}
.keyFeaturesItemIcon img {
	width: 100%;
	height: 100%;
}
.keyFeaturesItemTitle {
	font-size: 120%;
	font-weight: bold;
	margin: 10px 0;
}
.keyFeaturesItemDescription {
	font-size: 90%;
}

.donation {
	text-align: center;
	background: #f3f5da;
	color: #3b3d20;
	padding: 32px;
	border-radius: 16px;
	margin-top: 64px;
	margin-bottom: 64px;
}
.donationTitle {
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 8px;
}

.swiper {
	width: 100%;
}

.swiper-slide {
	width: 1000px;
	border-radius: 16px;
	overflow: clip;
	user-select: none;
}

.decentralized {
	margin-top: 64px;
	margin-bottom: 64px;
}

.decentralizedTitle {
	font-size: 150%;
	font-weight: bold;
	margin-bottom: 32px;
	text-align: center;
}

.decentralizedContainer {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.decentralizedDescription {
	background: #fff;
	border-radius: 16px;
	padding: 32px;
}

.useCases {
	margin-top: 64px;
	margin-bottom: 64px;
}

.useCasesTitle {
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 32px;
	text-align: center;
}

.useCasesItemsContainer {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 16px;
}

.useCasesItem {
	background: #fff;
	border-radius: 16px;
	padding: 32px;
	text-align: center;
}
.useCasesItemIcon {
	width: 50px;
	height: 50px;
	margin: 0 auto;
}
.useCasesItemIcon img {
	width: 100%;
	height: 100%;
}
.useCasesItemTitle {
	font-size: 100%;
	margin: 10px 0;
}
</style>
