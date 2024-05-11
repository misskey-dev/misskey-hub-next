import type { Rule } from 'markdownlint';

export const customPeriodSpace: Rule = {
    names: ['custom/period-space'], // ルールの名前
    description: 'Ensure there is a space after period.', // ルールの説明
    tags: ['custom'], // タグ
    parser: 'markdownit',
    'function': function rule(params, onError) { // ルールの関数
        params.parsers.markdownit.tokens.forEach(function (token) {
            if (token.type === 'inline') {
                let inCode = false;
                token.children.forEach(function (child) {
                    if (child.type === 'text' && !inCode) {
                        const text = child.content;
                        const matches = text.match(/(\.\S)/g);
                        if (matches) {
                            matches.forEach(function (match) {
                                const index = text.indexOf(match);
                                onError({
                                    lineNumber: token.lineNumber,
                                    detail: 'A space is required after period.',
                                    range: [index + 1, index + 2],
                                    fixInfo: {
                                        insertText: ' ',
                                        editColumn: index + 1,
                                    }
                                });
                            });
                        }
                        inCode = false;
                    } else if (child.type === 'code_inline') {
                        inCode = !inCode;
                    }
                });
            }
        });
    }
};
