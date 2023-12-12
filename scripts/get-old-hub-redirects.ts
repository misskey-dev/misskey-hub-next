import { writeFileSync } from 'fs';
import { redirects } from './../assets/data/old-hub-redirects';
import { localesConst } from './../assets/data/locales';
import type { LocaleCodes } from './../assets/data/locales';
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

export function getOldHubRedirects():VercelRouteSource[] {

    // 旧Hub時代の各言語のプレフィックス
    const hubLocales: Record<LocaleCodes, string> = {
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

    const out:VercelRouteSource[] = [];

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
        headers: {
            'Location': '/cn/$1',
        },
        status: 307,
    }, {
        src: '/zh-TW/(.*)',
        headers: {
            'Location': '/tw/$1',
        },
        status: 307,
    });

    return out;
}