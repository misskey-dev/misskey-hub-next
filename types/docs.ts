// Misskey Docs Frontmatter Types
import type { ParsedContent, MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';

/**
 * Docs Frontmatter の型定義
 * 
 * `/content/<lang>/docs/` のフロントマターはこの形式で入力してください 
 */
export interface MiDocsParsedContent extends MarkdownParsedContent {

}

/**
 * Docs API の型定義
 */