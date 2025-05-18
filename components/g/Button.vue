<template>
<GNuxtLink v-if="buttonType == 'link'" :to="to" :class="[$style.button, shadow ? $style.shadow : null, color == 'accent' ? $style.buttonAccent : $style.buttonPlain]">
	<slot></slot>
</GNuxtLink>
<button v-else-if="buttonType == 'button'" class="_plainButton" @click="onClick()" :class="[$style.button, shadow ? $style.shadow : null, color == 'accent' ? $style.buttonAccent : $style.buttonPlain]">
	<slot></slot>
</button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	/** ボタンのタイプ */
	buttonType: 'button' | 'link';
	/** 移動先 */
	to?: string;
	/** 色設定 */
	color?: 'accent' | 'plain';
	/** 影の有無 */
	shadow?: boolean;
}>(), {
	color: 'plain',
});

const emits = defineEmits<{
	(e: 'click'): void;
}>();

function onClick() {
	emits('click');
}
</script>

<style module>
.button {
	padding: 0.5em 1.5em;
	border-radius: 999px;
}

.buttonAccent {
	background-image: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
	background-size: 200% 100%;
	background-position-x: 0%;
	color: #fff;
}

.buttonAccent:hover {
	background-position-x: 100%;
}

.buttonPlain {
	background: #fff;
}

.shadow.button {
	box-shadow: 0 8px 20px -5px rgba(0, 0, 0, .2);
}

.shadow.buttonAccent {
	box-shadow: 0 8px 20px -5px rgba(134, 179, 0, .4);
}
</style>
