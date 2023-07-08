import ja from '@/locales/ja-JP.yml';
import en from '@/locales/en-US.yml';

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'ja',
	messages: {
		ja,
		en,
	}
}));