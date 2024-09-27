import * as Misskey from 'misskey-js';

export const getIOMeta = async (): Promise<Misskey.entities.MetaDetailed> => {
    if (!import.meta.client) {
        return {} as Misskey.entities.MetaDetailed;
    }
    if (!sessionStorage.getItem('miHub_io_meta')) {
        const meta = await fetch('https://misskey.io/api/meta');

        const metaText = await meta.text();
        sessionStorage.setItem('miHub_io_meta', metaText);

        return JSON.parse(metaText);
    } else {
        return JSON.parse(sessionStorage.getItem('miHub_io_meta') ?? '');
    }
}

export const getIOEmoji = async (): Promise<{ emojis: Misskey.entities.EmojiSimple[] }> => {
    if (!import.meta.client) {
        return { emojis: [] };
    }
    if (!localStorage.getItem('miHub_io_emoji')) {
        const emoji = await fetch('https://misskey.io/api/emojis');

        const emojiText = await emoji.text();
        localStorage.setItem('miHub_io_emoji', emojiText);

        return JSON.parse(emojiText);
    } else {
        return JSON.parse(localStorage.getItem('miHub_io_emoji') ?? '');
    }
}