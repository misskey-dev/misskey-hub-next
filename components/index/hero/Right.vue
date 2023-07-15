<template>
    <div class="absolute top-0 w-full hidden lg:block">
		<GDots v-parallax="1.4" class="dots dots1" :space="30"/>
		<GDots v-parallax="1.5" class="dots dots2" :space="30"/>
		<img v-parallax="2" src="/img/hero/screenshot-desktop.png" class="screenshot desktop" alt="screenshot of Misskey in a PC browser">
		<img v-parallax="3" src="/img/hero/screenshot-mobile.png" class="screenshot mobile" alt="screenshot of Misskey in a mobile browser">
		<img v-parallax="4" src="/img/hero/ai.png" class="ai" alt="Ai-chan, Misskey's mascott">
    </div>
</template>

<script setup lang="ts">
import { vParallax } from '@/assets/js/parallax';
</script>

<style scoped>
.dots {
    @apply absolute text-accent-600 pointer-events-none select-none w-[300px] h-[300px];
}

.dots1 {
    right: 900px;
    top: 200px;
}

.dots2 {
    right: 120px;
    top: 500px;
}

.screenshot {
    @apply absolute rounded-lg shadow-lg select-none pointer-events-none;
}

.screenshot.mobile {
    right: 650px;
    top: 400px;
    height: 400px;
}

.screenshot.desktop {
    width: 750px;
    top: 128px;
    right: 300px;
}

.ai {
    @apply absolute select-none pointer-events-none;
    right: 130px;
    top: 128px;
    height: 900px;
}

@media (max-width: 1800px) {
    .dots1 {
        right:800px
    }

    .screenshot.desktop {
        width: 700px
    }
}

@media (max-width: 1700px) {
    .dots1 {
        right:700px
    }

    .screenshot.desktop {
        width: 600px
    }

    .screenshot.mobile {
        height: 350px;
        right: 500px
    }
}

@media (max-width: 1600px) {
    .dots1 {
        right:600px
    }

    .screenshot.desktop {
        width: 500px
    }

    .screenshot.mobile {
        height: 300px
    }
}

@media (max-width: 1500px) {
    .dots1 {
        right:600px
    }

    .screenshot.desktop {
        right: 250px
    }

    .screenshot.mobile {
        right: 450px
    }
}
</style>
