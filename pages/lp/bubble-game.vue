<template>
    <div class="relative min-h-full bg-white">
        <GNav :fixed="true" />
        <div class="relative min-h-screen pt-16 lg:pt-20" :class="$style.kvRoot">
            <div class="mx-auto pt-6"><BubbleGameLPMoji1 class="max-w-lg px-6 w-full h-auto mx-auto" /></div>

            <div class="absolute bottom-[10vh] w-full">
                <BubbleGameLPCloud class="w-full h-auto" :class="$style.cloud" />
                <div class="h-24 bg-[#e0fbff]"></div>
                <div class="absolute bottom-0 w-full">
                    <img src="/img/misc/drop-and-fusion/logo.png" class="max-w-xl px-6 w-full mx-auto" />
                </div>
            </div>
        </div>
        <div class="relative -mt-[10vh] bg-[#e0fbff] min-h-screen">

        </div>
        <GFooter />
    </div>
</template>

<script setup lang="ts">
import BubbleGameLPCloud from '@/assets/svg/drop-and-fusion/kv-wrap.svg';
import BubbleGameLPMoji1 from '@/assets/svg/drop-and-fusion/moji_1.svg';

defineI18nRoute({
    locales: ['ja'],
});

definePageMeta({
    layout: 'landing',
});
</script>

<style module>
.kvRoot {
    background-image: url('/img/misc/drop-and-fusion/kv-bg.svg');
    background-repeat: repeat;
    background-size: 100% auto;
}

@screen md {
    .kvRoot {
        background-size: 50% auto;
    }
}

@screen xl {
    .kvRoot {
        background-size: 25% auto;
    }
}

.cloud {
    filter: drop-shadow(0 -7.5px 5px rgba(0, 0, 0, 0.1));
}
</style>