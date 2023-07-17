<template>
    <table>
        <thead>
            <tr>
                <th>Permisson</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="permission in permissions">
                <td><code>{{ permission }}</code></td>
                <td>{{ $t(`_api._permissions.${permission}`) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { permissions } from 'misskey-js';
</script>

<style scoped></style>