<template>
    <div>
        <div class="markdown-body mb-4">
            <div class="font-semibold"><GNuxtLink :to="localePath('/docs/for-developers/api/endpoints/')">{{ $t('_api._endpoints.title') }}</GNuxtLink></div>
            <h1 class="!mt-0 font-mono">/{{ apiData.title }}</h1>
        </div>
        <div class="space-y-4 mb-8 last:mb-0" v-for="detail, method in apiData.data">
            <div class="markdown-body">
                <h2 class="flex items-baseline">
                    <span class="text-[75%] inline-block bg-sky-600 py-0.5 px-1 mr-1 rounded text-white">{{ method.toUpperCase() }}</span>{{ $t('_api._apiRenderer.description') }}
                    <GNuxtLink class="font-normal text-sm ml-auto" :to="detail.externalDocs.url" target="_blank">{{ $t('_api._apiRenderer.seeImplementation') }}<ExtIco class="ml-1" /></GNuxtLink>
                </h2>
                <MDC :value="detail.description" />
            </div>
            <div class="markdown-body">
                <h3>{{ $t('_api._apiRenderer.requestBody') }}</h3>
                <template v-for="res, contentType in detail.requestBody.content">
                    <MkSchemaViewer :type="'openapi'" :openapiSchema="res.schema" />
                    <GDetails summary="Raw JSON Schema">
                        <MDC :value="`\`\`\`json\n${JSON.stringify(res.schema, null, 2)}\n\`\`\``" />
                    </GDetails>
                </template>
                <MkSchemaViewer :type="'openapi'" :openApiSchema="detail.requestBody.content[0].schema" />
            </div>
            <details class="group my-4" v-for="response, code in detail.responses" :open="code <= 399">
                <summary class="cursor-pointer outline-none p-2 border dark:border-slate-800 rounded-lg bg-white dark:bg-slate-700 shadow-md group-open:rounded-b-none group-open:bg-slate-200 dark:group-open:bg-slate-800 group-open:shadow-none group-open:border-b-0">
                    <h3 class="inline-block font-bold text-lg">
                        <span
                            class="text-[75%] font-mono align-center inline-block leading-none py-0.5 px-1 mr-1 rounded text-white"
                            :class="{
                                'bg-green-600': (code >= 200 && code <= 299),
                                'bg-yellow-600': (code >= 300 && code <= 399),
                                'bg-orange-600': (code >= 400 && code <= 499),
                                'bg-red-600': (code >= 500 && code <= 599),
                                'bg-sky-600': (code < 200 || code > 600 || !code),
                            }"
                        >{{ code }}</span>
                        {{ code >= 400 ? $t('_api._apiRenderer.error') : $t('_api._apiRenderer.responseBody') }} <small>{{ $t(`_api._responseCodes[${code}]`) }}</small>
                    </h3>
                </summary>
                <div class="rounded-b-lg border dark:border-slate-800 p-3 bg-white dark:bg-slate-900 markdown-body">
                    <p v-if="code == 204 || !response.content" class="text-center">{{ $t('_api._paramViewer._header.none') }}</p>
                    <template v-else v-for="res, contentType in response.content">
                        <MkSchemaViewer :type="'openapi'" :openapiSchema="res.schema" />
                        <GDetails summary="Raw JSON Schema">
                            <MDC :value="`\`\`\`json\n${JSON.stringify(res.schema, null, 2)}\n\`\`\``" />
                        </GDetails>
                    </template>
                </div>
            </details>

            <div class="pt-4 markdown-body">
                <GDetails summary="Raw JSON Schema">
                    <MDC :value="`\`\`\`json\n${JSON.stringify(apiData.data, null, 2)}\n\`\`\``" />
                </GDetails>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExtIco from 'bi/box-arrow-up-right.svg';
import type { MiDocsParsedContentApi } from '@/types/content';

defineProps<{
    apiData: MiDocsParsedContentApi;
}>();

const localePath = useLocalePath();
</script>

<style scoped>

</style>