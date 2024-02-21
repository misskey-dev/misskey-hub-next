import type { LocaleCodes } from '@/assets/data/locales';
import { locales } from "@/assets/data/locales";

/** useSwitchLocalePathのラッパー関数。 */
export function useGSwitchLocalePath() {
    const switchLocalePath = useSwitchLocalePath();

    return (locale: LocaleCodes) => {
        const _path = switchLocalePath(locale);
        return new RegExp(`^/(${locales.map((v) => v.code).join('|')})/`).test(_path) ? _path : `/${locales[0].code}${_path}`;
    }
}