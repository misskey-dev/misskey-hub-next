<template>
    <svg viewBox="-3 -3 70 70">
        <circle
            v-for="(item, index) in sortedData"
            cx="32"
            cy="32"
            r="16"
            :class="[
                $style.pie,
                (focusedIndex === index) && $style.focused,
            ]"
            :style="getStyle(index)"
            :data-real-value="item"
        />
    </svg>
</template>

<script setup lang="ts">
/**
 * 軽量円グラフ描画コンポーネント（すごい）
 */

/** RGB */
type RGBArray = [number, number, number];

const props = withDefaults(defineProps<{
    /** グラフにしたいデータ（数字の配列 or kv形式のオブジェクト） */
    data: number[] | Record<string | number | symbol, number>;
    /** 多い順にソートするか？（デフォルトON） */
    sort?: boolean;
    /** 小さな値を「その他」としてまとめるか？（デフォルトON、数値指定でその割合以下の項目をまとめる） */
    truncMinor?: boolean | number;
    /** グラデーション開始色（[r, g, b]の配列で指定） */
    startColor?: RGBArray;
    /** グラデーション終了色（[r, g, b]の配列で指定） */
    endColor?: RGBArray;
    /** 強調するindex番号を指定 */
    focusedIndex?: number;
}>(), {
    sort: true,
    truncMinor: true,
    startColor: [74, 179, 0],
    endColor: [230, 255, 148],
});

const isReady = ref(false);

const sortedData = computed(() => {
    let out = Array.isArray(props.data) ? props.data : Object.values(props.data);
    const sum = out.reduce((p, c) => p + c, 0);

    if (props.sort) {
        out = out.sort((a, b) => b - a);
    }
    if (props.truncMinor !== false) {
        const ratio = props.truncMinor === true ? 0.02 : props.truncMinor;
        const toBeTrunked = out.filter((v) => v / sum < ratio);
        out = [
            ...out.filter((v) => v / sum >= ratio),
            toBeTrunked.reduce((p, c) => p + c, 0),
        ];
    }
    return out;
});

const steppedColors = computed<RGBArray[]>(() => {
    const r = sortedData.value.map((_, i, a) => props.startColor[0] - (props.startColor[0] - props.endColor[0]) / a.length * i);
    const g = sortedData.value.map((_, i, a) => props.startColor[1] - (props.startColor[1] - props.endColor[1]) / a.length * i);
    const b = sortedData.value.map((_, i, a) => props.startColor[2] - (props.startColor[2] - props.endColor[2]) / a.length * i);
    return sortedData.value.map((_, i) => [r[i], g[i], b[i]]);
});

const dasharrays = computed(() => {
    const sum = sortedData.value.reduce((p, c) => p + c, 0);

    const out: number[][] = [];
    let start = 0;
    for (let index = 0; index < sortedData.value.length; index++) {
        const element = sortedData.value[index];
        const percentage = element / sum;
        if (index === 0) {
            out[index] = [percentage * 100, 100 - percentage * 100];
            start = percentage * 100;
        } else {
            out[index] = [
                0,
                start,
                percentage * 100,
                Math.max(100 - (start + (percentage * 100)), 0),
            ];
            start += percentage * 100;
        }
    }
    return out.map((v) => v.join(' '));
});

function getStyle(index: number) {
    return `stroke: rgb(${steppedColors.value[index][0]}, ${steppedColors.value[index][1]}, ${steppedColors.value[index][2]});
    stroke-dasharray: ${dasharrays.value[index]}`;
}

onMounted(() => {
    watch(dasharrays, (to) => {
        if (to.length > 0) {
            setTimeout(() => {
                isReady.value = true;
            }, 100);
        }
    })
});
</script>

<style module>
.pie {
    @apply transition-transform;
    transform-origin: center;
    fill: transparent;
    stroke-width: 32;
    stroke-dashoffset: 25;
}

.focused.pie {
    transform: scale(1.08);
}
</style>
