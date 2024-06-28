<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t('_api._permissions.title') }}</th>
                <th>{{ $t('_api._permissions.description') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="permission in permissions">
                <td><code>{{ permission }}</code></td>
                <td>{{ $t(`_api._permissions._types.${permission}`) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { permissions } from 'misskey-js';
</script>

<style scoped></style>