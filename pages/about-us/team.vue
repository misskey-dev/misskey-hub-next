<template>
    <div>
        <GHero>
            <template #title>{{ $t('_aboutUs._team.title') }}</template>
            <template #description>
                {{ $t('_aboutUs._team.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64 h-64 flex items-center">
                        <img class="drop-shadow-xl rounded-xl" src="/img/emojis/technologist_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-xl px-6 pt-4 space-y-8">
                <div class="grid gap-x-12 gap-y-4 w-full" :class="$style.teamRoot">
                    <div>
                        <div class="lg:sticky lg:top-32">
                            <h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">{{ $t('_aboutUs._team._core.title') }}</h3>
                            <p>{{ $t('_aboutUs._team._core.description') }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <AboutUsTeamMember v-for="member in coreTeamMember" :member="member" />
                    </div>
                </div>
                <div class="grid gap-x-12 gap-y-4 w-full" :class="$style.teamRoot">
                    <div>
                        <div class="lg:sticky lg:top-32">
                            <h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">{{ $t('_aboutUs._team._coreEmeriti.title') }}</h3>
                            <p>{{ $t('_aboutUs._team._coreEmeriti.description') }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <AboutUsTeamMember v-for="member in coreTeamEmeriti" :member="member" />
                    </div>
                </div>
                <div class="grid gap-x-12 gap-y-4 w-full" :class="$style.teamRoot">
                    <div>
                        <div class="lg:sticky lg:top-32">
                            <h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">{{ $t('_aboutUs._team._contributors.title') }}</h3>
                            <p>{{ $t('_aboutUs._team._contributors.description') }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <AboutUsTeamMember v-for="member in contributors" :member="member" />
                        <GNuxtLink to="https://github.com/misskey-dev/misskey/graphs/contributors" target="_blank" class="block p-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg">
                            <div class="flex h-full w-full items-center">
                                <div class="text-lg">{{ $t('_aboutUs._team._contributors.seeMore') }}</div>
                                <ExtIco class="block ml-auto" />
                            </div>
                        </GNuxtLink>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExtIco from 'bi/box-arrow-up-right.svg';
import { coreTeamMember, coreTeamEmeriti } from '@/assets/data/team-members';
import type { MiHubMember } from '@/assets/data/team-members';

const { t } = useI18n();

const { data } = await useFetch<{ contributors: MiHubMember[] }>('https://ungh.cc/repos/misskey-dev/misskey/contributors', {
    onRequestError: () => {
        alert(t('_servers._system.fetchError'));
    }
});

const contributors = computed(() => data.value?.contributors.filter((v) => !v.username?.includes('[bot]') && !coreTeamMember.map((e) => e.id).includes(v.id)) ?? []);

const localePath = useLocalePath();
</script>

<style module>
.teamRoot {
	grid-template-columns: 1fr;
}

@screen lg {
	.teamRoot {
		grid-template-columns: 300px 1fr;
	}
}

</style>