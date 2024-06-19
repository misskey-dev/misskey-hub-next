import { redirects } from './../app/assets/data/old-hub-redirects';
import { localesConst, localePathRegex } from './../app/assets/data/locales';
import type { LocaleCodes } from './../app/assets/data/locales';
import type { PartialRecord } from './../types/others';
import type { NuxtConfig } from 'nuxt/schema';
import { joinURL } from 'ufo';
import { readFileSync, writeFileSync } from 'fs';

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