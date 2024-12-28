/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { h } from 'vue';
import type { VNode } from 'vue';
import * as mfm from 'mfm-js';
import MkGoogle from '@/components/mk/Google.vue';
import MkSparkle from '@/components/mk/Sparkle.vue';
import MkCustomEmoji from '@/components/mk/CustomEmoji.vue';
import MkMention from '@/components/mk/Mention.vue';
import NuxtLink from '@/components/g/NuxtLink.vue';
import ProseAVue from '@/components/content/ProseA.vue';

const QUOTE_STYLE = `
display: block;
margin: 8px;
padding: 6px 0 6px 12px;
color: currentColor;
border-left: solid 3px currentColor;
opacity: 0.7;
`.split('\n').join(' ');

function safeParseFloat(str: unknown): number | null {
	if (typeof str !== 'string' || str === '') return null;
	const num = parseFloat(str);
	if (isNaN(num)) return null;
	return num;
}

export default function(props: {
	text: string;
	plain?: boolean;
	nowrap?: boolean;
	isNote?: boolean;
	emojiUrls?: string[];
	rootScale?: number;
	/** 表示の基準にするMisskeyサーバーのドメイン */
	baseHost?: string;
	/** 差し込むカスタム絵文字（:key:と画像URL） */
	customEmojis?: Record<string, string>;
}) {
	const isNote = props.isNote !== undefined ? props.isNote : true;

	if (props.text == null || props.text === '') return;

	const ast = (props.plain ? mfm.parseSimple : mfm.parse)(props.text);

	const validTime = (t: string | boolean | null | undefined) => {
		if (t == null || typeof t !== 'string') return null;
		return t.match(/^[0-9.]+s$/) ? t : null;
	};

	const validColor = (c: string | boolean | null | undefined): string | null => {
		if (c == null || typeof c !== 'string') return null;
		return c.match(/^[0-9a-f]{3,6}$/i) ? c : null;
	};

	const useAnim = true;

	/**
	 * Gen Vue Elements from MFM AST
	 * @param ast MFM AST
	 * @param scale How times large the text is
	 */
	const genEl = (ast: mfm.MfmNode[], scale: number) => ast.map((token): VNode | string | (VNode | string)[] => {
		switch (token.type) {
			case 'text': {
				const text = token.props.text.replace(/(\r\n|\n|\r)/g, '\n');

				if (!props.plain) {
					const res: (VNode | string)[] = [];
					for (const t of text.split('\n')) {
						res.push(h('br'));
						res.push(t);
					}
					res.shift();
					return res;
				} else {
					return [text.replace(/\n/g, ' ')];
				}
			}

			case 'bold': {
				return [h('b', genEl(token.children, scale))];
			}

			case 'strike': {
				return [h('del', genEl(token.children, scale))];
			}

			case 'italic': {
				return h('i', {
					style: 'font-style: oblique;',
				}, genEl(token.children, scale));
			}

			case 'fn': {
				// TODO: CSSを文字列で組み立てていくと token.props.args.~~~ 経由でCSSインジェクションできるのでよしなにやる
				let style;
				switch (token.props.name) {
					case 'tada': {
						const speed = validTime(token.props.args.speed) ?? '1s';
						style = 'font-size: 150%;' + (useAnim ? `animation: tada ${speed} linear infinite both;` : '');
						break;
					}
					case 'jelly': {
						const speed = validTime(token.props.args.speed) ?? '1s';
						style = (useAnim ? `animation: mfm-rubberBand ${speed} linear infinite both;` : '');
						break;
					}
					case 'twitch': {
						const speed = validTime(token.props.args.speed) ?? '0.5s';
						style = useAnim ? `animation: mfm-twitch ${speed} ease infinite;` : '';
						break;
					}
					case 'shake': {
						const speed = validTime(token.props.args.speed) ?? '0.5s';
						style = useAnim ? `animation: mfm-shake ${speed} ease infinite;` : '';
						break;
					}
					case 'spin': {
						const direction =
							token.props.args.left ? 'reverse' :
								token.props.args.alternate ? 'alternate' :
									'normal';
						const anime =
							token.props.args.x ? 'mfm-spinX' :
								token.props.args.y ? 'mfm-spinY' :
									'mfm-spin';
						const speed = validTime(token.props.args.speed) ?? '1.5s';
						style = useAnim ? `animation: ${anime} ${speed} linear infinite; animation-direction: ${direction};` : '';
						break;
					}
					case 'jump': {
						const speed = validTime(token.props.args.speed) ?? '0.75s';
						style = useAnim ? `animation: mfm-jump ${speed} linear infinite;` : '';
						break;
					}
					case 'bounce': {
						const speed = validTime(token.props.args.speed) ?? '0.75s';
						style = useAnim ? `animation: mfm-bounce ${speed} linear infinite; transform-origin: center bottom;` : '';
						break;
					}
					case 'flip': {
						const transform =
							(token.props.args.h && token.props.args.v) ? 'scale(-1, -1)' :
								token.props.args.v ? 'scaleY(-1)' :
									'scaleX(-1)';
						style = `transform: ${transform};`;
						break;
					}
					case 'x2': {
						return h('span', {
							class: 'mfm-x2',
						}, genEl(token.children, scale * 2));
					}
					case 'x3': {
						return h('span', {
							class: 'mfm-x3',
						}, genEl(token.children, scale * 3));
					}
					case 'x4': {
						return h('span', {
							class: 'mfm-x4',
						}, genEl(token.children, scale * 4));
					}
					case 'font': {
						const family =
							token.props.args.serif ? 'serif' :
								token.props.args.monospace ? 'monospace' :
									token.props.args.cursive ? 'cursive' :
										token.props.args.fantasy ? 'fantasy' :
											token.props.args.emoji ? 'emoji' :
												token.props.args.math ? 'math' :
													null;
						if (family) style = `font-family: ${family};`;
						break;
					}
					case 'blur': {
						return h('span', {
							class: '_mfm_blur_',
						}, genEl(token.children, scale));
					}
					case 'rainbow': {
						const speed = validTime(token.props.args.speed) ?? '1s';
						style = useAnim ? `animation: mfm-rainbow ${speed} linear infinite;` : '';
						break;
					}
					case 'sparkle': {
						if (!useAnim) {
							return genEl(token.children, scale);
						}
						return h(MkSparkle, {}, genEl(token.children, scale));
					}
					case 'rotate': {
						const degrees = safeParseFloat(token.props.args.deg ?? '90');
						style = `transform: rotate(${degrees}deg); transform-origin: center center;`;
						break;
					}
					case 'position': {
						const x = safeParseFloat(token.props.args.x ?? '0');
						const y = safeParseFloat(token.props.args.y ?? '0');
						style = `transform: translateX(${x}em) translateY(${y}em);`;
						break;
					}
					case 'scale': {
						const x = Math.min(safeParseFloat(token.props.args.x ?? '1') ?? 1, 5);
						const y = Math.min(safeParseFloat(token.props.args.y ?? '1') ?? 1, 5);
						style = `transform: scale(${x}, ${y});`;
						scale = scale * Math.max(x, y);
						break;
					}
					case 'fg': {
						let color = validColor(token.props.args.color);
						if (color == null || !/^[0-9a-f]{3,6}$/i.test(color)) color = 'f00';
						style = `color: #${color};`;
						break;
					}
					case 'bg': {
						let color = validColor(token.props.args.color);
						if (color == null || !/^[0-9a-f]{3,6}$/i.test(color)) color = 'f00';
						style = `background-color: #${color};`;
						break;
					}
					case 'border': {
						let color = validColor(token.props.args.color);
						color = color ? `#${color}` : '#86b300';
						let b_style = token.props.args.style;
						if (typeof b_style !== 'string' ||
							!['hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
								.includes(b_style)
						) b_style = 'solid';
						const width = safeParseFloat(token.props.args.width ?? '1');
						const radius = safeParseFloat(token.props.args.radius ?? '0');
						style = `border: ${width}px ${b_style} ${color}; border-radius: ${radius}px;${token.props.args.noclip ? '' : ' overflow: clip;'}`;
						break;
					}
					case 'ruby': {
						if (token.children.length === 1) {
							const child = token.children[0];
							let text = child.type === 'text' ? child.props.text : '';
							return h('ruby', {}, [text.split(' ')[0], h('rt', text.split(' ')[1])]);
						} else {
							const rt = token.children.at(-1)!;
							let text = rt.type === 'text' ? rt.props.text : '';
							return h('ruby', {}, [...genEl(token.children.slice(0, token.children.length - 1), scale), h('rt', text.trim())]);
						}
					}
				}
				if (style == null) {
					return h('span', {}, ['$[', token.props.name, ' ', ...genEl(token.children, scale), ']']);
				} else {
					return h('span', {
						style: 'display: inline-block; ' + style,
					}, genEl(token.children, scale));
				}
			}

			case 'small': {
				return [h('small', {
					style: 'opacity: 0.7;',
				}, genEl(token.children, scale))];
			}

			case 'center': {
				return [h('div', {
					style: 'text-align:center;',
				}, genEl(token.children, scale))];
			}

			case 'url': {
				return [h(ProseAVue, {
					key: Math.random(),
					href: token.props.url,
					target: '_blank',
					rel: 'nofollow noopener',
				}, token.props.url)];
			}

			case 'link': {
				return [h(NuxtLink, {
					key: Math.random(),
					to: token.props.url,
					target: '_blank',
					rel: 'nofollow noopener',
				}, genEl(token.children, scale))];
			}

			case 'mention': {
				//@ts-ignore
				return [h(MkMention, {
					key: Math.random(),
					host: (token.props.host) ?? props.baseHost,
					localHost: props.baseHost,
					username: token.props.username,
				})];
			}

			case 'hashtag': {
				return [h(NuxtLink, {
					key: Math.random(),
					to: `https://${props.baseHost ?? 'misskey.io'}/tags/${encodeURIComponent(token.props.hashtag)}`,
					style: 'color:rgb(255, 145, 86);',
				}, `#${token.props.hashtag}`)];
			}

			case 'quote': {
				if (!props.nowrap) {
					return [h('div', {
						style: QUOTE_STYLE,
					}, genEl(token.children, scale))];
				} else {
					return [h('span', {
						style: QUOTE_STYLE,
					}, genEl(token.children, scale))];
				}
			}

			case 'emojiCode': {
				if (props.customEmojis && props.customEmojis[token.props.name]) {
					return [h(MkCustomEmoji, {
						key: Math.random(),
						name: token.props.name,
						normal: props.plain,
						useOriginalSize: scale >= 2.5,
						url: props.customEmojis[token.props.name],
					})]
				}
				return [h(MkCustomEmoji, {
					key: Math.random(),
					name: token.props.name,
					normal: props.plain,
					host: props.baseHost,
					useOriginalSize: scale >= 2.5,
				})];
			}

			case 'unicodeEmoji': {
				return [h('img', {
					style: 'display:inline;height:1.25em;vertical-align:-.25em;',
					src: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${token.props.emoji.codePointAt(0)?.toString(16)}.svg`,
				})];
			}

			case 'mathInline': {
				return [h('code', token.props.formula)];
			}

			case 'mathBlock': {
				return [h('code', token.props.formula)];
			}

			case 'inlineCode': {
				return [h('code', token.props.code)];
			}

			case 'blockCode': {
				return [h('pre', {
					class: 'p-4 bg-gray-200/50 rounded',
				}, h('code', token.props.code))];
			}

			case 'search': {
				return [h(MkGoogle, {
					key: Math.random(),
					q: token.props.query,
				})];
			}

			case 'plain': {
				return [h('span', genEl(token.children, scale))];
			}

			default: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				console.error('unrecognized ast type:', (token as any).type);

				return [];
			}
		}
	}).flat(Infinity) as (VNode | string)[];

	return h('span', {
		// https://codeday.me/jp/qa/20190424/690106.html
		style: props.nowrap ? 'white-space: pre; word-wrap: normal; overflow: hidden; text-overflow: ellipsis;' : 'white-space: pre-wrap;',
	}, genEl(ast, props.rootScale ?? 1));
}