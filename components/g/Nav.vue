<template>
<div :class="$style.root">
	<div :class="$style.bg"></div>
	<nav :class="$style.container">
		<GNuxtLink :to="localePath('/')" style="display: flex; align-items: center; gap: 8px;">
			<MiIcon/>
			<div><b>{{ $t('_seo.siteName') }}</b></div>
		</GNuxtLink>
		<div :class="$style.navItems">
			<span v-for="item in NavData.center">
				<GNuxtLink :to="localePath(item.to)" @click.native="navOpen = !navOpen">
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
				<button @click="navOpen = !navOpen">
						<XIcon v-if="navOpen" class="h-5 w-5" />
						<MenuIcon v-else class="h-5 w-5" />
				</button>
				<div>
						<div>
								<button 
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
						</div>
						<div class="relative group">
								<button class="hover:opacity-80"><I18nIcon :class="['h-5 w-5']" /><span class="sr-only">{{ $t('_nav.switchLang') }}</span></button>
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
						<div class="border-l"></div>
						<div v-for="item in NavData.right" :class="['transition-colors']">
								<GNuxtLink :to="item.to" class="hover:opacity-80">
										<component v-if="'icon' in item" :is="item.icon" class="h-5 w-5" />
										<template v-else>
												{{ $t(item.i18n) }}
										</template>
								</GNuxtLink>
						</div>
				</div>
		</div>
	</nav>
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
	--height: 65px;

	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 9999;
	height: var(--height);
	color: #3c3c3c;
}

:global(html.dark)  {
	.root {
		color: #e5e5e5;
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

:global(html.dark)  {
	.bg {
		background: #2e2e2ecc;
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
	max-width: 1150px;
	margin: 0 auto;
	height: 100%;
	display: flex;
	align-items: center;
	gap: 16px;
}

.navItems {
	display: flex;
	flex-direction: row;
	gap: 16px;
	font-size: 90%;
}

.right {
	margin-left: auto;
}
</style>
