// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml';
import svgLoader from 'vite-svg-loader';
import genSitemap from './scripts/gen-sitemap';

export default defineNuxtConfig({
	devtools: { enabled: true },
	css: [
		"@/assets/css/tailwind.css",
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
	i18n: {
		vueI18n: './i18n.config.ts',
		locales: [
			{ code: 'ja', iso: 'ja-JP', name: '日本語' },
			{ code: 'en', iso: 'en-US', name: 'English' },
			{ code: 'ko', iso: 'ko-KR', name: '한국어' },
			{ code: 'it', iso: 'it-IT', name: 'Italiano' },
			{ code: 'pl', iso: 'pl-PL', name: 'Polski' },
			{ code: 'fr', iso: 'fr-FR', name: 'Français' }
		],
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
			]
		},
		plugins: [
			'@/server/plugins/appendComment.ts',
		],
	}
})
