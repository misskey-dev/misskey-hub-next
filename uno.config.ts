import { defineConfig, presetWind3, transformerDirectives } from 'unocss';

export default defineConfig({
    presets: [
        presetWind3(),
    ],
    transformers: [
        transformerDirectives(),
    ],
    theme: {
        colors: {
            'accent': {
                '50': '#fcffe5',
                '100': '#f6ffc7',
                '200': '#ecff95',
                '300': '#dcfe58',
                '400': '#c9f526',
                '500': '#aadc06',
                '600': '#86b300',
                '700': '#638506',
                '800': '#4f690b',
                '900': '#42580f',
                '950': '#223201',
            },
        },
    },
    extendTheme: (theme) => {
        theme.breakpoints = {
            ...(theme.breakpoints ?? {}),
            xs: '475px',
            '3xl': '1970px',
        };
        theme.fontFamily = {
            sans: ['Nunito', 'var(--mi-localized-font, \'\')', theme.fontFamily?.sans ?? 'sans-serif'].join(','),
            title: ['Nunito', 'var(--mi-localized-font, \'\')', theme.fontFamily?.sans ?? 'sans-serif'].join(','),
            'content-sans': ['Nunito', 'var(--mi-localized-font-p, \'\')', theme.fontFamily?.sans ?? 'sans-serif'].join(','),
        };
    },
});
