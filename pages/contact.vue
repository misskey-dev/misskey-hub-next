<template>
    <div>
        <GHero>
            <template #title>{{ $t('_contact.title') }}</template>
            <template #description>
                {{ $t('_contact.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/envelope_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
				<div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
                <div class="bg-gray-100 dark:bg-gray-800 border-4 border-accent-600 p-4 lg:p-6 rounded-xl space-y-3">
                    <h2 class="font-bold text-lg lg:text-xl text-center">よくあるお問い合わせとその回答</h2>
                    <details>
											<summary>Q. アカウントが作成できません。</summary>
											<p>A. Misskey ProjectはいかなるMisskeyサーバー・サービスの運用も行っていませんので、お問い合わせいただいても対応することができません。</p>
										</details>
										<details>
											<summary>Q. アカウントにログインできません。</summary>
											<p>A. Misskey ProjectはいかなるMisskeyサーバー・サービスの運用も行っていませんので、お問い合わせいただいても対応することができません。</p>
										</details>
                    <details>
											<summary>Q. アカウントを削除したい。</summary>
											<p>A. Misskey ProjectはいかなるMisskeyサーバー・サービスの運用も行っていませんので、お問い合わせいただいても対応することができません。</p>
										</details>
                </div>
            </div>
        </div>
        <div class="bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
                <div class="bg-gray-100 dark:bg-gray-800 p-4 lg:p-6 rounded-xl space-y-3">
                    <h2 class="font-bold text-lg lg:text-xl text-center">{{ $t('_contact.form') }}</h2>
                    <p class="text-center whitespace-pre-wrap">{{ $t('_contact.formGoogleAccountRequired') }}</p>
                    <div class="text-center">
                        <GNuxtLink to="https://docs.google.com/forms/d/e/1FAIpQLSf9hV92NTcfzZnJg_mrB11MINpBFdTf8dzGKAmzX8dvwXwZfw/viewform" target="_blank" class="btn btn-primary">
                            {{ $t('_contact.formLink') }}<ExtIco class="ml-1" />
                        </GNuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExtIco from 'bi/box-arrow-up-right.svg';

const { t } = useI18n();
const route = useRoute();

route.meta.title = t('_contact.title');
route.meta.description = t('_contact.description');
</script>

<style scoped>

</style>
