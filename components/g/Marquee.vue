<template>
<div :class="$style.wrap">
	<span
		ref="contentEl"
		:class="[$style.content, {
			[$style.paused]: paused,
			[$style.reverse]: reverse,
		}]"
	>
		<span v-for="key in repeat" :key="key" :class="$style.text">
			<slot></slot>
		</span>
	</span>
</div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, useTemplateRef, watch } from 'vue';

const props = withDefaults(defineProps<{
	duration?: number;
	repeat?: number;
	paused?: boolean;
	reverse?: boolean;
}>(), {
	duration: 15,
	repeat: 2,
	paused: false,
	reverse: false,
});

const contentEl = useTemplateRef('contentEl');

let observer: MutationObserver | null = null;

function calcDuration() {
	if (contentEl.value == null) return;
	const eachLength = contentEl.value.offsetWidth / props.repeat;
	const factor = 3000;
	const duration = props.duration / ((1 / eachLength) * factor);
	contentEl.value.style.animationDuration = `${duration}s`;
}

watch(() => props.duration, calcDuration);

onMounted(() => {
	calcDuration();
	if (contentEl.value) {
		observer = new MutationObserver(() => {
			calcDuration();
		});
		observer.observe(contentEl.value, {
			childList: true,
			subtree: true,
		});
	}
});

onBeforeUnmount(() => {
	if (observer) {
		observer.disconnect();
		observer = null;
	}
});
</script>

<style module>
.wrap {
	overflow: clip;
	animation-play-state: running;
}

.wrap:hover {
	animation-play-state: paused;
}

.content {
	display: inline-block;
	white-space: nowrap;
	animation-play-state: inherit;
}

.text {
	display: inline-block;
	animation-name: marquee;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	animation-duration: inherit;
	animation-play-state: inherit;
}

.paused .text {
	animation-play-state: paused;
}

.reverse .text {
	animation-direction: reverse;
}

@keyframes marquee {
	0% { transform: translateX(0); }
	100% { transform: translateX(-100%); }
}
</style>
