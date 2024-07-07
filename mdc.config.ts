import { defineConfig } from '@nuxtjs/mdc/config';
import type { LanguageRegistration } from 'shiki';

export default defineConfig({
    shiki: {
        async setup(shiki) {
            await shiki.loadLanguage(
                (await import('aiscript-vscode/aiscript/syntaxes/aiscript.tmLanguage.json')).default as unknown as LanguageRegistration,
            );
        }
    }
});
