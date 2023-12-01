// Misskey Docs Frontmatter Types
import type { ParsedContent, MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';

/**
 * Docs Frontmatter の型定義
 * 
 * `/content/<lang>/docs/` のフロントマターはこの形式で入力してください 
 */
export interface MiDocsParsedContent extends MarkdownParsedContent {
    /** もくじの見出しをさかのぼる限度 */
    maxTocDepth?: number;

    /** 前へ・次へボタンの階層考慮を無視 */
    ignoreDirBasedNav?: boolean;
}

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