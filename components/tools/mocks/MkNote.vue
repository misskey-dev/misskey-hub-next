<template>
    <div class="rounded-xl h-auto w-full px-4 py-3.5 md:px-8 md:py-7 flex max-w-md border border-neutral-300 dark:border-neutral-800">
        <div class="mr-3.5">
            <div class="w-[46px] h-[46px] md:w-[58px] md:h-[58px] relative rounded-full bg-neutral-50 dark:bg-neutral-900">
                <img class="w-full h-full object-cover rounded-full" :src="avatar" />
                <img
                    v-for="decoration in decorations"
                    :src="decoration.url"
                    class="absolute block min-w-[200%] w-[200%] -top-1/2 -left-1/2 select-none pointer-events-none"
                    :style="getStyle(decoration)"
                />
            </div>
        </div>
        <div class="text-sm">
            <div class="flex space-x-2">
                <div class="font-bold">{{ $t('_avatarDecorationPreview._placeholder.username') }}</div>
                <div class="opacity-70">@ai</div>
            </div>
            <div><slot>{{ $t('_avatarDecorationPreview._placeholder.noteText') }}</slot></div>
            <div class="mt-1 flex flex-wrap gap-2">
                <span v-for="reaction in reactions" class="inline-flex items-center space-x-1 px-1.5 py-1 rounded bg-neutral-100 dark:bg-neutral-800">
                    <MkCustomEmoji class="hover:!transform-none" v-if="reaction.name.startsWith(':')" :name="reaction.name" :url="reaction.url" :useOriginalSize="true" :limitLength="limitReactionLength" />
                    <div v-else class="text-xl leading-[1.35] select-none">{{ reaction.name }}</div>
                    <span class="text-sm">{{ reaction.count }}</span>
                </span>
            </div>
            <div class="flex space-x-3.5 md:space-x-7 opacity-60">
                <div class="p-2"><ReplyIco class="w-3 h-3 md:h-4 md:w-4 block stroke-1 stroke-current reply" /></div>
                <div class="p-2"><RenoteIco class="w-3 h-3 md:h-4 md:w-4 block stroke-1 stroke-current" /></div>
                <div class="p-2"><ReactionIco class="w-3 h-3 md:h-4 md:w-4 block stroke-1 stroke-current" /></div>
                <div class="p-2"><MoreIco class="w-3 h-3 md:h-4 md:w-4 block stroke-1 stroke-current" /></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type * as Misskey from 'misskey-js';
import ReplyIco from 'bi/arrow-return-left.svg';
import RenoteIco from 'bi/repeat.svg';
import ReactionIco from 'bi/plus-lg.svg';
import MoreIco from 'bi/three-dots.svg';
import type { StyleValue } from 'vue';

withDefaults(defineProps<{
    avatar?: string;
    decorations?: (Omit<Misskey.entities.User['avatarDecorations'][number], 'id'>)[];
    reactions?: {
        name: string;
        url?: string;
        count: number;
    }[];
    limitReactionLength?: boolean;
}>(), {
    avatar: '/img/docs/fukidashi/doya_ai.webp',
    limitReactionLength: false,
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
.reply {
    transform: rotateX(180deg);
}
</style>
<!--


-->
