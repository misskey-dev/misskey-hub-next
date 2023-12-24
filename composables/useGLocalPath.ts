import {
    getComposer,
    useLocalePath as _useLocalePath,
} from 'vue-i18n-routing';

/** useLocalePathのラッパー関数。 */
export function useGLocalePath(
    options?: NonNullable<Parameters<typeof _useLocalePath>[0]>
): ReturnType<typeof _useLocalePath> {
    const { route, router, i18n, strategy } = options || {}
    return _useLocalePath({
        route: route || useRoute(),
        router: router || useRouter(),
        i18n: i18n || getComposer(useNuxtApp().$i18n),
        strategy: strategy ?? 'prefix', // ←リンクではprefixつきにする
    })
}