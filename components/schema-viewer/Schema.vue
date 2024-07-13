<script lang="ts" setup>
import { computed } from 'vue'
import type { OpenAPIV3_1 } from 'openapi-types';

import SchemaHeading from './SchemaHeading.vue'
import SchemaProperty from './SchemaProperty.vue'

const props = withDefaults(
    defineProps<{
        value?: OpenAPIV3_1.SchemaObject | string
        /** Track how deep we’ve gone */
        level?: number
        /* Show as a heading */
        name?: string
        /** A tighter layout with less borders and without a heading */
        compact?: boolean
        /** Shows a toggle to hide/show children */
        noncollapsible?: boolean
    }>(),
    {
        level: 0,
        noncollapsible: false,
    },
)

const shouldShowToggle = computed(() => {
    if (props.noncollapsible || props.level === 0) return false
    return true
})

// Merge the (optional) `additionalProperties` into the schema
const mergedSchema = computed<OpenAPIV3_1.SchemaObject>(() => {
    return {
        ...(typeof props.value === 'object' ? props.value : {}),
        ...(typeof props.value === 'object' &&
            typeof props.value?.additionalProperties === 'object'
            ? props.value?.additionalProperties
            : {}),
    }
})

// Prevent click action if noncollapsible
const handleClick = (e: MouseEvent) => props.noncollapsible && e.stopPropagation()

// openState
const open = ref(props.noncollapsible);

</script>
<template>
    <div
        v-if="typeof value === 'object' && Object.keys(value).length && (level == null || level < 4)"
        class="schema-card"
        :class="[
            `schema-card--level-${level}`,
            { 'schema-card--compact': compact, 'schema-card--open': open },
        ]">
        <details
            class="schema-properties"
            :class="{ 'schema-properties-open': open }"
            :open="level === 0 || open || noncollapsible"
        >
            <summary
                v-show="!(noncollapsible && compact)"
                :as="noncollapsible ? 'div' : 'button'"
                class="schema-card-title"
                :class="{ 'schema-card-title--compact': compact }"
                :style="{
                    top: `calc(var(--refs-header-height) +  calc(var(--schema-title-height) * ${level}))`,
                }"
                @click.capture="handleClick">
                <template v-if="compact">
                    <svg
                        v-if="shouldShowToggle"
                        class="schema-card-title-icon"
                        :class="{ 'schema-card-title-icon--open': open }"
                        fill="currentColor"
                        height="14"
                        viewBox="0 0 14 14"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg">
                        <polygon
                            fill-rule="nonzero"
                            points="14 8 8 8 8 14 6 14 6 8 0 8 0 6 6 6 6 0 8 0 8 6 14 6" />
                    </svg>
                    <template v-if="open">Hide Child Attributes</template>
                    <template v-else>Show Child Attributes</template>
                </template>
                <template v-else>
                    <!--<ScalarIcon
                        v-if="shouldShowToggle"
                        class="schema-card-title-icon"
                        :class="{ 'schema-card-title-icon--open': open }"
                        icon="ChevronRight"
                        size="md" />-->
                    <SchemaHeading
                        :name="name"
                        :value="mergedSchema" />
                </template>
            </summary>
            <div>
                <template v-if="mergedSchema?.properties">
                    <SchemaProperty
                        v-for="property in Object.keys(mergedSchema?.properties)"
                        :key="property"
                        :compact="compact"
                        :level="level"
                        :name="property"
                        :required="mergedSchema.required &&
                            mergedSchema.required.length > 0 &&
                            mergedSchema.required.includes(property)
                            "
                        :value="mergedSchema.properties?.[property]" />
                </template>
                <template v-else>
                    <SchemaProperty
                        :compact="compact"
                        :level="level"
                        :name="mergedSchema?.name"
                        :value="mergedSchema" />
                </template>
            </div>
        </details>
    </div>
</template>
<style scoped>
.error {
    background-color: red;
}

.schema-card {
    @apply relative text-sm rounded-lg border border-gray-200 dark:border-gray-800;
}

.schema-card-title {
    @apply relative flex items-center gap-1 px-4 py-3 bg-gray-100 rounded-t-lg justify-between cursor-pointer border-b border-gray-200 dark:border-gray-800;
}

button.schema-card-title {
    cursor: pointer;
}

button.schema-card-title:hover {
    color: var(--theme-color-1, var(--default-theme-color-1));
}

.schema-card-title-icon {
    margin-left: -4px;
}

.schema-card-title-icon--open {
    transform: rotate(90deg);
}

.schema-properties-open>.schema-card-title {
    z-index: 1;
    position: sticky;
    top: var(--refs-header-height);

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid var(--theme-border-color, var(--default-theme-border-color));
}

.schema-card .property:last-of-type {
    padding-bottom: 10px;
}

.schema-properties {
    display: flex;
    flex-direction: column;

    border: 1px solid var(--theme-border-color, var(--default-theme-border-color));
    border-radius: var(--theme-radius-lg, var(--default-theme-radius-lg));
}

.schema-card--compact {
    align-self: start;
}

.schema-card--compact.schema-card--open {
    align-self: initial;
}

.schema-card-title--compact {
    color: var(--theme-color-3, var(--default-theme-color-3));
    padding: 6px 10px;
    height: auto;
    border-bottom: none;
}

.schema-card--compact>.schema-properties,
.schema-card-title--compact {
    border-radius: 13.5px;
}

.schema-card-title--compact>.schema-card-title-icon {
    width: 10px;
    height: 10px;
    margin: 0;
}

.schema-card-title--compact>.schema-card-title-icon--open {
    transform: rotate(45deg);
}

.schema-properties-open>.schema-card-title--compact {
    position: static;
}

.schema-card--compact.schema-card--level-0>.schema-properties {
    border: none;
}</style>