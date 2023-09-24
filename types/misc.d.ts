declare module '*.svg' {
    import { FunctionalComponent, SVGAttributes } from 'vue'
    const src: FunctionalComponent<SVGAttributes>
    export default src
}

declare module 'nuxt/schema' {
    interface AppConfig {
        
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
            title: { ja: string; } & Record<string, string>;

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

export { };