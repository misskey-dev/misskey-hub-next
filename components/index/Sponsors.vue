<template>
<div>
	<h2 :class="$style.title">{{ $t('_landing._sponsors.title') }}</h2>
	<div :class="$style.grid">
		<!-- スポンサーはscriptタグから追加してください -->
		<GNuxtLink
			v-for="sponsor in sponsors"
			:to="sponsor.to"
			target="_blank"
			:class="$style.sponsor"
		>
			<img :src="sponsor.img" alt="" :class="$style.sponsorImage" />
		</GNuxtLink>
	</div>
</div>
</template>

<script setup lang="ts">
import ArrowRightIco from 'bi/arrow-right.svg';

type Sponsor = {
	/** 画像URL */
	img: string;
	/** イメージにマージンを設けない場合はこちら */
	margin?: boolean | string;
	/** イメージを角丸にしない場合はこちら */
	noRounded?: boolean;
	/** 外部ページURL */
	to?: string;
};

const sponsors: Sponsor[] = [
	{
			img: '/img/sponsors/mask.svg',
			to: 'https://mask.io/',
	},
	{
			img: '/img/sponsors/rss3.png',
			to: 'https://rss3.io/',
	},
	{
			img: '/img/sponsors/skeb.svg',
			to: 'https://skeb.jp/',
	},
	{
			img: '/img/sponsors/xserver.png',
			margin: false,
			to: 'https://www.xserver.ne.jp/',
	},
	{
			img: '/img/sponsors/gmo_pepabo.svg',
			margin: 'padding: 0.625rem',
			to: 'https://pepabo.com/',
	},
	{
			img: '/img/sponsors/purple-dot-digital.jpg',
			margin: false,
			to: 'https://purpledotdigital.com/',
	},
	{
			img: '/img/sponsors/xfolio.svg',
			to: 'https://xfolio.jp/',
	},
];

const localePath = useGLocalePath();
</script>

<style module>
.title {
	font-size: 120%;
	font-weight: bold;
	text-align: center;
	margin-bottom: 8px;
	margin-top: 8px;
}

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, 100px);
	justify-content: center;
	gap: 24px;
}

@media (max-width: 1200px) {
	.grid {
		grid-template-columns: repeat(auto-fit, 75px);
		gap: 18px;
	}
}

.sponsor {
	aspect-ratio: 1;
}

.sponsorImage {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 12px;
}
</style>
