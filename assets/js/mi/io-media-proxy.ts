/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/** 各インスタンスから画像引っ張ってくるのがとても大変なのでio経由で出す */
import { withQuery } from "ufo";

export function getProxiedImageUrl(imageUrl: string, type?: 'preview' | 'emoji' | 'avatar', mustOrigin = false, noFallback = false): string {
	const localProxy = 'https://misskey.io/proxy';

	if (imageUrl.startsWith('https://proxy.misskeyusercontent.com/') || imageUrl.startsWith('/proxy/') || imageUrl.startsWith(localProxy + '/')) {
		// もう既にproxyっぽそうだったらurlを取り出す
		imageUrl = (new URL(imageUrl)).searchParams.get('url') ?? imageUrl;
    }
    
    return withQuery(`${mustOrigin ? localProxy : 'https://proxy.misskeyusercontent.com'}/${type === 'preview' ? 'preview.webp' : 'image.webp'}`, {
        url: imageUrl,
        ...(!noFallback ? { 'fallback': '1' } : {}),
        ...(type ? { [type]: '1' } : {}),
        ...(mustOrigin ? { origin: '1' } : {}),
    });
}