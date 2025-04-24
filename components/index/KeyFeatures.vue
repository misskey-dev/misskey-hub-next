<template>
	<div class="backdrop-blur-lg bg-white dark:bg-slate-900 bg-opacity-50 dark:bg-opacity-50 rounded-2xl p-6 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<div class="item">
			<div class="icon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
			<h3 class="title">{{ $t('_landing._keyFeatures._open.title') }}</h3>
			<div class="description">{{ $t('_landing._keyFeatures._open.description') }}</div>
		</div>
		<div class="item">
			<div class="icon"><img src="/img/emojis/ringed-planet_1fa90.png" aria-hidden="true"></div>
			<h3 class="title">{{ $t('_landing._keyFeatures._federated.title') }}</h3>
			<div class="description">{{ $t('_landing._keyFeatures._federated.description') }}</div>
		</div>
		<div class="item">
			<div class="icon"><img src="/img/emojis/package_1f4e6.png" aria-hidden="true"></div>
			<h3 class="title">{{ $t('_landing._keyFeatures._multifunction.title') }}</h3>
			<div class="description">{{ $t('_landing._keyFeatures._multifunction.description') }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.item {
    @apply space-y-2;
}

.title {
    @apply font-title font-bold text-center text-xl md:text-2xl;
}

.icon {
    text-align: center;
}

.icon img {
    width: 70px;
    margin: 0 auto;
}
</style>
