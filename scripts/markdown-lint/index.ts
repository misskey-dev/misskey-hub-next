import { promises as mdlp } from 'markdownlint';
import { applyFixes } from 'markdownlint-rule-helpers';
import { promises as fsp } from 'fs';
import { glob } from 'fast-glob';
import { localesConst } from '../../assets/data/locales';
import type { LocaleCodes } from '../../assets/data/locales';
import { customPeriodSpace } from './period-space';

export async function fixMarkdown() {
    const ignoreLocales: LocaleCodes[] = [
        'ja',
        'ja-ks',
        'cn',
        'ko',
        'tw',
    ];

    // globs files
    const filesToCheck = await glob(`../../content/(${localesConst.map((v) => v.code).filter((v) => !ignoreLocales.includes(v)).join('|')})/**/*.md`);

    // invoke markdownlint
    const fixResults = await mdlp.markdownlint({
        files: filesToCheck,
        config: {
            default: false,
        },
        customRules: [customPeriodSpace],
    });

    // apply fixes
    const errorFiles = Object.keys(fixResults);
    const subTasks: Promise<void>[] = [];
    for (const fileName of errorFiles) {
        const errorInfos = fixResults[fileName].filter((errorInfo) => errorInfo.fixInfo);
        if (errorInfos.length > 0) {
            delete fixResults[fileName];
            subTasks.push(fsp.readFile(fileName, 'utf-8').then((original) => {
                const fixed = applyFixes(original, errorInfos);
                return fsp.writeFile(fileName, fixed, 'utf-8');
            }));
        }
    }
    await Promise.all(subTasks);
}
