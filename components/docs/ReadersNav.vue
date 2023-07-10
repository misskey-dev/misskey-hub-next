<template>
    <section>
        <h2 class="text-2xl lg:text-3xl font-bold mb-4">{{ $t(`_docs._${sectionId}.title`) }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="n of 6" class="border rounded-lg p-4">
                <h3 class="font-bold text-lg mb-2">大カテゴリタイトル<ArrowRightIco class="ml-1.5" /></h3>
                <p class="text-sm opacity-80">カテゴリ説明文</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import ArrowRightIco from 'bi/arrow-right.svg';

defineProps<{
    sectionId: 'forUsers' | 'forAdmin' | 'forDevelopers';
}>();

</script>

<style scoped>

</style>