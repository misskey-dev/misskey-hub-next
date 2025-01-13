<template>
    <div class="grid features gap-12">
        <div>
            <div class="lg:sticky lg:top-32">
                <h2 class="font-title font-bold text-2xl lg:text-4xl mb-2 lg:mb-6">{{ $t('_landing._features._root.title') }}</h2>
                <p class="text-lg">{{ $t('_landing._features._root.description') }}</p>
            </div>
        </div>
        <div class="space-y-8">
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-note.png" class="img" alt="some notes">
				<h3 class="title">{{ $t('_landing._features._note.title') }}</h3>
				<div class="description">{{ $t('_landing._features._note.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-reaction.png" class="img" alt="some emojis in the reaction picker">
				<h3 class="title">{{ $t('_landing._features._reaction.title') }}</h3>
				<div class="description">{{ $t('_landing._features._reaction.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-theme.png" class="img" alt="color palette">
				<h3 class="title">{{ $t('_landing._features._theme.title') }}</h3>
				<div class="description">{{ $t('_landing._features._theme.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-charts.png" class="img" alt="Charts">
				<h3 class="title">{{ $t('_landing._features._charts.title') }}</h3>
				<div class="description">{{ $t('_landing._features._charts.description') }}</div>
			</div></div>
		</div>
		<div class="space-y-8 lg:pt-24">
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-federation.png" class="img" alt="logos of Misskey and other ActivityPub server software">
				<h3 class="title">{{ $t('_landing._features._federation.title') }}</h3>
				<div class="description">{{ $t('_landing._features._federation.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-drive.png" class="img" alt="a list of files in Misskey Drive">
				<h3 class="title">{{ $t('_landing._features._drive.title') }}</h3>
				<div class="description">{{ $t('_landing._features._drive.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-thread.png" class="img" alt="multiple messages arranged in a thread">
				<h3 class="title">{{ $t('_landing._features._thread.title') }}</h3>
				<div class="description">{{ $t('_landing._features._thread.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/top-features-widgets.png" class="img" alt="sample widget showing activity as colored dots">
				<h3 class="title">{{ $t('_landing._features._widgets.title') }}</h3>
				<div class="description">{{ $t('_landing._features._widgets.description') }}</div>
			</div></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vFadeIn } from '@/assets/js/fadein';
</script>

<style scoped>
.features {
	grid-template-columns: 1fr;
}

@screen lg {
	.features {
		grid-template-columns: 300px repeat(2, 1fr);
	}
}

.item > .content {
    @apply p-5 bg-white dark:bg-slate-800 rounded-xl;
}

.item .img {
    @apply w-full aspect-2/1 object-cover rounded-lg mb-4;
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