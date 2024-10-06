import { promises as fsp } from 'node:fs';
import { parseArgs } from 'node:util';
import path from 'path';

function parseChangelog(text: string) {
    const lines = text.split('\n');

    const latestVersionIndex = lines.findIndex(line => line.startsWith('## '));

    if (latestVersionIndex === -1) {
        throw new Error('Failed to find latest version');
    }

    const latestVersion = lines[latestVersionIndex].replace('## ', '').replaceAll('\r', '');

    // 次の ## までを取得
    let latestChangesLine = lines.slice(latestVersionIndex + 1);

    const nextVersionIndex = latestChangesLine.findIndex(line => line.startsWith('## '));

    if (nextVersionIndex !== -1) {
        latestChangesLine = latestChangesLine.slice(0, nextVersionIndex);
    }

    let contentEncountered = false;

    latestChangesLine = latestChangesLine.filter(line => {
        if (line.trim() === '') {
            return contentEncountered; // はじめの空行は無視（文字が入り出してからは空行を含むように）
        } else if (!contentEncountered) {
            contentEncountered = true;
        }
        return true;
    }).map(line => line.replaceAll('\r', ''));

    const prefixLine = lines.slice(0, latestVersionIndex).map(line => line.replaceAll('\r', ''));

    return {
        latestVersion,
        latestChanges: latestChangesLine.join('\n'),
        prefix: prefixLine.join('\n'),
        rest: lines.slice(latestVersionIndex).join('\n'),
    };
}

async function getGhChangelog() {
    const response = await fetch('https://raw.githubusercontent.com/misskey-dev/misskey/master/CHANGELOG.md');

    if (!response.ok) {
        throw new Error('Failed to fetch changelog');
    }

    const text = await response.text();

    return parseChangelog(text);
}

async function main() {
    const { values } = parseArgs({
        args: process.argv,
        options: {
            version: {
                type: 'string',
                short: 'v',
                multiple: false,
            },
            releaseDate: {
                type: 'string',
                short: 'd',
                multiple: false,
            },
        },
        allowPositionals: true,
    });

    if (values.releaseDate && !values.releaseDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        throw new Error('Invalid date format. Specify the date in the format of "YYYY-MM-DD"');
    }

    const ghChangelog = await getGhChangelog();

    const docsPath = path.resolve(import.meta.dirname, '../../../content/ja/docs/5.releases.md');
    const localText = await fsp.readFile(docsPath, 'utf-8');
    const localChangelog = parseChangelog(localText);

    if (values.version && ghChangelog.latestVersion !== values.version) {
        throw new Error(`Latest version is ${ghChangelog.latestVersion}, but specified version is ${values.version}`);
    }
    
    if (ghChangelog.latestVersion === localChangelog.latestVersion) {
        console.log('No updates');
        return;
    }

    console.log('Updating release notes...');

    const now = values.releaseDate ? new Date(`${values.releaseDate}T00:00:00`) : new Date();

    // リリースノート更新
    const releaseDateForReleaseNotes = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${(now.getDate()).toString().padStart(2, '0')}`;
    const newChangelog = `${localChangelog.prefix}\n## ${ghChangelog.latestVersion}\nリリース日: ${releaseDateForReleaseNotes}\n\n${ghChangelog.latestChanges}\n\n${localChangelog.rest}`;
    await fsp.writeFile(docsPath, newChangelog);
    console.log('Release notes updated');

    // リリースのお知らせを追加
    const releaseDateForBlogPath = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${(now.getDate()).toString().padStart(2, '0')}`;
    const releaseDateForBlogEntry = `${now.getFullYear()}年${(now.getMonth() + 1)}月${now.getDate()}日`;
    const postsPath = path.resolve(import.meta.dirname, `../../../content/blog/${releaseDateForBlogPath}-release.md`);
    const postTemplate = `---
description: Misskey v${ghChangelog.latestVersion} がリリースされました！
date: ${releaseDateForBlogPath}
---

# NEW RELEASE: v${ghChangelog.latestVersion}

Misskey Projectは${releaseDateForBlogEntry}、Misskey v${ghChangelog.latestVersion} をリリースしました！

詳しくは[リリースノート](/docs/releases/)をご覧ください。

開発に貢献してくださった方々、ベータ版をテストしてくださった方々、いつも支援してくださっている方々に感謝を申し上げます。

Misskeyは皆様の支援のおかげで継続した開発が行えています。Misskeyを気に入っていただけたらぜひ[プロジェクトに支援](/docs/donate/)をお願いします！
`;
    await fsp.writeFile(postsPath, postTemplate);
    console.log('Blog post added');
    
    // トップページのお知らせを更新
    const appConfigPath = path.resolve(import.meta.dirname, '../../../app.config.ts');
    await fsp.writeFile(appConfigPath, `export default defineAppConfig({
    notice: {
        title: {
            ja: 'v${ghChangelog.latestVersion} をリリースしました！',
            en: 'v${ghChangelog.latestVersion} is out now!',
        },
        to: "/docs/releases/",
    },
});
`);
    console.log('App config updated');

    console.log('Done');
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
