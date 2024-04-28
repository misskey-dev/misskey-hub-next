import { promises as fsp } from 'fs';
import { localesConst } from './../assets/data/locales';

export async function genSpaLoadingTemplate() {
    const base = await fsp.readFile('app/spa-loading-template-base.html', 'utf-8');
    const script = `<script type="text/javascript">
    const s = ${JSON.stringify(localesConst.map((l) => l.code))};
    const r = new RegExp(\`^/\\(\${s.join('|')}\\)\`);
    const d = new URLSearchParams(document.cookie);
    if (!r.test(location.pathname)) {
        if (d.get(\'i18n_redirected\')) {
            location.replace(\'/\' + d.get(\'i18n_redirected\') + location.pathname + location.search);
        } else if (s.includes(navigator.language.split("-")[0])) {
            location.replace(\'/\' + navigator.language.split("-")[0] + location.pathname + location.search);
        } else {
            location.replace(\'/ja\' + location.pathname + location.search);
        }
    }
</script>`;
    
    await fsp.writeFile('app/spa-loading-template.html', base.replace('<!-- script -->', script));
}
