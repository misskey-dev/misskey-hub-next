<template>
<footer :class="$style.root">
	<span :class="$style.copyright">&copy; 2025 syuilo and Misskey Project</span>
</footer>
</template>

<script setup lang="ts">
import MiIcon from '@/assets/svg/misskey_mi_bi.svg';
import ExtIco from 'bi/box-arrow-up-right.svg';

const localePath = useGLocalePath();

const isUwu = useState('miHub_uwu');
const isAiChanMode = useState('miHub_aichan_mode');
</script>

<style module>
.root {

}

.copyright {
	display: block;
	text-align: center;
	padding: 32px 16px;
	font-size: 85%;
	opacity: 0.7;
}
</style>
