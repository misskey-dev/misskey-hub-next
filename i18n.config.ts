import ja from '@/locales/ja-JP.yml';
import en from '@/locales/en-US.yml';

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'ja',
	messages: {
		ja,
		en,
	},
	datetimeFormats: {
		'en-US': {
			short: {
				year: 'numeric', month: 'short', day: 'numeric'
			},
			long: {
				year: 'numeric', month: 'short', day: 'numeric',
				weekday: 'short', hour: 'numeric', minute: 'numeric'
			}
		},
		'ja-JP': {
			short: {
				year: 'numeric', month: 'short', day: 'numeric'
			},
			long: {
				year: 'numeric', month: 'short', day: 'numeric',
				weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
			}
		}
	}
}));