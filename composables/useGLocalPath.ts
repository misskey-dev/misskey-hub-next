import type { LocaleCodes } from '@/assets/data/locales';
import { locales } from "@/assets/data/locales";

/** useLocalePathのラッパー関数。 */
export function useGLocalePath() {
    const localePath = useLocalePath();

    return (path: string, locale?: LocaleCodes) => {
        const _path = localePath(path, locale);
        return new RegExp(`^/(${locales.map((v) => v.code).join('|')})/`).test(_path) ? _path : `/${locales[0].code}${_path}`;
    };
}