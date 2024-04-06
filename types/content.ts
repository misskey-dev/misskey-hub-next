// Misskey Docs Frontmatter Types
import type { ParsedContent, MarkdownParsedContent, MarkdownRoot } from '@nuxt/content/dist/runtime/types';

/**
 * Docs Frontmatter の型定義
 * 
 * `/content/<lang>/docs/` のフロントマターはこの形式で入力してください 
 */
interface MiDocsParsedContentMd extends MarkdownParsedContent {
    _TYPE_: undefined;

    /** もくじの見出しをさかのぼる限度 */
    maxTocDepth?: number;

    /** 前へ・次へボタンの階層考慮を無視 */
    ignoreDirBasedNav?: boolean;
};

/**
 * ステップバイステップガイドの型定義
 */
interface MiDocsParsedContentSteppedGuide extends ParsedContent {
    _TYPE_: 'STEPPED_GUIDE';

    guides: {
        _AUTOSELECT_TYPE_?: 'OS_ANDROID' | 'OS_IOS';
        _LAYOUT_TYPE_?: 'IMAGE_PORTRAIT_FIXED';
        title: string;
        description?: string | MarkdownRoot;
        steps: {
            title: string;
            description: string | MarkdownRoot;
            image?: string;
        }[];
    }[];
};

export type MiDocsParsedContent = MiDocsParsedContentMd | MiDocsParsedContentSteppedGuide;

/**
 * Blog Frontmatter の型定義
 * 
 * `/content/blog/` のフロントマターはこの形式で入力してください 
 */
export interface MiBlogParsedContent extends MarkdownParsedContent {
    /** サムネイル画像のURL・絶対パス */
    thumbnail?: string;
}

/**
 * Docs API の型定義
 */