<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<time :title="absolute">
	<template v-if="invalid">{{ $t('_mk._ago.invalid') }}</template>
	<template v-else-if="mode === 'relative'">{{ relative }}</template>
	<template v-else-if="mode === 'absolute'">{{ absolute }}</template>
	<template v-else-if="mode === 'detail'">{{ absolute }} ({{ relative }})</template>
</time>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const { locale } = useI18n();

const props = withDefaults(defineProps<{
	time: Date | string | number | null;
	mode?: 'relative' | 'absolute' | 'detail';
}>(), {
	mode: 'relative',
});

function getDateSafe(n: Date | string | number) {
	try {
		if (n instanceof Date) {
			return n;
		}
		return new Date(n);
	} catch (err) {
		return {
			getTime: () => NaN,
		};
	}
}

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const _time = props.time == null ? NaN : getDateSafe(props.time).getTime();
const invalid = Number.isNaN(_time);
const dateTimeFormat = new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});
const absolute = !invalid ? dateTimeFormat.format(_time) : $t('_mk._ago.invalid');
const now = ref(Date.now());

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const ago = computed(() => (now.value - _time) / 1000/*ms*/);

const relative = computed<string>(() => {
	if (props.mode === 'absolute') return ''; // absoluteではrelativeを使わないので計算しない
	if (invalid) return $t('_mk._ago.invalid');

	return (
		ago.value >= 31536000 ? $t('_mk._ago.yearsAgo', { n: Math.round(ago.value / 31536000).toString() }) :
		ago.value >= 2592000 ? $t('_mk._ago.monthsAgo', { n: Math.round(ago.value / 2592000).toString() }) :
		ago.value >= 604800 ? $t('_mk._ago.weeksAgo', { n: Math.round(ago.value / 604800).toString() }) :
		ago.value >= 86400 ? $t('_mk._ago.daysAgo', { n: Math.round(ago.value / 86400).toString() }) :
		ago.value >= 3600 ? $t('_mk._ago.hoursAgo', { n: Math.round(ago.value / 3600).toString() }) :
		ago.value >= 60 ? $t('_mk._ago.minutesAgo', { n: (~~(ago.value / 60)).toString() }) :
		ago.value >= 10 ? $t('_mk._ago.secondsAgo', { n: (~~(ago.value % 60)).toString() }) :
		ago.value >= -3 ? $t('_mk._ago.justNow') :
		ago.value < -31536000 ? $t('_mk._timeIn.years', { n: Math.round(-ago.value / 31536000).toString() }) :
		ago.value < -2592000 ? $t('_mk._timeIn.months', { n: Math.round(-ago.value / 2592000).toString() }) :
		ago.value < -604800 ? $t('_mk._timeIn.weeks', { n: Math.round(-ago.value / 604800).toString() }) :
		ago.value < -86400 ? $t('_mk._timeIn.days', { n: Math.round(-ago.value / 86400).toString() }) :
		ago.value < -3600 ? $t('_mk._timeIn.hours', { n: Math.round(-ago.value / 3600).toString() }) :
		ago.value < -60 ? $t('_mk._timeIn.minutes', { n: (~~(-ago.value / 60)).toString() }) :
		$t('_mk._timeIn.seconds', { n: (~~(-ago.value % 60)).toString() })
	);
});

let tickId: number;
let currentInterval: number;

function tick() {
	now.value = Date.now();
	const nextInterval = ago.value < 60 ? 10000 : ago.value < 3600 ? 60000 : 180000;

	if (currentInterval !== nextInterval) {
		if (tickId) window.clearInterval(tickId);
		currentInterval = nextInterval;
		tickId = window.setInterval(tick, nextInterval);
	}
}

if (!invalid && (props.mode === 'relative' || props.mode === 'detail')) {
	onMounted(() => {
		tick();
	});
	onUnmounted(() => {
		if (tickId) window.clearInterval(tickId);
	});
}
</script>
