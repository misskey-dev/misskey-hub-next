<template>
<div>
	<IndexHeroBg />

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

		<div class="scroll-text">
			<svg class="scroll-text-svg" viewBox="0 0 300 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;fill:currentColor;">
				<g transform="matrix(30,0,0,30,64.2,59.75)">
						<path d="M0.309,0.012C0.465,0.012 0.575,-0.06 0.575,-0.199C0.575,-0.336 0.406,-0.381 0.363,-0.398C0.32,-0.415 0.238,-0.43 0.238,-0.467C0.238,-0.485 0.254,-0.497 0.288,-0.497C0.348,-0.497 0.399,-0.468 0.426,-0.445C0.438,-0.435 0.449,-0.434 0.461,-0.442L0.552,-0.503C0.564,-0.511 0.569,-0.523 0.561,-0.537C0.523,-0.599 0.424,-0.662 0.309,-0.662C0.181,-0.662 0.048,-0.608 0.048,-0.458C0.048,-0.31 0.218,-0.274 0.261,-0.257C0.304,-0.24 0.39,-0.224 0.39,-0.191C0.39,-0.173 0.384,-0.153 0.328,-0.153C0.26,-0.153 0.197,-0.2 0.168,-0.229C0.156,-0.24 0.145,-0.242 0.133,-0.233L0.039,-0.165C0.027,-0.156 0.023,-0.144 0.03,-0.131C0.07,-0.062 0.166,0.012 0.309,0.012Z" style="fill-rule:nonzero;"/>
				</g>
				<g transform="matrix(30,0,0,30,91.65,59.75)">
						<path d="M0.359,0.008C0.466,0.008 0.552,-0.035 0.609,-0.106C0.618,-0.117 0.614,-0.128 0.602,-0.138L0.509,-0.211C0.497,-0.221 0.485,-0.22 0.474,-0.208C0.448,-0.183 0.407,-0.157 0.359,-0.157C0.261,-0.157 0.195,-0.227 0.195,-0.325C0.195,-0.423 0.261,-0.493 0.359,-0.493C0.407,-0.493 0.448,-0.471 0.474,-0.446C0.486,-0.435 0.496,-0.432 0.509,-0.442L0.602,-0.512C0.615,-0.522 0.617,-0.534 0.607,-0.547C0.55,-0.616 0.464,-0.658 0.359,-0.658C0.166,-0.658 0.03,-0.518 0.03,-0.325C0.03,-0.132 0.166,0.008 0.359,0.008Z" style="fill-rule:nonzero;"/>
				</g>
				<g transform="matrix(30,0,0,30,120.36,59.75)">
						<path d="M0.065,-0L0.18,-0C0.196,-0 0.205,-0.009 0.205,-0.025L0.205,-0.201L0.272,-0.201L0.38,-0.017C0.387,-0.005 0.397,-0 0.41,-0L0.545,-0C0.565,-0 0.572,-0.012 0.562,-0.03L0.449,-0.222C0.513,-0.254 0.565,-0.321 0.565,-0.426C0.565,-0.579 0.455,-0.65 0.359,-0.65L0.065,-0.65C0.049,-0.65 0.04,-0.641 0.04,-0.625L0.04,-0.025C0.04,-0.009 0.049,-0 0.065,-0ZM0.205,-0.361L0.205,-0.49L0.331,-0.49C0.365,-0.49 0.4,-0.471 0.4,-0.426C0.4,-0.381 0.365,-0.361 0.331,-0.361L0.205,-0.361Z" style="fill-rule:nonzero;"/>
				</g>
				<g transform="matrix(30,0,0,30,147.66,59.75)">
						<path d="M0.359,0.008C0.552,0.008 0.686,-0.132 0.686,-0.325C0.686,-0.518 0.552,-0.658 0.359,-0.658C0.166,-0.658 0.03,-0.518 0.03,-0.325C0.03,-0.132 0.166,0.008 0.359,0.008ZM0.359,-0.157C0.261,-0.157 0.195,-0.227 0.195,-0.325C0.195,-0.423 0.261,-0.493 0.359,-0.493C0.457,-0.493 0.521,-0.423 0.521,-0.325C0.521,-0.227 0.457,-0.157 0.359,-0.157Z" style="fill-rule:nonzero;"/>
				</g>
				<g transform="matrix(30,0,0,30,178.59,59.75)">
						<path d="M0.065,-0L0.466,-0C0.482,-0 0.491,-0.009 0.491,-0.025L0.491,-0.125C0.491,-0.141 0.482,-0.15 0.466,-0.15L0.205,-0.15L0.205,-0.625C0.205,-0.641 0.196,-0.65 0.18,-0.65L0.065,-0.65C0.049,-0.65 0.04,-0.641 0.04,-0.625L0.04,-0.025C0.04,-0.009 0.049,-0 0.065,-0Z" style="fill-rule:nonzero;"/>
				</g>
				<g transform="matrix(30,0,0,30,203.52,59.75)">
						<path d="M0.065,-0L0.466,-0C0.482,-0 0.491,-0.009 0.491,-0.025L0.491,-0.125C0.491,-0.141 0.482,-0.15 0.466,-0.15L0.205,-0.15L0.205,-0.625C0.205,-0.641 0.196,-0.65 0.18,-0.65L0.065,-0.65C0.049,-0.65 0.04,-0.641 0.04,-0.625L0.04,-0.025C0.04,-0.009 0.049,-0 0.065,-0Z" style="fill-rule:nonzero;"/>
				</g>
				<g transform="matrix(30,0,0,30,228.45,59.75)">
						<path d="M0.055,-0.205L0.149,-0.205C0.165,-0.205 0.175,-0.213 0.175,-0.23L0.184,-0.625C0.184,-0.642 0.176,-0.65 0.16,-0.65L0.045,-0.65C0.029,-0.65 0.021,-0.642 0.021,-0.625L0.029,-0.23C0.029,-0.213 0.039,-0.205 0.055,-0.205ZM0.103,0.008C0.15,0.008 0.185,-0.027 0.185,-0.075C0.185,-0.122 0.15,-0.157 0.103,-0.157C0.055,-0.157 0.02,-0.122 0.02,-0.075C0.02,-0.027 0.055,0.008 0.103,0.008Z" style="fill-rule:nonzero;"/>
				</g>
			</svg>
		</div>

		<div class="non-top">
			
			<section class="heroSwiper _space">
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
		</div>
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
	padding-top: 60px;
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

	mask-image: linear-gradient(#000, #000), url("/circle.svg");
  mask-repeat: no-repeat;
  mask-position: center center, 16px 16px;
  mask-size: 100% 100%, 16px 16px;
	mask-composite: exclude;
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
	background: #ddd;

	mask-image: linear-gradient(#000, #000), url("/section-mask.svg");
  mask-repeat: no-repeat;
  mask-position: center center, center -12px;
  mask-size: 100% 100%, 1000px 100px;
	mask-composite: exclude;
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

.heroSwiper {
	overflow: clip;
	border-radius: 16px;
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
	background: #86b30025;
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
