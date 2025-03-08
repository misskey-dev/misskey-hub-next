import type { MarkdownShared, SteppedGuide } from '../../../content.config.js';

export function assertIsSteppedGuide(c: MarkdownShared): c is SteppedGuide {
    return c._TYPE_ === 'STEPPED_GUIDE';
}
