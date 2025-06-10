<template>
<div class="root">
	<div class="object object1"><Blob1 aria-hidden="true" /></div>
	<div class="object object2"><Blob2 aria-hidden="true" /></div>
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
	view-timeline-name: --parallax;
	view-timeline-axis: block;
}

.object {
	position: absolute;
	/*will-change: transform;*/

	animation: parallax linear both;
	animation-timeline: --parallax;
	animation-range: cover;
}

@keyframes parallax {
	from { transform: translateY(-400px) }
	to { transform: translateY(400px) }
}

.object > svg {
	width: 100%;
}

.object1 {
	left: auto;
	right: -300px;
	top: -500px;
	width: 1000px;
	opacity: 1;
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

@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
