<template>
<div>
	<GNav :landing="true" />

	<main class="main">
		<section class="tickers">
			<span class="tickersLabel">
				<b class="tickersLabelContent">Servers:</b>
			</span>
			<span class="tickersItems">
				<GMarquee :duration="70">
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
					<span class="tickersItem">xxxxxxx.example.com</span>
				</GMarquee>
			</span>
		</section>

		<section class="top">
			<div class="topBg">
				<IndexHeroParticles/>
				<IndexHeroBg/>
			</div>
			<div class="_space" style="display: flex;">
				<div class="topLeft">
					<div class="topTagline"><strong>Create.<br>Connect.<br>with <b class="textGradient">Misskey</b>.</strong></div>
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
						<IndexHeroMi3d style="margin: -20px auto 0 auto;" />
					</div>
				</div>
			</div>
		</section>

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

		<section class="stats _space">
			<div class="statsText">
				<span><b class="statsLabel">Commits:</b>12,345</span>
				<span><b class="statsLabel">Commits:</b>12,345</span>
				<span><b class="statsLabel">Commits:</b>12,345</span>
				<span><b class="statsLabel">Commits:</b>12,345</span>
			</div>
		</section>

		<section class="introduction _space">
			<h2 class="introductionTitle">{{ $t('_landing._introduction.title') }}</h2>
			<div class="introductionDescription">{{ $t('_landing._introduction.description') }}</div>

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

			<section class="introductionTip">
				<p class="introductionTipText">
					<b class="" style="background: #9ad11b; border-radius: 999px; padding: 4px 16px; margin-right: 16px;">TIP:</b>
					<span>{{ $t('_landing._introduction.tip') }}</span>
				</p>
			</section>
		</section>

		<section class="donationAndSponsors _space">
			<section class="sponsors">
				<IndexSponsors />
			</section>
			<section class="donation">
				<h2 class="donationTitle">{{ $t('_landing._donation.title') }}</h2>
				<p class="donationDescription">{{ $t('_landing._donation.description') }}</p>
				<div>
					<GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
				</div>
			</section>
		</section>

		<GDots style="width: 100%; height: 600px; color: #86b300;" :space="24" />

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
				<div class="useCasesItem">
					<div class="useCasesItemIcon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
					<h3 class="useCasesItemTitle">{{ $t('_landing._useCases.inHouse') }}</h3>
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
	--main-width: 1150px;
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

.tickers {
	display: flex;
	align-items: center;
	background: #fff6;
	backdrop-filter: blur(12px);
	border-radius: 999px;
	padding: 0 8px;
	margin: 16px auto;
	width: calc(100% - 64px);
	box-sizing: border-box;
	line-height: 40px;
	font-size: 90%;
	white-space: nowrap;
	overflow: clip;
}
.tickersLabel {
	margin-right: 16px;
}
.tickersLabelContent {
	background: #9ad11b;
	border-radius: 999px;
	padding: 4px 16px;
}
.tickersItems {
	display: inline-flex;
	flex: 1;
	min-width: 0;
	mask-image: linear-gradient(to right, transparent 0px, black 50px, black calc(100% - 50px), transparent 100%);
}
.tickersItem {
	margin: 0 16px;
}

.top {
	position: relative;
	border-radius: 16px;
	overflow: clip;
	box-sizing: border-box;
	margin-top: 16px;
	padding-top: 20px;
	padding-bottom: 160px;
	margin-bottom: -150px;
	contain: content;
}

.topBg {
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: calc(100% - 64px);
	height: 100%;
	border-radius: 16px;
	background: #ddd;
	overflow: clip;
}

:global(html.dark)  {
	.topBg {
		background: #222;
	}
}

.topLeft {
	position: relative;
	padding: 40px 0 32px 0;
}

.topRight {
	position: relative;
	flex: 1;
}

