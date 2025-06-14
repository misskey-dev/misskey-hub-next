<template>
<GNuxtLink :class="$style.news" class="_plainLink">
	<b>NEWS:</b> New blog post "Lorem ipsum dolor sit amet, consectetur adipiscing elit" is published!
</GNuxtLink>
<div :class="$style.root">
	<div :class="$style.main">
		<div :class="[$style.bg, { [$style.slim]: slim, [$style.hasBorder]: hasBorder }]"></div>
		<nav :class="$style.container">
			<button :class="$style.menuButton" class="_plainButton" @click="navOpen = !navOpen">
				<XIcon v-if="navOpen" style="width: 24px; height: 24px;" />
				<MenuIcon v-else style="width: 24px; height: 24px;" />
			</button>
			<GNuxtLink class="_plainLink" :class="$style.misskey" :to="localePath('/')">
				<MiIcon style="width: 24px; height: 24px;"/>
				<b>Misskey</b>
			</GNuxtLink>
			<div :class="$style.navItems">
				<span v-for="item in NavData.center">
					<GNuxtLink class="_plainLink" :to="localePath(item.to)" @click.native="navOpen = !navOpen">
						<component v-if="'icon' in item" :is="item.icon"/>
						<template v-else>
							{{ $t(item.i18n) }}
						</template>
					</GNuxtLink>
				</span>
				<!--
				<span>
						<button 
								class="hover:opacity-80 disabled:opacity-70 relative before:absolute before:-z-10 before:-top-2 before:-left-2 before:w-9 before:h-9 before:rounded-full hover:before:bg-neutral-300 dark:hover:before:bg-neutral-600 h-5 w-5"
								@click="rotateColorMode()"
								:disabled="colorMode.forced"
								aria-label="Change Color Mode"
						>
								<ClientOnly>
										<SunIcon class="h-5 w-5" v-if="colorMode.preference === 'light' || (colorMode.forced && colorMode.value === 'light')" />
										<MoonIcon class="h-5 w-5" v-else-if="colorMode.preference === 'dark' || (colorMode.forced && colorMode.value === 'dark')" />
										<DisplayIcon class="h-5 w-5" v-else />
								</ClientOnly>
						</button>
						<div class="input-group">
								<span class="input-group-text !rounded-l-full"><I18nIcon class="h-5 w-5" /><span class="sr-only">{{ $t('_nav.switchLang') }}</span></span>
								<select class="form-select !rounded-r-full" v-model="spLocaleOption" @change="changeLocale()">
										<option v-for="locale in localesConst" :value="locale.code">{{ locale.name }}</option>
								</select>
						</div>
				</span>
				-->
			</div>
			<div :class="$style.right">
				<!--
				<button class="_plainButton" @click="navOpen = !navOpen">
					<XIcon v-if="navOpen" class="h-5 w-5" />
					<MenuIcon v-else class="h-5 w-5" />
				</button>
				-->
				<div style="display: flex; align-items: center; gap: 12px;">
					<div>
						<button class="_plainButton"
							:class="$style.rightButton"
							@click="rotateColorMode()"
							:disabled="colorMode.forced"
							aria-label="Change Color Mode"
						>
							<ClientOnly>
								<SunIcon style="width: 18px; height: 18px; display: block; margin: auto;" v-if="colorMode.preference === 'light' || (colorMode.forced && colorMode.value === 'light')" />
								<MoonIcon style="width: 18px; height: 18px; display: block; margin: auto;" v-else-if="colorMode.preference === 'dark' || (colorMode.forced && colorMode.value === 'dark')" />
								<DisplayIcon style="width: 18px; height: 18px; display: block; margin: auto;" v-else />
							</ClientOnly>
						</button>
					</div>
					<div>
						<button class="_plainButton" :class="$style.rightButton"><I18nIcon style="width: 18px; height: 18px; display: block; margin: auto;"/></button>
						<!--
						<div class="absolute top-6 right-0 hidden group-hover:block group-focus-within:block z-[9955]">
								<ul class="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg shadow-lg space-y-1">
										<li v-for="locale in localesConst">
												<GNuxtLink :to="switchLocalePath(locale.code)" :lang="locale.code" :class="['block _i18n whitespace-nowrap hover:text-accent-600 py-0.5', {'text-accent-600 font-bold': currentLocale === locale.code}]">
														<span v-if="currentLocale === locale.code"><DotIcon class="stroke-[3] stroke-current" /></span>{{ locale.name }}
												</GNuxtLink>
										</li>
								</ul>
						</div>
						-->
					</div>
					<div v-for="item in NavData.right" :class="['transition-colors']">
						<GNuxtLink :to="item.to" class="_plainLink" :class="$style.rightButton">
							<component v-if="'icon' in item" :is="item.icon" style="width: 18px; height: 18px; display: block; margin: auto;" />
							<template v-else>
								{{ $t(item.i18n) }}
							</template>
						</GNuxtLink>
					</div>
				</div>
			</div>
			<div :class="$style.spSpacer"></div>
		</nav>
	</div>
	<div :class="$style.mobileNav" v-if="navOpen">
		<GNuxtLink v-for="item in NavData.center" :class="$style.mobileNavItem" class="_plainLink" :to="localePath(item.to)" @click.native="navOpen = !navOpen">
			<component v-if="'icon' in item" :is="item.icon"/>
			<template v-else>
				{{ $t(item.i18n) }}
			</template>
		</GNuxtLink>
	</div>
</div>
</template>

