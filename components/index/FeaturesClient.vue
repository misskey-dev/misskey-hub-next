<template>
    <div class="grid featuresClient gap-12">
			<div>
            <div class="lg:sticky lg:top-32">
                <h2 class="font-title font-bold text-2xl lg:text-4xl mb-2 lg:mb-6">{{ $t('_landing._featuresClient._root.title') }}</h2>
                <p class="text-lg">{{ $t('_landing._featuresClient._root.description') }}</p>
            </div>
        </div>
        <div class="space-y-8">
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/responsive.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._responsive.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._responsive.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/theme.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._theme.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._theme.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/deck.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._deck.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._deck.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/multiAccounts.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._multiAccounts.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._multiAccounts.description') }}</div>
			</div></div>
		</div>
		<div class="space-y-8 lg:pt-24">
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/widgets.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._widgets.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._widgets.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/settings.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._settingsManagement.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._settingsManagement.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/plugin.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._plugin.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._plugin.description') }}</div>
			</div></div>
			<div v-fade-in class="item"><div class="content">
				<img src="/img/top-features/i18n.webp" class="img">
				<h3 class="title">{{ $t('_landing._featuresClient._i18n.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresClient._i18n.description') }}</div>
			</div></div>
        </div>
				
    </div>
</template>

<script setup lang="ts">
import { vFadeIn } from '@/assets/js/fadein';
</script>

<style scoped>
.featuresClient {
	grid-template-columns: 1fr;
}

@screen lg {
	.featuresClient {
		grid-template-columns: 300px repeat(2, 1fr);
	}
}

.item > .content {
    @apply p-5 bg-white dark:bg-slate-800 rounded-xl;
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
