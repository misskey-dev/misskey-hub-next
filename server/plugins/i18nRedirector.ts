import { useRuntimeConfig } from '#imports';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    if (event.path.includes("_nuxt") || event.path.match(/\d{3}\.html/)) {
      return;
    }

    console.log(event.path);
    const runtimeConfig = useRuntimeConfig();
    //@ts-ignore
    if (!event.path.match(new RegExp(`^/(${runtimeConfig.locales.map((l) => l.code).join('|')})/`))) {
      html.htmlAttrs = [];

      const remainingList: string[] = [];
      html.head.forEach((v) => {
        remainingList.push(...(v.match(/<!--(.|\n)*(?<=-->)/gm) ?? []));
        remainingList.push(...(v.match(/<link\s+rel="(og|alternate|canonical)[^>]+>/gm) ?? []));
        remainingList.push(...(v.match(/<meta[^>]+>/gm) ?? []));
        remainingList.push(...(v.match(/<script type="application\/ld\+json">.*(?<=<\/script>)/gm) ?? []));
      });
      remainingList.push('');

      html.head = remainingList.map((v) => v + '\n');
      //@ts-ignore
      html.head.push('<script type="text/javascript">const s = ' + JSON.stringify(runtimeConfig.locales.map((l) => l.code)) + '; const d = new URLSearchParams(document.cookie); if (d.get(\'i18n_redirected\')) { location.replace(\'/\' + d.get(\'i18n_redirected\') + location.pathname); } else if (s.includes(navigator.language.split("-")[0])) { location.replace(\'/\' + navigator.language.split("-")[0] + location.pathname); } else { location.replace(\'/ja\' + location.pathname); }</script>\n');
      html.body = ['\n<noscript>Please enable Javascript to see this page properly.</noscript>\n'];
      html.bodyAppend = [];
      html.bodyPrepend = [];
    }
	});
});
