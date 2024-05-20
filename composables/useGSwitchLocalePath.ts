import type { LocaleCodes } from '@/assets/data/locales';
import { localesConst, localePathRegex } from "@/assets/data/locales";

/** useSwitchLocalePathのラッパー関数。 */
export function useGSwitchLocalePath() {
    const switchLocalePath = useSwitchLocalePath();

    return (locale: LocaleCodes) => {
        const _path = switchLocalePath(locale);
        return localePathRegex.test(_path) ? _path : `/${localesConst[0].code}${_path}`;
    }
}