<template>
    <div class="flex gap-4 mb-4" :class="$style[direction]">
        <div class="flex-shrink-0" :class="direction === 'right' && 'order-2'">
            <div class="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border-[3px] border-slate-300 dark:border-slate-500">
                <img :src="`/img/docs/fukidashi/${chara}.webp`" :class="direction === 'left' && '-scale-x-100'" class="w-full h-full rounded-full object-cover" />
            </div>
            <div v-if="charaName" class="mt-1 text-sm text-center">{{ charaName }}</div>
        </div>
        <div class="flex-grow">
            <div
                :class="[$style.fukidashiContent, direction === 'right' && 'order-1']"
                class="relative rounded-lg border-[3px] p-4 bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-500"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    chara: string;
    charaName?: string;
    direction?: 'left' | 'right';
}>(), {
    direction: 'left',
});
</script>

<style module>
.fukidashiContent > :global(:last-child)  {
    margin-bottom: 0;
}

.left .fukidashiContent::before {
    content: "";
    position: absolute;
    top: 14px;
    left: -12px;
    @apply border-r-[12px] border-r-slate-300 dark:border-r-slate-500;
    border-bottom: 12px solid transparent;
    border-top: 12px solid transparent;
}
.right .fukidashiContent::before {
    content: "";
    position: absolute;
    top: 14px;
    right: -12px;
    @apply border-l-[12px] border-l-slate-300 dark:border-l-slate-500;
    border-bottom: 12px solid transparent;
    border-top: 12px solid transparent;
}
.left .fukidashiContent::after {
    content: "";
    position: absolute;
    top: 18px;
    left: -8px;
    @apply border-r-[8px] border-r-white dark:border-r-slate-950;
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
}
.right .fukidashiContent::after {
    content: "";
    position: absolute;
    top: 18px;
    right: -8px;
    @apply border-l-[8px] border-l-white dark:border-l-slate-950;
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
}
</style>