.topTagline {
	font-size: 320%;
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
	margin-top: 16px;
	margin-bottom: 16px;
}
.keyFeaturesItem {
	background: #fff6;
	backdrop-filter: blur(12px);
	border: solid 1px #0001;
	border-radius: 16px;
	padding: 32px;
	text-align: center;

	mask-image: linear-gradient(#000, #000), url("/circle.svg");
  mask-repeat: no-repeat;
  mask-position: center center, 16px 16px;
  mask-size: 100% 100%, 16px 16px;
	mask-composite: exclude;
}
:global(html.dark)  {
	.keyFeaturesItem {
		background: #3336;
		border: solid 1px #fff1;
	}
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

.stats {
	background: #fff6;
	backdrop-filter: blur(12px);
	border: solid 1px #0001;
	border-radius: 999px;
	padding: 0 32px;
	line-height: 40px;
	font-size: 90%;
	margin-bottom: 32px;
}
.statsText {
	display: flex;
	align-items: start;
	justify-content: center;
	gap: 64px;
}
.statsLabel {
	background: #9ad11b;
	border-radius: 999px;
	padding: 4px 16px;
	margin-right: 8px;
}

.introductionTip {
	background: #fff6;
	backdrop-filter: blur(12px);
	border: solid 1px #0001;
	padding: 24px 32px;
	border-radius: 16px;
	font-size: 90%;
}

.introduction {
	text-align: center;
	margin-top: 64px;
	margin-bottom: 64px;
	color: #404040;
}

.introductionTitle {
	font-size: 170%;
	font-weight: bold;
	margin-bottom: 16px;
}

.introductionDescription {
	margin-bottom: 32px;
}

.donationAndSponsors {
	display: flex;
	background: #fff6;
	backdrop-filter: blur(8px);
	border: solid 1px #0001;
	border-radius: 16px;
	padding: 32px;
	gap: 16px;
}
:global(html.dark)  {
	.donationAndSponsors {
		background: #262626;
	}
}

.donation {
	min-width: 0;
	width: 45%;
	box-sizing: border-box;
}
.sponsors {
	min-width: 0;
	width: 55%;
	box-sizing: border-box;
}
.donation {
	text-align: center;
	background: #f3f5da;
	color: #3b3d20;
	padding: 32px;
	border-radius: 16px;
	font-size: 95%;
}
:global(html.dark)  {
	.donation {
		background: #383c00;
		color: #fff;
	}
}

.donationTitle {
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 8px;
}


.scroll-text {
	position: relative;
	text-align: center;
}

.scroll-text-svg {
	display: inline-block;
	width: 200px;
}

.non-top {
	margin-top: -30px;
	padding-top: 100px;

	mask-image: linear-gradient(#000, #000), url("/section-mask.svg");
  mask-repeat: no-repeat;
  mask-position: center center, center -12px;
  mask-size: 100% 100%, 1000px 100px;
	mask-composite: exclude;
}

.heroSwiper {
	background: #fff6;
	backdrop-filter: blur(8px);
	border: solid 1px #0001;
	padding: 32px 0;
	overflow: clip;
	border-radius: 16px;
	margin-top: 16px;
}

.swiper {
	width: 100%;
}

.swiper-wrapper {

}

.swiper-slide {
	width: 700px;
	border-radius: 16px;
	overflow: clip;
	user-select: none;
	cursor: grab;

	&:not(.swiper-slide-active) {
		opacity: 0.5;
	}
}

.decentralized {
	margin-top: 64px;
	margin-bottom: 64px;
	border-radius: 16px;
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
	background: #eee;
	border-radius: 16px;
	padding: 32px;
	font-size: 90%;
}

.useCases {
	margin-top: 32px;
	margin-bottom: 64px;
	background: #fff;
	border-radius: 16px;
	padding: 32px;
}

.useCasesTitle {
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 32px;
	text-align: center;
}

.useCasesItemsContainer {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 16px;
}

.useCasesItem {
	background: #86b30025;
	border-radius: 16px;
	color: #484a40;
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

.textGradient {
	background: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
	color: transparent;
  background-clip: text;
}
</style>
