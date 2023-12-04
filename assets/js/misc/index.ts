import type { NavItem } from '@nuxt/content/dist/runtime/types';
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import { parseURL } from 'ufo';

/**
 * オブジェクトのパス文字列からオブジェクトの内部を参照
 * @param o オブジェクト
 * @param s パス
 * @returns パスの先にあるもの
 */
export function resolveObjPath(o: object, s: string): any {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

/**
 * URLがドメイン内部かどうかを判別
 * @param link 判別したいURL
 * @param base ローカルの基準となるドメイン
 */
export function isLocalPath(link: string, base?: string): boolean {
    let baseUrl;

    if (base) {
        baseUrl = base;
    } else {
        const runtimeConfig = useRuntimeConfig();
        baseUrl = runtimeConfig.public.baseUrl;
    }

    const rootDomain = parseURL(base);
    const url = parseURL(link);

    return (!url.host || rootDomain.host === url.host);
}

export function sanitizeInternalPath(path: string): string {
    const runtimeConfig = useRuntimeConfig();
    return path
        .replace(/^(\/((?!ja)[a-z]{2}))?\/blog\/(.+)/g, '/ja/blog/$3')
        .replace(new RegExp(`^(\/(${(runtimeConfig.public.locales as LocaleObject[]).map((l) => l.code).join('|')})\/?){2,}(.*)$`, 'g'), '$1$2');
}

/**
 * ナビゲーションObjectを合致する条件まで深掘り
 * @param obj ナビゲーションObject
 * @param condition 深掘りを停止する条件
 * @returns 深掘りしたナビゲーションObject
 */
export const findDeepObject = (obj: NavItem, condition: (v: NavItem) => boolean): NavItem | null => {
	if (condition(obj)) {
		return obj;
	}

	if (obj?.children && obj.children.length > 0) {
		for (let i = 0; i < obj.children.length; i++) {
			const result = findDeepObject(obj.children[i], condition);
			if (result) {
				return result;
			}
		}
	}

	return null;
};

/**
 * Clipboardに値をコピー(TODO: 文字列以外も対応)
 */
export function copyText(val: string) {
    if (!process.client) return;

	// 空div 生成
	const tmp = document.createElement('div');
	// 選択用のタグ生成
	const pre = document.createElement('pre');

	// 親要素のCSSで user-select: none だとコピーできないので書き換える
	pre.style.webkitUserSelect = 'auto';
	pre.style.userSelect = 'auto';

	tmp.appendChild(pre).textContent = val;

	// 要素を画面外へ
	const s = tmp.style;
	s.position = 'fixed';
	s.right = '200%';

	// body に追加
	document.body.appendChild(tmp);
	// 要素を選択
	document.getSelection()?.selectAllChildren(tmp);

	// クリップボードにコピー
	const result = document.execCommand('copy');

	// 要素削除
	document.body.removeChild(tmp);

	return result;
}