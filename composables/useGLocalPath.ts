import type { LocaleCodes } from '@/assets/data/locales';
import { localesConst, localePathRegex } from "@/assets/data/locales";

/** useLocalePathのラッパー関数。 */
export function useGLocalePath() {
    const localePath = useLocalePath();

    return (path: string, locale?: LocaleCodes) => {
        const _path = localePath(path, locale);
        return localePathRegex.test(_path) ? _path : `/${localesConst[0].code}${_path}`;
    };
}
