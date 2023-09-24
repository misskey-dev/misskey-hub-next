<template>
    <div class='container mx-auto max-w-screen-xl px-6 py-6'>
        <h1 class='text-2xl lg:text-3xl font-bold mb-4'>
            {{ $t(`_mfmPlayground.title`) }}
        </h1>
        <div class='rounded-lg grid grid-cols-2'>
            <div class="p-4" :class="$style.mfmRoot">
                <MkMfm :text="mfmText" :baseHost="mfmHost" />
            </div>
            <div class="p-4">
                <textarea
                :rows="(mfmText || '').split('\n').length >= 8 ? mfmText.split('\n').length + 2 : 10"
                    class="form-control"
                    v-model="mfmText"
                ></textarea>
                <input type="text" class="form-control" v-model="mfmHost" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
definePageMeta({
    layout: 'slim',
});

const mfmText = ref<string>();
const mfmHost = ref<string>('misskey.io');
</script>

<style module>
.mfmRoot {
    font-family: Hiragino Maru Gothic Pro,BIZ UDGothic,Roboto,HelveticaNeue,Arial,sans-serif;
    line-height: 1.35;
}

.mfmRoot img {
    display: inline;
}
</style>