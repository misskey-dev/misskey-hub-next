<template>
<div :class="$style.root">
	<div :class="$style.header">
		<h2 :class="$style.headerTitle">{{ $t('_landing._features._root.title') }}</h2>
		<p>{{ $t('_landing._features._root.description') }}</p>
	</div>
	<div :class="$style.items">
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/top-features-note.png" :class="$style.itemContentImage" alt="some notes">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._note.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._note.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/top-features-reaction.png" :class="$style.itemContentImage" alt="some emojis in the reaction picker">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._reaction.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._reaction.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/customEmojis.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._customEmojis.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._customEmojis.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/role.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._roles.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._roles.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/top-features-charts.png" :class="$style.itemContentImage" alt="Charts">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._charts.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._charts.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._privacy.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._privacy.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._multiPurpose.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._multiPurpose.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/oss.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._oss.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._oss.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/top-features-federation.png" :class="$style.itemContentImage" alt="logos of Misskey and other ActivityPub server software">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._federation.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._federation.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/top-features-drive.png" :class="$style.itemContentImage" alt="a list of files in Misskey Drive">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._drive.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._drive.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/2fa.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._2fa.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._2fa.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/branding.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._branding.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._branding.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/moderation.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._moderation.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._moderation.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._monetization.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._monetization.description') }}</div>
			</div>
		</div>
		<div v-fade-in :class="$style.item">
			<div :class="$style.itemContent">
				<img src="/img/top-features/since2014.webp" :class="$style.itemContentImage">
				<h3 :class="$style.itemContentTitle">{{ $t('_landing._features._battleTested.title') }}</h3>
				<div :class="$style.itemContentDescription">{{ $t('_landing._features._battleTested.description') }}</div>
			</div>
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
import { vFadeIn } from '@/assets/js/fadein';
</script>

<style module>
.root {
}

@screen lg {
	.root {
		grid-template-columns: 300px repeat(2, 1fr);
	}
}

.header {
	text-align: center;
	margin-bottom: 16px;
}

.headerTitle {
	font-size: 170%;
	font-weight: bold;
}

.items {
	flex: 1;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 16px;
}

.itemContent {
	background: #fff6;
	backdrop-filter: blur(12px);
	color: #000b;
	border: solid 1px #0001;
	border-radius: 16px;
	padding: 20px;

	font-size: 90%;
	box-sizing: border-box;
	height: 100%;
}
:global(html.dark) {
	.itemContent {
		background: #3336;
		color: #fffd;
		border: solid 1px #fff1;
	}
}

.itemContentImage {
	display: block;
	width: 100%;
	border-radius: 8px;
	margin: 0 0 16px 0;
	aspect-ratio: 1.8;
	object-fit: cover;
}

.itemContentTitle {
	font-size: 120%;
	font-weight: bold;
	margin: 0 0 8px 0;
	padding: 0 6px;
}

.itemContentDescription {
	margin: 0;
	padding: 0 6px 0 6px;
}
</style>

<style scoped>
.__v_fadeIn_default_out > * {
	opacity: 0;
	transform: translateY(70px);
}

.__v_fadeIn_default_in > * {
	opacity: 1;
	transform: translateY(0);
}
</style>
