<template>
    <div>
        {{ keys }}
    </div>
</template>

<script setup lang="ts">
import { Endpoints } from 'misskey-js';
function getEndpointKeys<T extends Record<string, unknown>>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}

const keys = getEndpointKeys({} as Endpoints)
</script>

<style scoped>

</style>