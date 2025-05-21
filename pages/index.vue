<template>
<div>
	<GNav :landing="true" />

	<IndexDesktop v-if="isDesktop"/>
	<IndexMobile v-else/>

	<GFooter />
</div>
</template>

<script setup lang="ts">
const isDesktop = window.innerWidth >= 1200;

definePageMeta({
	layout: 'landing',
});
</script>
