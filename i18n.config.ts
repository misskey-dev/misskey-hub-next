export default defineI18nConfig(() => ({
	legacy: false,
	fallbackLocale: ['en', 'ja'],
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