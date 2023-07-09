<template>
    <div>
        <GHero>
            <template #title>{{ $t('_servers.title') }}</template>
            <template #description>
                {{ $t('_servers.description') }}<br>
                <I18nT keypath="_servers.addYourServer" tag="span">
                    <NuxtLink class="font-bold hover:underline underline-offset-4" to="https://github.com/joinmisskey/api">{{ $t('_servers.addYourServerLink') }}</NuxtLink>
                </I18nT>
            </template>
            <template #icon>
                <div class="relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative bg-white dark:bg-slate-800 shadow-lg rounded-lg lg:w-72 p-6 space-y-4">
                        <dl>
                            <dt>{{ $t('_servers._statistics.notes') }}</dt>
                            <dd class="font-bold text-accent-600 text-2xl">{{ data?.stats.notesCount.toLocaleString() }}</dd>
                        </dl>
                        <dl>
                            <dt>{{ $t('_servers._statistics.users') }}</dt>
                            <dd class="font-bold text-accent-600 text-2xl">{{ data?.stats.usersCount.toLocaleString() }}</dd>
                        </dl>
                        <dl>
                            <dt>{{ $t('_servers._statistics.servers') }}</dt>
                            <dd class="font-bold text-accent-600 text-2xl">{{ data?.stats.instancesCount.toLocaleString() }}</dd>
                        </dl>
                    </div>
                </div>
            </template>
        </GHero>
        <div class="mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-xl px-6 grid server-list gap-8">
                <aside class="hidden lg:block">
                    <div class="sticky top-6 py-2 space-y-4">
                        <h3 class="text-xl font-bold">絞り込み検索</h3>
                        <div>
                            <label class="form-label" for="languages">{{ $t('_servers._search.lang') }}</label>
                            <select id="languages" class="form-select">
                                <option :value="null">{{ $t('_servers._search.all') }}</option>
                                <option v-for="lang in langs" :value="lang.lang">{{ lang.label }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label" for="orderBy">{{ $t('_servers._search.orderBy') }}</label>
                            <select id="orderBy" class="form-select">
                                <option value="recomendded">{{ $t('_servers._search.recomendded') }}</option>
                                <option value="notesCount">{{ $t('_servers._search.notesCount') }}</option>
                                <option value="usersCount">{{ $t('_servers._search.usersCount') }}</option>
                            </select>
                        </div>
                        <div>
                            <div class="mb-1">{{ $t('_servers._search._registerAcceptance.title') }}</div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="registerAcceptance" :value="null" id="registerAcceptance0">
                                <label class="form-check-label" for="registerAcceptance0">
                                    {{ $t('_servers._search.all') }}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="registerAcceptance" value="public" id="registerAcceptance1">
                                <label class="form-check-label" for="registerAcceptance1">
                                    {{ $t('_servers._search._registerAcceptance.public') }}
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="registerAcceptance" value="inviteOnly" id="registerAcceptance2">
                                <label class="form-check-label" for="registerAcceptance2">
                                    {{ $t('_servers._search._registerAcceptance.inviteOnly') }}
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>
                <div class="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InstanceInfo } from '@/types/instances-info';
import langs from '@/assets/data/lang';

const { t, locale } = useI18n();
const route = useRoute();

route.meta.title = t('_servers.title');
route.meta.description = t('_servers.description');

const { data } = await useFetch<InstanceInfo>('https://instanceapp.misskey.page/instances.json', {
    onRequestError: () => {
        alert(t('_servers._system.fetchError'));
    }
});

</script>

<style scoped>
@screen lg {
    .server-list {
        grid-template-columns: 300px 1fr;
    }
}
</style>