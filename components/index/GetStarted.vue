<template>
    <div>
        <h2 class="mb-12 text-2xl lg:text-3xl text-center font-bold font-title">{{ $t('_landing._getStarted.title') }}</h2>
        <div class="grid gap-12 lg:grid-cols-3">
            <div v-fade-in class="find">
				<div class="item">
					<div class="icon"><img src="/img/emojis/ringed-planet_1fa90.png" aria-hidden="true"></div>
					<h3 class="title">{{ $t('_landing._getStarted._find.title') }}</h3>
					<div class="description"></div>
					<GNuxtLink class="link" :to="localePath('/servers/')">{{ $t('_landing._getStarted._find.list') }}</GNuxtLink>
				</div>
			</div>
			<div v-fade-in class="create">
				<div class="item">
					<div class="icon"><img src="/img/emojis/package_1f4e6.png" aria-hidden="true"></div>
					<h3 class="title">{{ $t('_landing._getStarted._create.title') }}</h3>
					<div class="description"></div>
					<GNuxtLink class="link" :to="localePath('/docs/for-admin/install/guides/')">{{ $t('_landing._getStarted._create.guide') }}</GNuxtLink>
				</div>
			</div>
			<div v-fade-in class="docs">
				<div class="item">
					<div class="icon"><img src="/img/emojis/light-bulb_1f4a1.png" aria-hidden="true"></div>
					<h3 class="title">{{ $t('_landing._getStarted._docs.title') }}</h3>
					<div class="description"></div>
					<GNuxtLink class="link" :to="localePath('/docs/')">{{ $t('_landing._getStarted._docs.docs') }}</GNuxtLink>
				</div>
			</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vFadeIn } from '@/assets/js/vFadeIn';

const localePath = useGLocalePath();
</script>

<style scoped>
.item {
    @apply rounded-2xl py-12 px-4 text-center bg-white dark:bg-neutral-800;
}

.find > .item {
    @apply bg-accent-600 bg-opacity-60 backdrop-blur-lg text-white;
}

.item > .icon {
    @apply w-12 mb-4 mx-auto;
}

.item > .title {
    @apply font-title font-bold text-xl text-center mb-6;
}

.item > .link {
    @apply px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-bold text-lg;
}

.find .link {
    @apply text-accent-600 dark:text-neutral-200 bg-white dark:bg-accent-950 hover:bg-accent-100 dark:hover:bg-accent-900;
}
</style>
