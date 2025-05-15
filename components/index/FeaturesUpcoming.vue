<template>
	<div class="grid featuresUpcoming gap-12">
		<div class="featuresTitle">
			<div class="lg:sticky lg:top-32" style="text-align: right;">
				<h2 class="font-title font-bold text-2xl lg:text-4xl mb-2 lg:mb-6">{{ $t('_landing._featuresUpcoming._root.title') }}</h2>
				<p class="text-lg">{{ $t('_landing._featuresUpcoming._root.description') }}</p>
			</div>
		</div>
		<div class="featuresItems1 space-y-8 lg:pt-24">
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresUpcoming._jwt.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresUpcoming._jwt.description') }}</div>
				</div>
			</div>
		</div>
		<div class="featuresItems2 space-y-8">
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresUpcoming._newBackend.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresUpcoming._newBackend.description') }}</div>
				</div>
			</div>
			<div v-fade-in class="item">
				<div class="content">
					<h3 class="title">{{ $t('_landing._featuresUpcoming._vueVapor.title') }}</h3>
					<div class="description">{{ $t('_landing._featuresUpcoming._vueVapor.description') }}</div>
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

.featuresUpcoming {
	grid-template-columns: 1fr;
	grid-template-areas: 'featuresTitle' 'featuresItems1' 'featuresItems2';
}

@screen lg {
	.featuresUpcoming {
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
