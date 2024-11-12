<template>
    <GNuxtLink v-if="buttonType == 'link'" :to="to" :class="[$style.button, color == 'accent' ? $style.buttonAccent : $style.buttonPlain]">
        <slot></slot>
    </GNuxtLink>
    <button v-else-if="buttonType == 'button'" @click="onClick()" :class="[$style.button, color == 'accent' ? $style.buttonAccent : $style.buttonPlain]">
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
    @apply py-3 px-6 text-lg font-bold rounded-full transition-all;
    box-shadow: 0 8px 20px -5px rgba(0, 0, 0, .2);
}

.buttonAccent {
    @apply text-white;
    box-shadow: 0 8px 20px -5px rgba(134, 179, 0, .4);
    background-image: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
    background-size: 200% 100%;
    background-position-x: 0%;
}

.buttonAccent:hover {
    background-position-x: 100%;
}

.buttonPlain {
    @apply text-accent-600 bg-white hover:text-accent-700 hover:bg-lime-100;
}
</style>