/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// AID
// 長さ8の[2000年1月1日からの経過ミリ秒をbase36でエンコードしたもの] + 長さ2の[ノイズ文字列]
export const aidRegExp = /^[0-9a-z]{10}$/;

const TIME2000 = 946684800000;
let counter: number;

if (process.client) {
	const arr = window.crypto.getRandomValues(new Uint16Array(2));
	counter = parseInt(arr[0].toString());
} else {
	const crypto = await import('crypto');
	counter = crypto.randomBytes(2).readUInt16LE(0);
}

function getTime(time: number): string {
	time = time - TIME2000;
	if (time < 0) time = 0;

	return time.toString(36).padStart(8, '0');
}

function getNoise(ctr: number): string {
	return ctr.toString(36).padStart(2, '0').slice(-2);
}

export function genAid(t: number, ctr: number | null = null): string {
	if (isNaN(t)) throw new Error('Failed to create AID: Invalid Date');
	if (!ctr) {
		counter++;
	}
	return getTime(t) + getNoise(ctr ?? counter);
}

export function parseAid(id: string): { date: Date; } {
	const time = parseInt(id.slice(0, 8), 36) + TIME2000;
	return { date: new Date(time) };
}