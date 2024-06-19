import type { Component } from "#app/compat/capi";
import GHIcon from "bi/github.svg";

export type NavSection = {
    /** セクションタイトル 翻訳キー */
    title: string;
    /** アイテム */
    items: NavItem[];
};

/** ナビゲーションバー アイテム */
export type NavItem = {
    /** 翻訳キー */
    i18n: string;
    /** 説明文 翻訳キー */
    description?: string;
    /** リンク先 */
    to: string;
} | {
    /** アイコン（svgをインポートして貼り付け） */
    icon: Component | string;
    /** リンク先 */
    to: string;
};

/** ナビゲーションバー コンテンツ */
export default <{
    /** ナビゲーションの真ん中のリンク */
    center: NavItem[];
    /** 
     * ナビゲーションの右端のリンク
     * （SNSとかGithubのリンクとか）
     */
    right: NavItem[];
}> {
    center: [
        {
            i18n: '_nav.servers',
            to: '/servers/',
        },
        {
            i18n: '_nav.docs',
            to: '/docs/',
        },
        {
            i18n: '_nav.blog',
            to: '/blog/',
        },
        {
            i18n: '_nav.other',
            to: '/learn-more/',
        }
    ],
    right: [
        {
            icon: GHIcon,
            to: 'https://github.com/misskey-dev/misskey-hub-next',
        },
    ]
};