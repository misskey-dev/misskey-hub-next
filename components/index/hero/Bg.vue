<template>
<div class="root">
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
.root {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
}

.blobs {
	position: absolute;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 6;
}

.blobs > svg {
	width: 100%;
}

.object1 {
	top: -500px;
  right: -200px;
	width: 1000px;
	opacity: 1;
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
	top: 300px;
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
	to { transform: translateY(calc(var(--coefficient-parallax) * 200px)); }
}

@screen lg {
	@keyframes parallax {
		from { transform: translateY(0); }
		to { transform: translateY(calc(var(--coefficient-parallax) * 200px)); }
	}
}
</style>
