<template>
    <div class="absolute z-0 top-0 left-0 w-full h-full overflow-hidden">
		<div v-parallax="1.2" class="blobs object1"><Blob1 aria-hidden="true" /></div>
		<div v-parallax="1.2" class="blobs object2"><Blob2 aria-hidden="true" /></div>
		<div v-parallax="1.2" class="blobs object3"><Blob2 aria-hidden="true" /></div>
    </div>
</template>

<script setup lang="ts">
import { vParallax } from '@/assets/js/parallax';

import Blob1 from '@/assets/svg/top-bg-object1.svg';
import Blob2 from '@/assets/svg/top-bg-object2.svg';

</script>

<style scoped>
.blobs {
	@apply absolute select-none pointer-events-none;
}

.blobs > svg {
	@apply w-full;
}

.object1 {
	right: -300px;
	top: -400px;
	width: 1000px;
}

.object1 > svg {
	@apply invisible lg:visible;
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
</style>
assets/js/paralax