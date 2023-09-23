<template>
    <div>
        <h2 class="mb-12 text-2xl lg:text-3xl text-center font-bold font-title">{{ $t('_landing._sponsors.title') }}</h2>
        <div class="mx-auto max-w-[240px] space-y-8 [&>*]:block">
            <!-- スポンサーを入れるときは、リンクとアイコンを適当に並べるだけでいい感じになります -->
            <GNuxtLink to="https://rss3.io/" target="_blank">
                <img src="/img/sponsors/rss3.svg" />
            </GNuxtLink>
            <GNuxtLink to="https://skeb.jp/" target="_blank">
                <img src="/img/sponsors/skeb.svg" />
            </GNuxtLink>
            <GNuxtLink to="https://www.dotchain.ltd/advirth" target="_blank">
                <img src="/img/sponsors/dcadvirth.png" />
            </GNuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>