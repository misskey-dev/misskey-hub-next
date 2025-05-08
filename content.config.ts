import { localesConst } from './assets/data/locales';
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import type { z as Zod } from 'zod';

const markdownSharedSchema = z.object({
    maxTocDepth: z.number().optional(),
    ignoreDirBasedNav: z.boolean().optional(),
});

const steppedGuideSchema = z.object({
    _TYPE_: z.enum(['STEPPED_GUIDE']),
    guides: z.array(z.object({
        _AUTOSELECT_TYPE_: z.enum([
            'OS_ANDROID',
            'OS_IOS',
            'OS_MAC',
            'OS_WINDOWS',
            'HARD_SMARTPHONE',
            'HARD_PC',
        ]).optional(),
        _LAYOUT_TYPE_: z.enum(['IMAGE_PORTRAIT_FIXED']).optional(),
        title: z.string(),
        description: z.any(),
        steps: z.array(z.object({
            title: z.string(),
            description: z.any(),
            image: z.string().optional(),
        })),
    })),
});

export type SteppedGuide = Zod.infer<typeof steppedGuideSchema>;

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            source: 'blog/*.md',
            type: 'page',

            schema: markdownSharedSchema.extend({
                navTitle: z.string().optional(),
                date: z.string().optional(),
                thumbnail: z.string().optional(),
            }),
        }),
        ns: defineCollection({
            source: 'ns.md',
            type: 'page',
            schema: markdownSharedSchema,
        }),
        ...Object.fromEntries(localesConst.map((locale) => [
            `docs__${locale.contentIdentifier}`,
            defineCollection({
                source: `${locale.code}/docs/**/*.md`,
                type: 'page',
                schema: markdownSharedSchema,
            }),
        ])),
        ...Object.fromEntries(localesConst.map((locale) => [
            `steppedGuide__${locale.contentIdentifier}`,
            defineCollection({
                source: `${locale.code}/docs/**/*.yml`,
                type: 'page',
                schema: steppedGuideSchema,
            }),
        ])),
        ...Object.fromEntries(localesConst.map((locale) => [
            `contactFaq__${locale.contentIdentifier}`,
            defineCollection({
                source: `${locale.code}/contact-faq/**/*.md`,
                type: 'page',
                schema: markdownSharedSchema.extend({
                    question: z.string(),
                }),
            }),
        ])),
    },
});
