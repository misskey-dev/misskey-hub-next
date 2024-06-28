import type { NavSection } from "./nav";

export default <NavSection[]>[
    {
        title: "_tools._forUsers.title",
        items: [
            {
                i18n: "_mfmPlayground.title",
                description: "_mfmPlayground.description",
                to: "/tools/mfm-playground/",
            },
            {
                i18n: "_avatarDecorationPreview.title",
                description: "_avatarDecorationPreview.description",
                to: "/tools/avatar-decoration-preview/",
            },
            {
                i18n: "_customEmojiPreview.title",
                description: "_customEmojiPreview.description",
                to: "/tools/custom-emoji-preview/",
            },
            {
                i18n: "_shareLinkGenerator.title",
                description: "_shareLinkGenerator.description",
                to: "/tools/share-link-generator/",
            },
            {
                i18n: '_identiconGenerator.title',
                description: '_identiconGenerator.description',
                to: '/tools/identicon-generator/',
            },
        ],
    },
    {
        title: "_tools._forAdmin.title",
        items: [
            {
                i18n: "_aidConverter.title",
                description: "_aidConverter.description",
                to: "/tools/aid-converter/",
            },
        ],
    }
];