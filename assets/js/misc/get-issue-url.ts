import { withQuery } from 'ufo';

export async function getGhIssueUrl(options: {
    lang: string;
    repoUrl: string;
}) {
    // Issue Templateのプレフィル
    let environment = `* Model and OS of the device(s):
* Browser:`;
    let template = '02_visitor-bug-report-en.yml';

    if (options.lang === 'ja') {
        template = '01_visitor-bug-report-ja.yml';
    }

    if (process.client) {
        //@ts-ignore
        if ('userAgentData' in navigator && 'getHighEntropyValues' in navigator.userAgentData) {
            //@ts-ignore
            const uaData = await navigator.userAgentData.getHighEntropyValues([
                "fullVersionList",
                "platformVersion",
            ]);
            let osVersion = 'v' + uaData.platformVersion;
            if (uaData.platform === 'Windows') {
                // https://learn.microsoft.com/ja-jp/microsoft-edge/web-platform/how-to-detect-win11
                const majorPlatformVersion = parseInt(uaData.platformVersion.split('.')[0]);
                if (majorPlatformVersion >= 13) {
                    osVersion = '11 or later';
                }
                else if (majorPlatformVersion > 0) {
                    osVersion = '10';
                }
                else {
                    osVersion = '8.1 or before';
                }
            }
            const browserData = uaData.fullVersionList.find((item: any) => item.brand.toLowerCase() !== 'not_a brand');
            const env = [
                `* Model and OS of the device(s): ${uaData.platform} ${osVersion}`,
                `* Browser: ${browserData.brand} ${browserData.version}`,
                `* Viewport Size: ${window.innerWidth}x${window.innerHeight}`,
                `* (UA Detected Using getHighEntropyValues)`,
            ];
            environment = env.join('\n');
        } else {
            const UAParser = (await import('ua-parser-js')).default;
            const ua = new UAParser();
            const uaRes = ua.getResult();
            const env = [
                `* Model and OS of the device(s): ${uaRes.os.name} v${uaRes.os.version}`,
                `* Browser: ${uaRes.browser.name} (${uaRes.engine.name}) v${uaRes.browser.version}`,
                `* Viewport Size: ${window.innerWidth}x${window.innerHeight}`,
                `* Raw User Agent: ${uaRes.ua}`,
            ];
            environment = env.join('\n');
        }
    }

    return withQuery(`${options.repoUrl}/issues/new`, {
        template,
        environment,
        labels: 'maybe non-developer,bug?',
    });
    
}