<script setup lang="ts">
import MiIcon from '@/assets/svg/misskey_mi_bi.svg';
import I18nIcon from 'bi/translate.svg';
import SunIcon from 'bi/sun.svg';
import MoonIcon from 'bi/moon-stars.svg';
import DisplayIcon from 'bi/display.svg';
import MenuIcon from 'bi/list.svg';
import XIcon from 'bi/x.svg';
import DotIcon from 'bi/dot.svg';

import { sanitizeInternalPath } from '@/assets/js/misc';
import { withTrailingSlash, cleanDoubleSlashes } from 'ufo';

import NavData from '@/assets/data/nav';
import { localesConst } from '@/assets/data/locales';
import type { LocaleCodes } from '@/assets/data/locales';

const props = withDefaults(defineProps<{
    disableShadow?: boolean;
    slim?: boolean;
    hasBorder?: boolean;
    landing?: boolean;
    fixed?: boolean;
}>(), {
    disableShadow: false,
    slim: false,
    hasBorder: false,
    landing: false,
    fixed: false,
});

const navOpen = ref(false);

const { locale: currentLocale } = useI18n();
const route = useRoute();
const { push } = useRouter();
const currentPath = ref(route.path);

watch(() => route.path,(to) => {
    currentPath.value = to;
}, {
    immediate: true,
});

const switchLocalePath = useGSwitchLocalePath();
const localePath = useGLocalePath();
const spLocaleOption = ref(currentLocale.value as LocaleCodes);
function changeLocale() {
    const path = switchLocalePath(spLocaleOption.value);
    push(withTrailingSlash(cleanDoubleSlashes(sanitizeInternalPath(path)), true));
}

const colorMode = useColorMode();
function rotateColorMode() {
    const values = ['system', 'light', 'dark'];
    const index = values.indexOf(colorMode.preference);
    const next = (index + 1) % values.length;

    colorMode.preference = values[next];
}

const scrollPos = useState<number>('miHub_global_scrollPos');
</script>

<style module>
.root {
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 9999;
}

.news {
	display: block;
	background: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
	color: #000;
	padding: 6px 16px;
	font-size: 90%;
	text-align: center;
}

.mobileNav {
	background: #fffc;
	backdrop-filter: blur(12px);
}
:global(html.dark)  {
	.mobileNav {
		background: #2e2e2ecc;
	}
}

.mobileNavItem {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 12px 16px;
	color: #3c3c3c;
	font-size: 90%;
}
.mobileNavItem:not(:last-child) {
	border-bottom: solid 1px #0002;
}
:global(html.dark) {
	.mobileNavItem {
		color: #e5e5e5;
	}

	.mobileNavItem:not(:last-child) {
		border-bottom-color: #fff2;
	}
}

.main {
	--height: 65px;

	position: relative;
	height: var(--height);
	color: #3c3c3c;
}

:global(html.dark) {
	.main {
		color: #e5e5e5;
	}
}

@media (max-width: 1200px) {
	.main {
		--height: 58px;
	}
}

.bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	background: #fffc;
	backdrop-filter: blur(12px);
	height: var(--height);
	pointer-events: none;

	--shapeShift: 550px;
	mask-image: linear-gradient(#000, #000), url("/header-mask-r.svg"), url("/header-mask-l.svg");
	mask-repeat: no-repeat;
	mask-position: center center, calc(50dvw + var(--shapeShift)) -5px, calc(50dvw - (1000px + var(--shapeShift))) -5px;
	mask-size: 100% 100%, 1000px 100px, 1000px 100px;
	mask-composite: exclude;
}

.bg.slim {
	backdrop-filter: none;
	background: #fff;
	mask-image: none;
}

.bg.hasBorder {
	@apply border-b border-neutral-200 dark:border-neutral-700;
}

:global(html.dark)  {
	.bg {
		background: #2e2e2ecc;
	}

	.bg.slim {
		background: #2e2e2e;
	}
}

@media (max-width: 1500px) {
	.bg {
		mask-image: none;
	}
}

.container {
	position: relative;
	z-index: 1;
	width: calc(100% - 42px);
	max-width: 1150px;
	margin: 0 auto;
	height: 100%;
	display: flex;
	align-items: center;
	gap: 32px;
}

@media (max-width: 1200px) {
	.container {
		width: 100%;
	}
}

.menuButton {
	display: none;
}

@media (max-width: 1200px) {
	.menuButton {
		display: block;
		height: var(--height);
		width: var(--height);
	}
}

.spSpacer {
	display: none;
}

@media (max-width: 1200px) {
	.spSpacer {
		display: block;
		height: var(--height);
		width: var(--height);
	}
}

.misskey {
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
	white-space: nowrap;
	font-size: 110%;

	padding-right: 32px;
	border-right: solid 1px #0002;
}
:global(html.dark) {
	.misskey {
		border-right-color: #fff2;
	}
}

@media (max-width: 1200px) {
	.misskey {
		margin: 0 auto;
		padding-right: 0;
		border-right: none;
	}
}

.navItems {
	display: flex;
	flex-direction: row;
	gap: 32px;
	font-size: 90%;
}

@media (max-width: 1200px) {
	.navItems {
		display: none;
	}
}

.right {
	margin-left: auto;
}

@media (max-width: 1200px) {
	.right {
		display: none;
	}
}

.rightButton {
	display: block;
	width: 40px;
	height: 40px;
	place-content: center;
	text-align: center;
	background: #0001;
	border-radius: 999px;
}

:global(html.dark) {
	.rightButton {
		background: #fff2;
	}
}
</style>
