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
}

.object {
	position: absolute;
	/*will-change: transform;*/

	animation: parallax linear both;
  animation-timeline: view(y -50%);
	animation-range: cover;
}

@keyframes parallax {
  from { transform: translateY(-800px) }
  to { transform: translateY(800px) }
}

.object > svg {
	width: 100%;
}

.object1 {
	left: auto;
	right: -300px;
	top: -700px;
	width: 1000px;
	opacity: 1;
}

.object1 > svg {
	animation: 60s linear 0s infinite normal none running spin;
}

.object2 {
	left: -250px;
	top: 800px;
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
