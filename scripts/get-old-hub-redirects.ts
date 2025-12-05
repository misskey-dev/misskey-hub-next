import { redirects } from './../assets/data/old-hub-redirects';
import { localesConst, localePathRegex } from './../assets/data/locales';
import type { LocaleCodes } from './../assets/data/locales';
import type { PartialRecord } from './../types/others';
import type { NuxtConfig } from 'nuxt/schema';
import { joinURL } from 'ufo';
import { readFileSync, writeFileSync, promises as fsp } from 'fs';
import { mkdir, access } from 'fs/promises';
import { constants } from 'fs';

type VercelRouteSource = {
    src: string;
    dest?: string;
    headers?: Record<string, string>;
    methods?: string[];
    continue?: boolean;
    caseSensitive?: boolean;
    check?: boolean;
    status?: number;
    has?: Array<unknown>;
    missing?: Array<unknown>;
    locale?: {
        redirect?: Record<string, string>;
        cookie?: string;
    };
    middlewareRawSrc?: string[];
    middlewarePath?: string;
};

// 旧Hub時代の各言語のプレフィックス
const hubLocales: PartialRecord<LocaleCodes, string> = {
    ja: '/',
    en: '/en',
    id: '/id',
    ko: '/ko',
    it: '/it',
    pl: '/pl',
    fr: '/fr',
    cn: '/zh-CN',
    tw: '/zh-TW',
};

export function getOldHubRedirects(mode: 'nitro'): NuxtConfig['routeRules']
export function getOldHubRedirects(mode: 'nitroFs'): NuxtConfig['routeRules']
export function getOldHubRedirects(mode: 'vercel'): VercelRouteSource[]
export function getOldHubRedirects(mode: 'nitro' | 'nitroFs' | 'vercel' = 'nitro'): NuxtConfig['routeRules'] | VercelRouteSource[] {

    if (mode === 'vercel') {
        const out: VercelRouteSource[] = [];

        redirects.forEach((route) => {
            if (route[0].startsWith('/ns')) return;

            let destination = route[1];

            if (!localePathRegex.test(destination)) {
                destination = joinURL(`$1/`, destination);
            }

            out.push({
                src: joinURL(`(${Object.values(hubLocales).map((v) => v === '/' ? '' : v).join('|')})/`, route[0]).replace(/(?<!\\)\./g, '\\.'),
                headers: {
                    'Location': destination,
                },
                status: 308,
            });
        });

        out.push({
            src: '/zh-CN/(.*)',
            caseSensitive: false,
            headers: {
                'Location': '/cn/$1',
            },
            status: 307,
        }, {
            src: '/zh-TW/(.*)',
            caseSensitive: false,
            headers: {
                'Location': '/tw/$1',
            },
            status: 307,
        });

        return out;
    } else {
        const out: NuxtConfig['routeRules'] = {};

        if (mode === 'nitro') {
            localesConst.filter((v) => hubLocales.hasOwnProperty(v.code)).forEach((locale) => {
                redirects.forEach((route) => {
                    if (route[0].startsWith('/ns') || ['/', '/index.html'].includes(route[0])) return;
        
                    let destination = route[1];
        
                    if (!localePathRegex.test(destination)) {
                        destination = joinURL(`/${locale.code}`, destination);
                    }
        
                    if (process.env.CF_PAGES === '1' && route[0].endsWith('.md')) return;

                    out[joinURL(hubLocales[locale.code] ?? '/', route[0])] = {
                        redirect: {
                            to: destination,
                            statusCode: 301,
                        },
                    };
                });
            });
        }

        if (process.env.CF_PAGES === '1') {
            const staticRedirects = readFileSync('./public/_redirects_template', 'utf-8');
            const additionalRedirects = redirects.filter((route) => route[0].endsWith('.md')).map((route) => {
                return `${route[0]} ${route[1]} 301`;
            });

            writeFileSync('./public/_redirects', staticRedirects + '\n' + additionalRedirects.join('\n'));
        }

        return {
            ...out,
            // See: https://github.com/unjs/nitro/pull/1976
            '/zh-CN/**': { redirect: '/cn/**' },
            '/zh-TW/**': { redirect: '/tw/**' },
            '/zh-cn/**': { redirect: '/cn/**' },
            '/zh-tw/**': { redirect: '/tw/**' },
        }
    }
}

export async function generateOldHubRedirects() {
    const out = new Map<string, string>();

    localesConst.filter((v) => hubLocales.hasOwnProperty(v.code)).forEach((locale) => {
        redirects.forEach((route) => {
            if (route[0].startsWith('/ns') || ['/', '/index.html'].includes(route[0])) return;

            let destination = route[1];

            if (!localePathRegex.test(destination)) {
                destination = joinURL(`/${locale.code}`, destination);
            }

            if (route[0].endsWith('.md')) return;

            out.set(joinURL(hubLocales[locale.code] ?? '/', route[0]), destination);
        });
    });

    console.log('Old Hub redirects:', out);

    function getRedirectHtml(destination: string) {
        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=${destination}">
    <link rel="canonical" href="${destination}">
</head>
<body></body>
</html>`;
    }

    const redirectsDir = './.output/public';

    for (const [src, dest] of out.entries()) {
        let srcPath = src;

        if (srcPath.endsWith('/')) {
            srcPath += 'index.html';
        } else if (srcPath.endsWith('.md')) {
            srcPath = srcPath.slice(0, -3) + '.html';
        }

        const filePath = redirectsDir + srcPath;

        try {
            // ディレクトリを作成（存在しない場合のみ）
            await mkdir(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });

            // ファイルが既に存在するか確認
            await access(filePath, constants.F_OK);
            console.log(`File already exists, skipping: ${filePath}`);
        } catch {
            // ファイルが存在しない場合は作成
            await fsp.writeFile(filePath, getRedirectHtml(dest));
            console.log(`File created: ${filePath}`);
        }
    }
}
