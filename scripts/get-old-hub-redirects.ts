import { redirects } from './../assets/data/old-hub-redirects';
import { localesConst } from './../assets/data/locales';
import type { LocaleCodes } from './../assets/data/locales';
import type { NuxtConfig } from 'nuxt/schema';
import { joinURL } from 'ufo';

export function getOldHubRedirects(): NuxtConfig['routeRules'] {

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

    const out: NuxtConfig['routeRules'] = {};

    localesConst.forEach((locale) => {
        redirects.forEach((route) => {
            if (route[0].startsWith('/ns')) return;

            let destination = route[1];

            if (route[0].endsWith('.html') && !new RegExp(`^/(${localesConst.map((e) => e.code).join('|')})/`, 'g').test(destination)) {
                destination = joinURL(`/${locale.code}`, destination);
            }

            out[joinURL(hubLocales[locale.code], route[0])] = {
                redirect: {
                    to: destination,
                    statusCode: 301,
                },
            };
        });
    });

    return out;
}