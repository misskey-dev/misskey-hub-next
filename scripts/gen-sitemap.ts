import type { Nitro } from "nitropack";
//import { useRuntimeConfig } from "nuxt/app";
import { SitemapStream, streamToPromise } from 'sitemap';
import type { SitemapItem } from 'sitemap';
import { Readable } from 'stream';
import { writeFileSync } from 'fs';
import path from 'path';

export default async function genSitemap(nitro: Nitro) {
    if (!nitro._prerenderedRoutes) {
        return;
    }

    const domain = nitro.options.runtimeConfig.public.baseUrl;
    const publicDir = nitro.options.output.publicDir;

    const routes = nitro._prerenderedRoutes?.map((e) => e.fileName || null).filter((e, i, a) => e && a.indexOf(e) === i && e.endsWith("index.html")).map((e) => {
        return {
            url: e?.replace(/index\.html$/, ''),
	    
            changefreq: 'weekly',
            priority: .7,
        } as SitemapItem;
    });

    if (routes.length === 0) return;
    
    const smStream = new SitemapStream({ hostname: domain });
    Readable.from(routes).pipe(smStream);

    const data = await streamToPromise(smStream);

    writeFileSync(path.join(publicDir, 'sitemap.xml'), data.toString());
    console.log("Sitemap was generated");
}