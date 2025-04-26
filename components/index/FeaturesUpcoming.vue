<template>
    <div class="grid featuresUpcoming gap-12">
        <div class="space-y-8 lg:pt-24">
			<div v-fade-in class="item"><div class="content">
				<h3 class="title">{{ $t('_landing._featuresUpcoming._jwt.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresUpcoming._jwt.description') }}</div>
			</div></div>
		</div>
		<div class="space-y-8">
			<div v-fade-in class="item"><div class="content">
				<h3 class="title">{{ $t('_landing._featuresUpcoming._newBackend.title') }}</h3>
				<div class="description">{{ $t('_landing._featuresUpcoming._newBackend.description') }}</div>
			</div></div>
        </div>
				<div>
            <div class="lg:sticky lg:top-32" style="text-align: right;">
                <h2 class="font-title font-bold text-2xl lg:text-4xl mb-2 lg:mb-6">{{ $t('_landing._featuresUpcoming._root.title') }}</h2>
                <p class="text-lg">{{ $t('_landing._featuresUpcoming._root.description') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vFadeIn } from '@/assets/js/fadein';
</script>

<style scoped>
.featuresUpcoming {
	grid-template-columns: 1fr;
}

@screen lg {
	.featuresUpcoming {
		grid-template-columns: repeat(2, 1fr) 300px;
	}
}

.item > .content {
    @apply p-5 bg-white dark:bg-slate-800 rounded-xl;
}

.item .img {
    @apply w-full aspect-[2/1] object-cover rounded-lg mb-4;
}

.item .title {
    @apply font-title text-xl lg:text-2xl font-bold mb-2;
}

.__v_fadeIn_out > * {
	opacity: 0;
	transform: scale(0.9) translateY(-50px);
}

.__v_fadeIn_in > * {
	opacity: 1;
	transform: scale(1) translateY(0);
}

</style>
