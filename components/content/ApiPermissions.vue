<template>
    <div>
        <p>Version: v{{ misskeyJsVersion }}</p>
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
    </div>
</template>

<script setup lang="ts">
import { permissions } from 'misskey-js';

const runtimeConfig = useRuntimeConfig();
const misskeyJsVersion = runtimeConfig.public.misskeyJsVersion ?? '';
</script>

<style scoped></style>