<template>
    <div class='container mx-auto max-w-screen-xl px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t('_customEmojiPreview.title') }}
        </h1>

        <div class="space-y-8">
            <div class="p-6 space-y-4 rounded-lg bg-white dark:bg-slate-950">
                <header class="-mt-6 -mx-6 px-6 py-3 font-bold text-lg border-b border-slate-300 dark:border-slate-800">
                    {{ $t('_avatarDecorationPreview.preview') }}
                </header>
                <div class="flex gap-8 items-center justify-center flex-wrap">
                    <ToolsMocksMkNote
                        class="!max-w-xl"
                        :reactions="[{
                            name: '👍',
                            count: 1,
                        }]"
                    >
                        <MkMfm :text="text" />
                    </ToolsMocksMkNote>
                </div>
            </div>
            <div class="p-6 rounded-lg bg-white dark:bg-slate-950">
                <header class="-mt-6 -mx-6 px-6 py-3 border-b border-slate-300 dark:border-slate-800 flex items-center">
                    <h2 class="font-bold text-lg">{{ $t('_avatarDecorationPreview.settings') }}</h2>
                    <div class="ml-auto">
                        <button class="btn btn-primary"><FolderIco class="mr-1" />{{ $t('browse') }}</button>
                    </div>
                </header>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import FolderIco from 'bi/folder.svg';

definePageMeta({
    layout: 'tools',
});

const { t } = useI18n();
const route = useRoute();

const text = ref(t('_customEmojiPreview._placeholder.noteText'));

route.meta.title = t('_customEmojiPreview.title');
route.meta.description = t('_customEmojiPreview.description');
</script>

<style module>

</style>
