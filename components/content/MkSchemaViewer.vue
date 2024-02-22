<template>
    <SchemaViewerSchema :value="schema" />
</template>

<script setup lang="ts">
import * as misskeyPreDefinedSchemas from '@/assets/data/api-schemas';

const props = defineProps<{
    type: 'ref';
    refPath?: keyof typeof misskeyPreDefinedSchemas;
} | {
    type: 'openapi';
    openapiSchema?: Record<string, any>;
}>();

const schema = computed(() => {
    if (props.type === 'ref' && props.refPath) {
        return resolveRef(misskeyPreDefinedSchemas['User']);
    } else if (props.type === 'openapi' && props.openapiSchema) {
        return resolveRef(props.openapiSchema);
    }
});

const MAX_DEPTH = 1;

/** $refを一回だけ解いてあげるやつ（それ以上やると循環参照になるので断念） */
function resolveRef(openApi: Record<string, any>, depth: number = 0): Record<string, any> {
    if (typeof openApi !== 'object') return openApi;
    const outObj = { ...openApi };
    if (depth <= MAX_DEPTH && outObj.$ref) {
        const refPath = outObj.$ref.replace('#/components/schemas/', '') as keyof typeof misskeyPreDefinedSchemas;
        const resolvingRef = resolveRef(misskeyPreDefinedSchemas[refPath], depth + 1);
        return {
            name: refPath,
            ...resolvingRef,
        };
    } else if (outObj.oneOf && outObj.oneOf.length > 0) {
        outObj.oneOf = resolveArrayedRef(outObj.oneOf, depth);
    } else if (outObj.anyOf && outObj.anyOf.length > 0) {
        outObj.anyOf = resolveArrayedRef(outObj.anyOf, depth);
    } else if (outObj.allOf && outObj.allOf.length > 0) {
        outObj.allOf = resolveArrayedRef(outObj.allOf, depth);
    } else if (outObj.type === 'array') {
        outObj.items = resolveRef(outObj.items, depth);
    } else if (outObj.type === 'object') {
        const properties = outObj.properties;
        const resolvedProperties: Record<string, any> = {};
        if (!properties) return outObj;
        for (const [key, value] of Object.entries(properties)) {
            resolvedProperties[key] = resolveRef(value as Record<string, any>, depth);
        }
        outObj.properties = resolvedProperties;
    }
    return outObj;
}

function resolveArrayedRef(schemasArray: Record<string, any>[], depth: number = 0): Record<string, any>[] {
    return schemasArray.map(schema => resolveRef(schema, depth));
}
</script>

<style scoped>

</style>