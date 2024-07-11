<template>
    <div class="absolute z-0 top-0 left-0 w-full h-full overflow-hidden">
		<div class="bg1 absolute -z-10 invisible h-[200vh]"></div>
		<div class="blobs object1"><Blob1 aria-hidden="true" /></div>
		<div class="blobs object2"><Blob2 aria-hidden="true" /></div>
		<div class="blobs object3"><Blob2 aria-hidden="true" /></div>
    </div>
</template>

<script setup lang="ts">
import Blob1 from '@/assets/svg/top-bg-object1.svg';
import Blob2 from '@/assets/svg/top-bg-object2.svg';

</script>

<style scoped>
.blobs {
	@apply absolute select-none pointer-events-none;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 6;
}

.blobs > svg {
	@apply w-full;
}

.object1 {
	top: 2500px;
	left: -300px;
	width: 1000px;
	opacity: .5;
}

@screen lg {
	.object1 {
		left: auto;
		right: -300px;
		top: -400px;
		width: 1000px;
		opacity: 1;
	}
}

.object1 > svg {
	animation: 60s linear 0s infinite normal none running spin;
}

.object2 {
	left: -250px;
	top: 500px;
	width: 1000px;
	opacity: .5;
}

.object2 > svg {
	animation: 80s linear 0s infinite reverse none running spin;
}

.object3 {
	right: -300px;
	top: 1400px;
	width: 1000px;
	opacity: .5;
}

.object3 > svg {
	animation: 80s linear 0s infinite normal none running spin;
}

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

@keyframes parallax {
	from { transform: translateY(0); }
	to { transform: translateY(calc(var(--coefficient-parallax) * 100vh)); }
}

@screen lg {
	@keyframes parallax {
		from { transform: translateY(0); }
		to { transform: translateY(calc(var(--coefficient-parallax) * 66vh)); }
	}
}
</style>
