<template>
<button class="btn btn-outline-primary" @click="copy">
    <CopyIco class="w-4 h-4" v-if="!copied" />
    <CheckIco class="w-4 h-4" v-else />
</button>
</template>

<script setup lang="ts">
import { copyText } from '@/assets/js/misc';
import CopyIco from 'bi/clipboard.svg';
import CheckIco from 'bi/check-lg.svg';

const props = defineProps<{
    text: string;
}>();

const copied = ref(false);

function copy() {
    copyText(props.text);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 3000);
}
</script>

<style scoped>

</style>