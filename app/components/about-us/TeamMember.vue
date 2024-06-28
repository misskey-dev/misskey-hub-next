<template>
    <GNuxtLink :to="member.id === 'crowdin' ? `https://crowdin.com/profile/${member.username}` : `https://github.com/${member.username}`" target="_blank" class="flex items-center p-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg">
        <div class="flex space-x-4 items-center">
            <img :src="member.id === 'crowdin' ? member.avatar : `https://avatars.githubusercontent.com/u/${member.id}?s=80&v=4`" class="block aspect-square flex-shrink-0 h-10 rounded-full" loading="lazy" />
            <div>
                <div class="text-lg">{{ member.name ?? '@' + member.username }}</div>
                <div v-if="member.name" class="text-sm opacity-80">{{ '@' + member.username }}</div>
            </div>
        </div>
    </GNuxtLink>
</template>

<script setup lang="ts">
import type { MiHubMember } from '@/assets/data/team-members';

defineProps<{
    member: MiHubMember;
}>();
</script>

<style scoped>

</style>