<template>
    <div class='container mx-auto max-w-(--breakpoint-xl) px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_customEmojiPreview.title') }}
        </h1>

        <div class="space-y-8">
            <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-slate-950">
                <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b border-slate-300 dark:border-slate-800">
                    {{ $t('_customEmojiPreview.preview') }}
                </header>
                <div class="flex gap-8 items-center justify-center flex-wrap">
                    <ToolsMocksMkNote
                        class="max-w-xl!"
                        :reactions="[{
                            name: '👍',
                            count: 1,
                        }, ...noteReactions]"
                    >
                        <MkMfm :text="text" :customEmojis="customEmojisDefinition" />
                    </ToolsMocksMkNote>
                </div>
            </div>
            <div class="grid md:grid-cols-5 gap-8">
                <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-slate-950 order-1 md:col-span-2 md:order-2">
                    <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b border-slate-300 dark:border-slate-800">
                        {{ $t('_customEmojiPreview._options.text') }}
                    </header>
                    <div>
                        <label for="customEmojiPreviewText">{{ $t('_customEmojiPreview._options.text') }}</label>
                        <textarea
                            class="form-control"
                            id="customEmojiPreviewText"
                            rows="10"
                            v-model="text"
                        ></textarea>
                    </div>
                </div>
                <div class="p-6 rounded-lg bg-white dark:bg-slate-950 order-2 md:col-span-3 md:order-1">
                    <header class="-mt-6 -mx-6 px-6 py-3 border-b border-slate-300 dark:border-slate-800 flex items-center">
                        <h2 class="font-bold text-lg">{{ $t('settings') }}</h2>
                        <div class="ml-auto">
                            <button class="btn btn-primary" @click="addEmoji()"><PlusIco class="mr-1" />{{ $t('add') }}</button>
                        </div>
                    </header>
                    <div v-if="emojis.length === 0" class="p-8 text-center font-bold text-lg">
                        {{ $t('_customEmojiPreview.placeholder') }}
                    </div>
                    <div v-for="emoji, index in emojis" :key="emoji.id" class="mt-8 p-4 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800">
                        <h3 class="-mt-7 font-bold flex items-center w-fit px-3 bg-white dark:bg-slate-950 mb-4">
                            <button type="button" class="btn btn-sm btn-outline-danger mr-2" @click="deleteEmoji(index)"><XIco class="h-3.5 w-3.5 stroke-1 stroke-current" /></button>
                            <div>{{ $t('_customEmojiPreview.emoji', { number: emoji.id }) }}</div>
                        </h3>
                        <div class="lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-4">
                            <div class="mx-auto lg:mx-0 w-fit space-y-2 shrink-0">
                                <div
                                    class="h-16 p-2 rounded-lg max-w-[200px] transition-colors"
                                    :class="emoji.invertColorScheme ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-200 dark:bg-slate-800'"
                                >
                                    <img class="h-full w-full object-contain" :src="getEmojiUrl(emoji)" />
                                </div>
                                <div class="w-min mx-auto form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" :id="`invertColorSchemeSwitch_${emoji.id}`" v-model="emojis[index].invertColorScheme">
                                    <label v-if="colorMode.value === 'dark'" class="form-check-label" :for="`invertColorSchemeSwitch_${emoji.id}`"><SunIco /></label>
                                    <label v-else class="form-check-label" :for="`invertColorSchemeSwitch_${emoji.id}`"><MoonIco /></label>
                                </div>
                            </div>
                            <I18nT scope="global" keypath="_customEmojiPreview._options.textDescription" tag="div">
                                <template #emoji_id>
                                    <code class="inline-block text-sm bg-slate-200 dark:bg-slate-800 mx-0.5 p-0.5 rounded-sm">{{ noteReactions[index].name }}</code>
                                </template>
                            </I18nT>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import PlusIco from 'bi/plus-lg.svg';
import XIco from 'bi/x-lg.svg';
import SunIco from 'bi/sun.svg';
import MoonIco from 'bi/moon.svg';

definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const route = useRoute();
const colorMode = useColorMode();

const text = ref(t('_customEmojiPreview._placeholder.noteText'));

const emojis = ref<{
    id: number;
    file: string | Blob;
    invertColorScheme: boolean;
}[]>([{
    id: 1,
    file: '/img/emojis/rocket_3d.png',
    invertColorScheme: false,
}]);

const noteReactions = computed(() => emojis.value?.map((emoji) => ({
    name: `:emoji_preview_${emoji.id}:`,
    code: `emoji_preview_${emoji.id}`,
    url: (typeof emoji.file !== 'string') ? URL.createObjectURL(emoji.file) : emoji.file,
    count: 1,
})) ?? []);

const customEmojisDefinition = computed(() => Object.fromEntries(noteReactions.value?.map((emoji) => [ emoji.code, emoji.url ]) ?? []));

const nextId = computed(() => Math.max(0, ...emojis.value.map((emoji) => emoji.id)) + 1);

function deleteEmoji(index: number) {
    emojis.value.splice(index, 1);
}

function getEmojiUrl(emoji: { id: number; file: string | Blob; }) {
    return (typeof emoji.file !== 'string') ? URL.createObjectURL(emoji.file) : emoji.file;
}

function addEmoji() {
    if (!import.meta.client) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        emojis.value.push({
            id: nextId.value,
            file,
            invertColorScheme: false,
        });

        input.remove();
    });

    input.click();
}

onBeforeUnmount(() => {
    for (const emoji of noteReactions.value) {
        if (emoji.url.startsWith('blob:')) {
            URL.revokeObjectURL(emoji.url);
        }
    }
    emojis.value = [];
});

route.meta.title = t('_customEmojiPreview.title');
route.meta.description = t('_customEmojiPreview.description');
</script>

<style module>

</style>
