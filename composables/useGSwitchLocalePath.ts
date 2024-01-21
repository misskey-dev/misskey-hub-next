import {
    useSwitchLocalePath as _useSwitchLocalePath,
    getComposer,
} from 'vue-i18n-routing';

/** useSwitchLocalePathのラッパー関数。 */
export function useGSwitchLocalePath(
    options?: NonNullable<Parameters<typeof _useSwitchLocalePath>[0]>
): ReturnType<typeof _useSwitchLocalePath> {
    const { route, router, i18n, strategy } = options || {}
    return _useSwitchLocalePath({
        route: route || useRoute(),
        router: router || useRouter(),
        i18n: i18n || getComposer(useNuxtApp().$i18n),
        strategy: strategy ?? 'prefix', // ←リンクではprefixつきにする
    });
}