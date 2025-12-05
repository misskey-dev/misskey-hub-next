<template>
	<div class="block mx-auto max-w-lg p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
		<label for="miCardCalculatorAmount" class="inline-block form-label">合計の支援額</label>
        <div class="input-group">
            <input v-model="paidAmount" id="miCardCalculatorAmount" type="number" class="form-control !flex-grow">
            <select v-model="currency" class="form-select !w-auto !flex-grow-0 !flex-shrink-0">
                <option value="JPY">JPY</option>
                <option value="USD">USD</option>
            </select>
        </div>
        <div class="mt-4">合計受け取り可能枚数: <b>{{ cardAmount }}</b></div>
	</div>
</template>

<script setup lang="ts">
const paidAmount = ref<number>(0);
const currency = ref<'USD' | 'JPY'>('JPY');
const cardAmount = computed(() => {
    const yen = paidAmount.value * (currency.value === 'USD' ? 150 : 1);
    return (yen >= 20000 ? 1 : 0) + Math.floor(Math.max(0, yen - 20000) / 30000);
});
</script>
