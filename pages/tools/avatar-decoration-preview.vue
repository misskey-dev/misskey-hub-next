<template>
    <div class='container mx-auto max-w-screen-xl px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_avatarDecorationPreview.title') }}
        </h1>

        <div class="space-y-8">
            <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-neutral-950">
                <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b border-neutral-300 dark:border-neutral-800">
                    {{ $t('_avatarDecorationPreview.preview') }}
                </header>
                <div class="flex gap-8 items-center justify-center flex-wrap">
                    <ToolsMocksMkProf
                        :avatar="avatar"
                        :decorations="realDecorations"
                    />
                    <ToolsMocksMkNote
                        :avatar="avatar"
                        :decorations="realDecorations"
                    />
                </div>
            </div>

            <div class="p-6 rounded-lg bg-white dark:bg-neutral-950">
                <header class="-mt-6 -mx-6 px-6 py-3 border-b border-neutral-300 dark:border-neutral-800 flex items-center">
                    <h2 class="font-bold text-lg">{{ $t('_avatarDecorationPreview.settings') }}</h2>
                    <div class="ml-auto">
                        <button class="btn btn-primary" @click="addDecoration"><PlusIco class="mr-1" />{{ $t('add') }}</button>
                    </div>
                </header>

                <TransitionGroup v-if="decorations.length > 0" name="decorationList" tag="div">
                    <div v-for="decoration, index in decorations" :key="decoration.id" class="mt-8 p-4 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800">
                        <h3 class="-mt-7 font-bold flex items-center w-fit px-3 bg-white dark:bg-neutral-950 mb-4">
                            <div class="btn-group mr-2" role="group" aria-label="Basic outlined example">
                                <button type="button" @click="downDecorationOrder(index, decorations)"  :disabled="(index + 1) === decorations.length" class="btn btn-sm btn-outline-primary"><ChevronDownIco class="h-3.5 w-3.5 stroke-1 stroke-current" /></button>
                                <button type="button" @click="upDecorationOrder(index, decorations)" :disabled="index === 0" class="btn btn-sm btn-outline-primary"><ChevronUpIco class="h-3.5 w-3.5 stroke-1 stroke-current" /></button>
                            </div>
                            <button type="button" class="btn btn-sm btn-outline-danger mr-2" @click="deleteDecoration(index)"><XIco class="h-3.5 w-3.5 stroke-1 stroke-current" /></button>
                            <div>{{ $t('_avatarDecorationPreview.decoration', { number: (index + 1) }) }}</div>
                        </h3>
                        <div class="md:flex items-center justify-center space-y-4 md:space-y-0">
                            <div class="w-full md:w-auto md:ml-8 md:order-2 border-neutral-300 dark:border-neutral-800 p-10 md:p-16 rounded-lg">
                                <div class="w-24 h-24 mx-auto relative rounded-full bg-neutral-50 dark:bg-neutral-900">
                                    <img class="w-full h-full object-cover rounded-full" :src="avatar" />
                                    <img
                                        :src="decoration.url"
                                        class="absolute block min-w-[200%] w-[200%] -top-1/2 -left-1/2 select-none pointer-events-none"
                                        :style="getStyle(decoration)"
                                    />
                                    <img
                                        src="/img/misc/avatar-decoration-template.png"
                                        v-if="decoration.overlayTemplate"
                                        class="absolute block min-w-[200%] w-[200%] -top-1/2 -left-1/2 select-none pointer-events-none mix-blend-multiply opacity-70"
                                    />
                                </div>
                            </div>
                            <div class="md:order-1 w-full mx-auto md:mx-0 max-w-md space-y-4">
                                <div class="md:flex items-center md:space-x-4 space-y-2 md:space-y-0">
                                    <div class="flex-shrink-0 text-sm w-20">{{ $t('_avatarDecorationPreview._options.offsetY') }}</div>
                                    <div class="flex-grow flex items-center space-x-2 md:space-x-4">
                                        <input class="flex-grow form-range" type="range"  min="-0.25" max="0.25" step="0.025" v-model="decoration.offsetY" />
                                        <div class="flex-shrink-0 text-sm text-end -ml-4 w-14">{{ Math.floor((decoration.offsetY ?? 0) * 100) }} %</div>
                                    </div>
                                </div>
                                <div class="md:flex items-center md:space-x-4 space-y-2 md:space-y-0">
                                    <div class="flex-shrink-0 text-sm w-20">{{ $t('_avatarDecorationPreview._options.offsetX') }}</div>
                                    <div class="flex-grow flex items-center space-x-2 md:space-x-4">
                                        <input class="flex-grow form-range" type="range" min="-0.25" max="0.25" step="0.025" v-model="decoration.offsetX" />
                                        <div class="flex-shrink-0 text-sm text-end -ml-4 w-14">{{ Math.floor((decoration.offsetX ?? 0) * 100) }} %</div>
                                    </div>
                                </div>
                                <div class="md:flex items-center md:space-x-4 space-y-2 md:space-y-0">
                                    <div class="flex-shrink-0 text-sm w-20">{{ $t('_avatarDecorationPreview._options.angle') }}</div>
                                    <div class="flex-grow flex items-center space-x-2 md:space-x-4">
                                        <input class="flex-grow form-range" type="range" min="-0.5" max="0.5" step="0.025" v-model="decoration.angle" />
                                        <div class="flex-shrink-0 text-sm text-end -ml-4 w-14">{{ Math.floor((decoration.angle ?? 0) * 360) }} °</div>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0 text-sm w-20 hidden md:block"></div>
                                    <div class="flex-grow">
                                        <div class="pb-1.5 w-full form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" :id="`flipHSwitch_${index}`" v-model="decoration.flipH">
                                            <label class="form-check-label" :for="`flipHSwitch_${index}`">{{ $t('_avatarDecorationPreview._options.flip') }}</label>
                                        </div>
                                        <div class="pt-1.5 w-full border-t border-neutral-300 dark:border-neutral-800 form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" :id="`overlayTemplate_${index}`" v-model="decoration.overlayTemplate">
                                            <label class="form-check-label" :for="`overlayTemplate_${index}`">{{ $t('_avatarDecorationPreview._options.overlayTemplate') }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
                <div v-else class="p-6 text-center">
                    <h2 class="font-bold text-lg">{{ $t('_avatarDecorationPreview.placeholder') }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import type * as Misskey from 'misskey-js';
import type { StyleValue } from 'vue';
import PlusIco from 'bi/plus-lg.svg';
import ChevronUpIco from 'bi/chevron-up.svg';
import ChevronDownIco from 'bi/chevron-down.svg';
import XIco from 'bi/x-lg.svg';

definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const route = useRoute();

const avatar = ref('/img/docs/fukidashi/doya_ai.webp');
const decorations = ref<(Misskey.entities.User['avatarDecorations'][number] & { overlayTemplate?: boolean; })[]>([
]);

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

function deleteDecoration(index: number) {
    decorations.value.splice(index, 1);
}

function upDecorationOrder(index: number, array: any[]) {
    decorations.value.splice(index - 1, 2, array[index], array[index - 1]);
}

function downDecorationOrder(index: number, array: any[]) {
    decorations.value.splice(index, 2, array[index + 1], array[index]);
}

const realDecorations = computed(() => {
    const g = [...decorations.value];
    return g.reverse();
});

function addDecoration() {
    if (!import.meta.client) return;

    function createImage(file: Blob, callback: () => void) {
        const reader = new FileReader();
        reader.addEventListener('load', (e) => {
            if (!e.target?.result) return;

            decorations.value.unshift({
                id: decorations.value.length.toString(),
                url: e.target.result as string,
            });

            callback();
        });
        reader.readAsDataURL(file);
    }

    const el = document.createElement('input');
    el.type = 'file';
    el.accept = 'image/*';
    el.addEventListener('change', (ev: { target: any; }) => {
        const target = ev.target;
        if (target && target.files) {
            createImage(target.files[0], () => {
                el.remove();
            });
        }
    });
    el.click(); 
}

route.meta.title = t('_avatarDecorationPreview.title');
route.meta.description = t('_avatarDecorationPreview.description');
</script>

<style scoped>
.decorationList-move, /* 移動する要素にトランジションを適用 */
.decorationList-enter-active,
.decorationList-leave-active {
  transition: all 0.5s ease;
}
</style>
