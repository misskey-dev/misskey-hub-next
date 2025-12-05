<template>
    <div :class="$style.root">
        <input v-model="query" :class="$style.input" type="search" :placeholder="q">
        <button :class="$style.button" @click="search"><SearchIco /> 検索</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchIco from 'bi/search.svg';

const props = defineProps<{
    q: string;
}>();

const query = ref(props.q);

const search = () => {
    window.open(`https://www.google.com/search?q=${query.value}`, '_blank');
};
</script>

<style lang="scss" module>
.root {
    display: flex;
    margin: 8px 0;
}

.input {
    @apply border-neutral-200;
    flex-shrink: 1;
    padding: 10px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    border: solid 1px;
    border-radius: 4px 0 0 4px;
    -webkit-appearance: textfield;
}

.button {
    @apply border-neutral-200;
    flex-shrink: 0;
    margin: 0;
    padding: 0 16px;
    border: solid 1px;
    border-left: none;
    border-radius: 0 4px 4px 0;

    &:active {
        box-shadow: 0 2px 4px rgba(#000, 0.15) inset;
    }
}
</style>
