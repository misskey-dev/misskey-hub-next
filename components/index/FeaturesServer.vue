<template>
	<div class="grid featuresServer gap-12 order-2 lg:order-1">
		<div class="featuresTitle">
			<div class="lg:sticky lg:top-32 text-right">
				<h2 class="font-title font-bold text-2xl lg:text-4xl mb-2 lg:mb-6">{{ $t('_landing._featuresServer._root.title') }}</h2>
				<p class="text-lg">{{ $t('_landing._featuresServer._root.description') }}</p>
			</div>
		</div>
		<div class="featuresItems1 space-y-8 lg:pt-24">
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._easyInstall.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._easyInstall.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._easySetup.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._easySetup.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/nodejs.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._nodejs.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._nodejs.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._postgresql.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._postgresql.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/scalable.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._scalable.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._scalable.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/jobQueue.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._jobQueue.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._jobQueue.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._seo.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._seo.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._cdn.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._cdn.description') }}</div>
				</div>
			</div>
		</div>
		<div class="featuresItems2 space-y-8">
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/api.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._api.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._api.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._relay.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._relay.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/ftt.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._ftt.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._ftt.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/rbt.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._rbt.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._rbt.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresServer._fullTextSearch.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._fullTextSearch.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/ml.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._ml.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._ml.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<img src="/img/top-features/sentry.webp" class="img">
					<h3 class="title">{{ $t('_landing._featuresServer._sentry.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresServer._sentry.description') }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { vFadeIn } from '@/assets/js/fadein';
</script>

<style scoped>
.featuresTitle {
	grid-area: featuresTitle;
}

.featuresItems1 {
	grid-area: featuresItems1;
}

.featuresItems2 {
	grid-area: featuresItems2;
}

.featuresServer {
	grid-template-columns: 1fr;
	grid-template-areas: 'featuresTitle' 'featuresItems1' 'featuresItems2';
}

@screen lg {
	.featuresServer {
		grid-template-columns: repeat(2, 1fr) 300px;
		grid-template-areas: 'featuresItems1 featuresItems2 featuresTitle';
	}
}

.item > .content {
    @apply p-5 bg-white dark:bg-neutral-800 rounded-xl;
}

.item .img {
    @apply w-full aspect-[2/1] object-cover rounded-lg mb-4;
}

.item .title {
    @apply font-title text-xl lg:text-2xl font-bold mb-2;
}

.__v_fadeIn_out > * {
	opacity: 0;
	transform: scale(0.9) translateY(-50px);
}

.__v_fadeIn_in > * {
	opacity: 1;
	transform: scale(1) translateY(0);
}

</style>
