import 'vue-router';
import type { Thing } from 'schema-dts';

export {};

declare module 'vue-router' {
    interface RouteMeta {
        description?: string;
        title?: string;
        graph?: Thing[];
        thumbnail?: string;
        scrollButton?: false | {
            hideFrom?: number;
            customPosition?: {
                x?: string;
                y?: string;
            };
            customClass?: string;
        };
    }
}