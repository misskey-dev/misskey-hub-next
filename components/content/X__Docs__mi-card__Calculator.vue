<template>
	<div :class="$style.calculator" class="mx-auto max-w-lg">
		<label class="mb-1">合計の支援額</label>
		<input v-model="paidAmount" :class="$style.input" type="number">
		<div>合計受け取り可能枚数: <b>{{ cardAmount }}</b></div>
	</div>
</template>

<script setup lang="ts">
const paidAmount = ref<number>(0);
const cardAmount = computed(() => (paidAmount.value >= 20000 ? 1 : 0) + Math.floor(Math.max(0, paidAmount.value - 20000) / 30000));
</script>

<style module>
.calculator {
	@apply rounded-lg border border-slate-200 dark:border-slate-700;

	display: block;
}

.input {
    @apply border-slate-200;
    flex-shrink: 1;
    padding: 10px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    border: solid 1px;
    border-radius: 4px 0 0 4px;
    -webkit-appearance: textfield;
}
</style>
