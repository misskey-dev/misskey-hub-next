<template>
    <svg viewBox="0 0 500 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;">
        <g id="レイヤー-1" serif:id="レイヤー 1" transform="matrix(1,0,0,1,0,-822.52)">
            <g id="path4487" transform="matrix(0.678544,0,0,0.678544,75.2996,401.189)">
                <path :class="[$style.paths, $style.main]" d="M301.271,941.862L308.01,937.525M126.688,1005.21C108.505,987.528 77.382,989.437 73.654,1007.73C68.898,1031.08 106.782,1040.24 128.203,1028.44C151.103,1015.83 224.341,907.088 253.967,916.312C279.544,924.276 236.794,1023.39 236.794,1023.39C236.794,1023.39 168.043,929.904 134.769,960.759C106.99,986.518 194.368,1029.45 236.794,1023.39C273.16,1023.89 296.898,958.738 296.898,958.738C296.898,958.738 278.21,1011.77 317.606,1013.79C357.002,1015.81 438.783,962.575 414.581,947.627C397.408,937.02 363.568,967.83 363.568,967.83C363.568,967.83 372.487,922.311 347.911,938.03C329.301,949.934 335.79,1000.18 365.589,1003.69C382.835,1010.45 409.126,1007.16 428.246,998.581C499.435,966.651 498.47,810.412 419.575,760.939L390.1,694.621L353.257,746.202C309.563,725.858 244.295,720.675 204.409,740.307L183.776,672.514L139.564,746.202C51.735,803.663 56.171,883.374 95.352,930.419" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:14px;"/>
            </g>
            <g id="path44871" serif:id="path4487" transform="matrix(0.678544,0,0,0.678544,72.5861,413.246)">
                <path :class="[$style.paths, $style.eye1]" d="M199.143,802.119L205.882,768.308" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:14px;"/>
            </g>
            <g id="path44872" serif:id="path4487" transform="matrix(0.678544,0,0,0.678544,147.586,414.717)">
                <path :class="[$style.paths, $style.eye2]" d="M202.513,807.32L205.882,768.308" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:14px;"/>
            </g>
            <g id="path44873" serif:id="path4487" transform="matrix(0.678544,0,0,0.678544,77.5861,398.246)">
                <path :class="[$style.paths, $style.mouth]" d="M268.831,846.331L246.725,868.437L231.988,846.331" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:14px;"/>
            </g>
        </g>
    </svg>
</template>

<script setup lang="ts">

</script>

<style module>
.paths {
    transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
    transition-property: stroke-dashoffset;
}

.main {
    stroke-dasharray: 2173px;
    stroke-dashoffset: 2173px;
    transition-duration: 1.5s;
}

.eye1 {
    stroke-dasharray: 35px;
    stroke-dashoffset: 35px;
    transition-duration: .2s;
    transition-delay: 1.45s;
}

.eye2 {
    stroke-dasharray: 40px;
    stroke-dashoffset: 40px;
    transition-duration: .2s;
    transition-delay: 1.65s;
}

.mouth {
    stroke-dasharray: 58px;
    stroke-dashoffset: 58px;
    transition-duration: .4s;
    transition-delay: 1.85s;
}

:global(.active) .main,
:global(.active) .eye1,
:global(.active) .eye2,
:global(.active) .mouth {
    stroke-dashoffset: 0;
}
</style>