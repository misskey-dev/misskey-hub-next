<template>
    <div class="absolute top-0 w-full hidden lg:block">
		<GDots class="dots dots1" :space="30"/>
		<GDots class="dots dots2" :space="30"/>
		<img :src="screenshots.desktop" class="screenshot desktop" alt="screenshot of Misskey in a PC browser">
		<img :src="screenshots.mobile" class="screenshot mobile" alt="screenshot of Misskey in a mobile browser">
		<img src="/img/hero/ai.png" class="ai" alt="Ai-chan, Misskey's mascott">
    </div>
</template>

<script setup>
const colorMode = useColorMode();
const { locale, fallbackLocale } = useI18n();
const screenshots = computed(() => {
	let heroLocale = (locale) ? locale.value : fallbackLocale.value;
    if (colorMode.value === 'dark') {
        return {
            desktop: '/img/hero/' + heroLocale + '/misskey-dark.png',
            mobile: '/img/hero/' + heroLocale + '/misskey-mobile-dark.png',
        };
    } else {
        return {
            desktop: '/img/hero/' + heroLocale + '/misskey-light.png',
            mobile: '/img/hero/' + heroLocale + '/misskey-mobile-light.png',
        };
    }
});
</script>

<style scoped>
.dots {
    @apply absolute text-accent-600 pointer-events-none select-none w-[300px] h-[300px];
}

.dots1 {
    right: 900px;
    top: 200px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 3;
}

.dots2 {
    right: 120px;
    top: 500px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 4.5;
}

.screenshot {
    @apply absolute rounded-lg shadow-lg select-none pointer-events-none;
}

.screenshot.mobile {
    right: 650px;
    top: 400px;
    height: 400px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 3.5;
}

.screenshot.desktop {
    width: 750px;
    top: 128px;
    right: 300px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 3.25;
}

.ai {
    @apply absolute select-none pointer-events-none;
    right: 130px;
    top: 128px;
    height: 900px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 4;
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

@keyframes parallax {
	from { transform: translateY(0); }
	to { transform: translateY(calc(var(--coefficient-parallax) * 66vh)); }
}
</style>
