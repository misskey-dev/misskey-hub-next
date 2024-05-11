import { promises as fsp } from 'fs';
import { glob } from 'fast-glob';
import { addSpaceBetweenEachSentence } from '@misskey-dev/markdown-space-autofixer';
import { localesConst } from '../assets/data/locales';
import type { LocaleCodes } from '../assets/data/locales';

export async function fixMarkdown() {
    const ignoreLocales: LocaleCodes[] = [
        'ja',
        'ja-ks',
        'cn',
        'ko',
        'tw',
    ];

    // globs files
    const filesToCheck = await glob(`content/(${localesConst.map((v) => v.code).filter((v) => !ignoreLocales.includes(v)).join('|')})/**/*.md`, {
        ignore: [ '**/5.releases.md' ],
    });
    console.log(filesToCheck);

    const jobs = filesToCheck.map(async (file) => {
        const content = await fsp.readFile(file, 'utf-8');
        const newContent = await addSpaceBetweenEachSentence(content);

        if (content !== newContent) {
            console.log(`Writing: ${file}`);
            await fsp.writeFile(file, newContent);
        }
    });

    await Promise.all(jobs);
}
