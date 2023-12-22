// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from '@rollup/plugin-yaml';
import svgLoader from 'vite-svg-loader';
import { readFileSync } from 'fs';
import { genApiTranslationFiles } from './scripts/gen-api-translations';
import { getOldHubRedirects } from './scripts/get-old-hub-redirects';
import { genLocalesJson } from './scripts/gen-locales';
import { getStaticEndpoints } from './scripts/get-static-endpoints';
import { locales } from './assets/data/locales';
import type { NuxtConfig } from 'nuxt/schema';

// 公開時のドメイン（末尾スラッシュなし）
const baseUrl = 'https://misskey-hub.net';

// リポジトリURL（末尾スラッシュなし）
const repositoryUrl = 'https://github.com/misskey-dev/misskey-hub-next';

// 言語定義は /assets/data/locales.ts に移動しました

function getRouteRules(): NuxtConfig['routeRules'] {
	// 言語ごとに割り当てる必要のないRouteRules
	const staticRules: NuxtConfig['routeRules'] = {
		'/ja/blog/**': { isr: true },
		'/ns/': { prerender: true },
	};

	// それぞれの言語について割り当てる必要のあるRouteRules
	const localeBasedRules: NuxtConfig['routeRules'] = {
		// リリースページはどうせアクセス集中するので先に作っておく
		'/docs/releases/': { prerender: true },
		
		'/docs/**': { isr: true },
	};

	// 静的ページをすべて追加
	getStaticEndpoints().forEach((route) => {
		if (!route.includes('ns')) {
			localeBasedRules[route] = { prerender: true };
			staticRules[route] = { prerender: true };
		}
	});

	// 言語ごとにすべて割り当てていく
	const _localeBasedRules: NuxtConfig['routeRules'] = {};
	const localeCodes = locales.map((v) => v.code);
	Object.keys(localeBasedRules).forEach((route) => {
		localeCodes.forEach((code) => {
			_localeBasedRules[`/${code}${route}`] = localeBasedRules[route];
		});
	})

	return {
		...staticRules,
		..._localeBasedRules,
	};
}

export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			baseUrl,
			repositoryUrl,
			locales,
		}
	},
	css: [
		"github-markdown-css/github-markdown.css",
		"@/assets/css/nprogress.css",
		"@/assets/css/tailwind.css",
		"@/assets/css/mfm.scss",
		"@/assets/css/bootstrap-forms.scss",
	],
	modules: [
		'@nuxt/content',
		'@nuxtjs/i18n',
		'@nuxtjs/color-mode',
	],
	app: {
		head: {
			link: [
				{ rel: 'stylesheet', href: '/fonts/fonts.css' },
				{ rel: 'apple-touch-icon', href: '/img/icons/apple-touch-icon.png' },
				{ rel: 'shortcut icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
				{ rel: 'me', href: 'https://misskey.io/@misskey_hub_deploy' },
			],
			meta: [
				{ name: 'twitter:card', content: 'summary_large_image' },
			]
		},
	},
	content: {
		navigation: {
			fields: [
				'date',
				'description',
			]
		},
		highlight: {
			theme: {
				// Default theme (same as single string)
				default: 'github-light',
				// Theme used if `html.dark`
				dark: 'github-dark',
			},
			preload: [
				'ini', 'sql', 'yml', 'nginx', 'bash',
				JSON.parse(readFileSync('./node_modules/aiscript-vscode/aiscript/syntaxes/aiscript.tmLanguage.json', { encoding: 'utf-8' })),
			],
		},
	},
	i18n: {
		baseUrl,
		vueI18n: './i18n.config.ts',
		locales,
		lazy: true,
		langDir: 'locales_dist',
		defaultLocale: 'ja',
		// ▼ Defaultルートは、nitroプラグインでオーバーライドする
		strategy: 'prefix',
		trailingSlash: true,
	},
	colorMode: {
		classSuffix: '',
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	alias: {
		'bi': 'bootstrap-icons/icons',
	},
	vite: {
		plugins: [
			yaml(),
			svgLoader({
				defaultImport: 'component',
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									removeViewBox: false,
								}
							}
						}
					]
				}
			}),
		],
	},
	nitro: {
		preset: 'vercel',
		vercel: {
			config: {
				routes: [
					...getOldHubRedirects(),
				],
			}
		},
		plugins: [
			'@/server/plugins/appendComment.ts',
			'@/server/plugins/i18nRedirector.ts',
		],
	},
	hooks: {
		'build:before': (...args) => {
			genApiTranslationFiles(...args);
			genLocalesJson(...args);
		},
	},
	experimental: {
		inlineSSRStyles: false,
		componentIslands: true,
	},
	routeRules: getRouteRules(),
});
