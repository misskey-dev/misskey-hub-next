import type { LocaleCodes } from './../nuxt.config';
import type { ComputedRef } from 'vue-demi';
import type { LocaleObject } from '@nuxtjs/i18n';
import { FunctionalComponent, SVGAttributes } from '#app/compat/capi';

export { };

declare module '*.svg' {
    const src: FunctionalComponent<SVGAttributes>;
    export default src;
}

declare module 'nuxt/schema' {

    interface CustomAppConfig {
        
        /** お知らせ */
        notice?: {

            /** 
             * お知らせの文言（言語ごとに羅列）
             * 
             * ```js
             * defineAppConfig({
             *     notice: {
             *         title: {
             *             ja: '〇〇をリリースしました！',
             *             en: 'We\'ve released 〇〇!',
             *             ...
             *         },
             *         ...
             *     }
             * });
             * ```
             * 
             **/
            title: { ja: string; } & Partial<Record<LocaleCodes, string>>;

            /**
             * リンク先
             * （内部パス・外部パスどちらでも指定可能） 
             * 
             * 内部リンクの場合は、**先頭の言語ディレクトリ（`/ja/`など）を除いて記入**  
             * （例: `/ja/docs/releases/` → `/docs/releases/`）
             **/
            to: string;
        }
    }
}

declare module 'vue-i18n' {
    interface ComposerCustomProperties {
        // 厳格に定義し直す
        locales: ComputedRef<LocaleObject[]>
    }
}
