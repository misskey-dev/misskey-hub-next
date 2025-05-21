<template>
<div>
	<GNav :landing="true" />

	<IndexDesktop v-if="isDesktop"/>
	<IndexMobile v-else/>

	<GFooter />
</div>
</template>

<script setup lang="ts">
const isDesktop = import.meta.client ? window.innerWidth >= 1200 : true;

definePageMeta({
	layout: 'landing',
});
</script>
