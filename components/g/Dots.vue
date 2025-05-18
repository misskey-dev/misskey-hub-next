<template>
<svg fill="none">
	<defs>
		<pattern :id="id" x="0" y="0" :width="space" :height="space" patternUnits="userSpaceOnUse">
			<circle cx="2" cy="2" r="2" fill="currentColor"></circle>
		</pattern>
	</defs>
	<rect width="100%" height="100%" :fill="`url(#${id})`"></rect>
</svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	space?: number;
}>(), {
	space: 15,
});

const id = useId();
</script>
