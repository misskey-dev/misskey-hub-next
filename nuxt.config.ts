// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml';
import svgLoader from 'vite-svg-loader';
import genSitemap from './scripts/gen-sitemap';
import { resolve } from 'path';

// 公開時のドメイン（末尾スラッシュなし）
const baseUrl = 'https://misskey-hub.net';

const locales = [
	{ code: 'ja', iso: 'ja-JP', name: '日本語' },
	{ code: 'en', iso: 'en-US', name: 'English' },
	{ code: 'ko', iso: 'ko-KR', name: '한국어' },
	{ code: 'it', iso: 'it-IT', name: 'Italiano' },
	{ code: 'pl', iso: 'pl-PL', name: 'Polski' },
	{ code: 'fr', iso: 'fr-FR', name: 'Français' },
];

export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			baseUrl,
		}
	},
	css: [
		"@/assets/css/mfm.scss",
		"github-markdown-css/github-markdown.css",
		"@/assets/css/tailwind.css",
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
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Capriola&family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap' },
				{ rel: 'stylesheet', href: '/fonts/fonts.css' },
			],
		},
	},
	content: {
		navigation: {
			fields: [
				'date',
				'description',
			]
		}
	},
	i18n: {
		baseUrl,
		vueI18n: './i18n.config.ts',
		locales,
		defaultLocale: 'ja',
		strategy: 'prefix',
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
			ViteYaml(),
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
		]
	},
	nitro: {
		hooks: {
			'compiled': genSitemap,
		},
		prerender: {
			routes: [
				"/404.html"
			],
			// 【一時対応】とりあえずビルドできるようにする
			failOnError: false,
		},
		plugins: [
			'@/server/plugins/appendComment.ts',
		],
	},
	experimental: {
		inlineSSRStyles: false,
	},
})
