import { withQuery } from "ufo";
import { localesConst, type LocaleCodes } from "../assets/data/locales";
import type { PartialRecord } from "../types/others";
import { writeFileSync } from "fs";
import path from "path";

type CrowdinTargetLanguages = {
    id: string;
    name: string;
    editorCode: string;
    twoLettersCode: string;
    threeLettersCode: string;
    locale: string;
    androidCode: string;
    osxCode: string;
    osxLocale: string;
    pluralCategoryNames: string[];
    pluralRules: string;
    pluralExamples: string[];
    textDirection: string;
    dialectOf: string;
};

type CrowdinProjectMember = {
    id: number;
    username: string;
    fullName: string;
    role: string;
    permissions: Record<string, string>;
    roles: { name: string; permissions: Record<string, string> };
    avatarUrl: string;
    joinedAt: string;
    timezone: string;
};

function fallback(sourceFilePath: string, tsOut: string[]) {
    tsOut.push('export const hubI18nMembers: PartialRecord<LocaleCodes, MiHubMember[]> = {};');
    writeFileSync(sourceFilePath, tsOut.join('\n'));
}

//@ts-ignore
export async function fetchCrowdinMembers() {
    const sourceFilePath = path.resolve(__dirname, '../assets/data/i18n-members.ts');
    const tsOut = [
        '/** This file is auto-generated */',
        'import type { LocaleCodes } from \'@/assets/data/locales\';',
        'import type { PartialRecord } from \'@/types/others\';',
        'import type { MiHubMember } from \'./team-members\';',
    ];

    if (!process.env.CROWDIN_INTG_API) {
        fallback(sourceFilePath, tsOut);
        return;
    }
    try {
        const res = await fetch('https://api.crowdin.com/api/v2/projects/628502', {
            headers: {
                'Authorization': `Bearer ${process.env.CROWDIN_INTG_API}`,
            },
        });
        const projectRes = await res.json();
        const out: PartialRecord<LocaleCodes, any[]> = {};

        for (let i = 0; i < projectRes.data.targetLanguages.length; i++) {
            const lang = projectRes.data.targetLanguages[i] as CrowdinTargetLanguages;
            const correspondLocaleObject = localesConst.find((v) => v.language === lang.locale);
            if (correspondLocaleObject !== undefined) {
                try {
                    const res = await fetch(withQuery('https://api.crowdin.com/api/v2/projects/628502/members', {
                        role: 'translator',
                        languageId: lang.id,
                        limit: 24,
                    }), {
                        headers: {
                            'Authorization': `Bearer ${process.env.CROWDIN_INTG_API}`,
                        },
                    });
                    const membersRes = await res.json();
                    out[correspondLocaleObject.code] = (membersRes.data as { data: CrowdinProjectMember }[]).map((v) => ({
                        id: 'crowdin',
                        username: v.data.username,
                        name: v.data.fullName ? v.data.fullName : undefined,
                        avatar: v.data.avatarUrl ? v.data.avatarUrl : undefined,
                    }));
                } catch (error) {
                    fallback(sourceFilePath, tsOut);
                    return;
                }
            }
        }

        tsOut.push(`export const hubI18nMembers: PartialRecord<LocaleCodes, MiHubMember[]> = ${JSON.stringify(out)};`);
        writeFileSync(sourceFilePath, tsOut.join('\n'));

        console.log('Crowdin (Misskey Hub) 貢献者の取得完了');
    } catch (error) {
        fallback(sourceFilePath, tsOut);
        return;
    }
}