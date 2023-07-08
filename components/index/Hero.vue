<template>
	<div class="container mx-auto">
        <MkLogo />
		<div class="tagline" id="tagline">
			<div class="row">Interplanetary</div>
			<div class="row">microblogging</div>
			<div class="row">platform.🚀</div>
		</div>
		<div class="description">{{ $t('_landing._hero.description') }}</div>
		<div class="buttons">
			<a class="start" href="#gettingStarted">{{ $t('_landing._hero.gettingStarted') }}</a>
			<a class="more" href="#learnMore">{{ $t('_landing._hero.learnMore') }}</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import MkLogo from '@/assets/svg/misskey-logotype.svg';
</script>

<style scoped>

</style>