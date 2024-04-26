import { writeFileSync } from 'fs';
import { redirects } from './../assets/data/old-hub-redirects';
import { localesConst } from './../assets/data/locales';
import type { LocaleCodes } from './../assets/data/locales';
import type { PartialRecord } from './../types/others';
import type { NuxtConfig } from 'nuxt/schema';
import { joinURL, cleanDoubleSlashes } from 'ufo';

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


export function getOldHubRedirects(mode: 'nitro'): NuxtConfig['routeRules']
export function getOldHubRedirects(mode: 'vercel'): VercelRouteSource[]
export function getOldHubRedirects(mode: 'nitro' | 'vercel' = 'nitro'): NuxtConfig['routeRules'] | VercelRouteSource[] {

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


    if (mode === 'vercel') {
        const out: VercelRouteSource[] = [];

        redirects.forEach((route) => {
            if (route[0].startsWith('/ns')) return;

            let destination = route[1];

            if (!new RegExp(`^/(${localesConst.map((e) => e.code).join('|')})/`, 'g').test(destination)) {
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

        localesConst.forEach((locale) => {
            redirects.forEach((route) => {
                if (route[0].startsWith('/ns') || ['/', '/index.html'].includes(route[0])) return;
    
                let destination = route[1];
    
                if (route[0].endsWith('.html')&& !new RegExp(`^/(${localesConst.map((e) => e.code).join('|')})/`, 'g').test(destination)) {
                    destination = joinURL(`/${locale.code}`, destination);
                }
    
                out[joinURL(hubLocales[locale.code] ?? '/', route[0])] = {
                    redirect: {
                        to: destination,
                        statusCode: 301,
                    },
                };
            });
        });

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