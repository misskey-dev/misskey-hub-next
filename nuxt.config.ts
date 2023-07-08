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
	],
	app: {
		head: {
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' },
				{ rel: 'stylesheet', href: '/fonts/fonts.css' },
			],
		},
	},
	i18n: {
		vueI18n: './i18n.config.ts',
		locales: [
			{ code: 'ja', iso: 'ja-JP' },
			{ code: 'en', iso: 'en-US' },
		],
		defaultLocale: 'ja',
		strategy: 'prefix',
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
