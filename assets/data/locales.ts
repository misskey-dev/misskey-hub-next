import type { LocaleObject } from '@nuxtjs/i18n';

export const localesConst = [
	{ files: [ 'ja-JP.json' ], code: 'ja', iso: 'ja-JP', name: '日本語' },
	{ files: [ 'en-US.json' ], code: 'en', iso: 'en-US', name: 'English' },
	{ files: [ 'id-ID.json' ], code: 'id', iso: 'id-ID', name: 'Bahasa Indonesia' },
	{ files: [ 'ko-KR.json' ], code: 'ko', iso: 'ko-KR', name: '한국어' },
	{ files: [ 'it-IT.json' ], code: 'it', iso: 'it-IT', name: 'Italiano' },
	{ files: [ 'pl-PL.json' ], code: 'pl', iso: 'pl-PL', name: 'Polski' },
	{ files: [ 'fr-FR.json' ], code: 'fr', iso: 'fr-FR', name: 'Français' },
	{ files: [ 'zh-CN.json' ], code: 'cn', iso: 'zh-CN', name: '简体中文' },
	{ files: [ 'zh-TW.json' ], code: 'tw', iso: 'zh-TW', name: '繁体中文' },
	{ files: [ 'ja-KS.json' ], code: 'ja-ks', iso: 'ja-KS', name: '🐙' },
] as const;

export type LocaleCodes = typeof localesConst[number]['code'];

export const locales = localesConst as unknown as LocaleObject[];
