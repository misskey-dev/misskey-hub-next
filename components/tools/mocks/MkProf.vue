<template>
    <div class="rounded-xl h-auto w-72 border border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-700">
        <div class="mt-[84px] bg-white dark:bg-slate-950 rounded-b-xl divide-y divide-slate-200 dark:divide-slate-900">
            <div class="flex items-center space-x-2 px-4 py-2">
                <div class="w-[66px] h-[66px] relative -mt-8 rounded-full border-4 border-white dark:border-slate-950 bg-slate-50 dark:bg-slate-900">
                    <img class="w-full h-full object-cover rounded-full" :src="avatar" />
                    <img
                        v-for="decoration in decorations"
                        :src="decoration.url"
                        class="absolute block min-w-[200%] w-[200%] -top-1/2 -left-1/2 select-none pointer-events-none"
                        :style="getStyle(decoration)"
                    />
                </div>
                <div>
                    <div class="font-bold text-sm">{{ $t('_avatarDecorationPreview._placeholder.username') }}</div>
                    <div class="opacity-70 text-xs">@ai</div>
                </div>
            </div>
            <div class="p-4 text-xs">{{ $t('_avatarDecorationPreview._placeholder.profileDescription') }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type * as Misskey from 'misskey-js';
import type { StyleValue } from 'vue';

withDefaults(defineProps<{
    avatar?: string;
    decorations?: (Omit<Misskey.entities.User['avatarDecorations'][number], 'id'>)[];
}>(), {
    avatar: '/img/docs/fukidashi/doya_ai.webp',
});

function getStyle(decoration: Omit<Misskey.entities.User['avatarDecorations'][number], 'id'>): StyleValue {
    const angle = decoration.angle ?? 0;
    const rotate = angle === 0 ? undefined : `${angle * 360}deg`;
    const scaleX = decoration.flipH ? -1 : 1;
    const scale = scaleX === 1 ? undefined : `${scaleX} 1`;
    const offsetX = decoration.offsetX ?? 0;
	const offsetY = decoration.offsetY ?? 0;
	const translate = (offsetX === 0 && offsetY === 0) ? undefined : `${offsetX * 100}% ${offsetY * 100}%`;
    
    return {
        rotate,
        scale,
        translate,
    };
}
</script>

<style scoped>
</style>