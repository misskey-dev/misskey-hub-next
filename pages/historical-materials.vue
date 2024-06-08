<template>
	<div>
			<GHero>
					<template #title>{{ $t('_historicalMaterials.title') }}</template>
					<template #description>
							{{ $t('_historicalMaterials.description') }}
					</template>
					<template #icon>
							<div class="hidden lg:block relative px-6 py-8">
									<GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
									<GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
									<div class="relative lg:w-64 h-64 flex items-center">
											<img class="drop-shadow-xl rounded-xl" src="/img/emojis/classical_building_3d.png" />
									</div>
							</div>
					</template>
			</GHero>
			<div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
					<div class="container mx-auto max-w-screen-xl px-6 pt-4 space-y-8">
							<GLocalNav :items="[
									{
											name: '2014',
											anchor: '#2014',
									},
									{
											name: '2015',
											anchor: '#2015',
									},
									{
											name: '2016',
											anchor: '#2016',
									},
									{
											name: '2018',
											anchor: '#2018',
									},
									{
											name: '2019',
											anchor: '#2019',
									},
									{
											name: '2020',
											anchor: '#2020',
									},
									{
											name: '2024',
											anchor: '#2024',
									},
							]" />
							<div>昔の資料をお持ちの方はぜひ当館まで寄贈ください。</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2014">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2014</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2014/e32efd98b06f42efb19504574ce31e42.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2014年7月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">Misskey公開。ウィンドウが並ぶ特徴的なUI</p>
													</div>
												</div>
												<div>
													<img src="/img/historical-materials/2014/20141100.jpg" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2014年11月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">記事を公開できる「ノート機能」(※現在の「ノート」とは別)</p>
													</div>
												</div>
												<div>
													<img src="/img/historical-materials/2014/20141203.jpg" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2014年12月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">タイムライン機能がメインになる</p>
													</div>
												</div>
												<div>
													<img src="/img/historical-materials/2014/56002e01550f83a515819092-1.jpg" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">時期不明</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">しゅいろの操作ミスでデータ全消滅事件</p>
													</div>
												</div>
												<div>
													<img src="/img/historical-materials/2014/56031e4a20b3edf83c3dd100-1.jpg" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">時期不明</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">この頃配布された壁紙</p>
													</div>
												</div>
											</div>
									</div>
							</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2015">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2015</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2015/20150201.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2015年2月ごろ</p>
													</div>
												</div>
											</div>
											<div>
													<img src="/img/historical-materials/2015/20151025.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2015年10月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">UIが現代のものに近づく</p>
													</div>
												</div>
									</div>
							</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2016">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2016</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2016/20160501.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2016年5月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">まだ分散型ではないものの、この頃から既にいくつかサーバーがあった</p>
													</div>
												</div>
											</div>
											</div>
									</div>
							</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2018">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2018</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2018/20180930.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2018年9月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">この頃になるとUIも洗練され、現代のMisskeyとあまり変わらない。分散型になり、リアクション機能もある</p>
													</div>
											</div>
											<div>
													<img src="/img/historical-materials/2018/propaganda.jpg" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2018年9月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">当時のプロパガンダ画像</p>
													</div>
											</div>
										</div>
									</div>
							</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2019">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2019</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2019/20190414.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2019年4月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">時代は平成から令和に</p>
													</div>
											</div>
											</div>
									</div>
							</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2020">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2020</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2020/20200215.png" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2020年2月ごろ</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">UIが少し変わる</p>
													</div>
											</div>
											</div>
									</div>
							</div>
							<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="2024">
									<div>
											<div class="lg:sticky lg:top-32">
													<h3 class="font-title font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2024</h3>
											</div>
									</div>
									<div>
											<div class="grid md:grid-cols-2 gap-4">
												<div>
													<img src="/img/historical-materials/2024/acbedd05d6ef418498c6b9467dd0fe6c.webp" class="rounded-lg" />
													<div class="text-center mt-2">
														<p class="text-sm text-gray-600 dark:text-gray-400">2024年6月</p>
														<p class="text-sm text-gray-600 dark:text-gray-400">現代のMisskey</p>
													</div>
											</div>
											</div>
									</div>
							</div>
					</div>
			</div>
	</div>
</template>

<script setup lang="ts">
import ExtIco from 'bi/box-arrow-up-right.svg';
import { locales } from '@/assets/data/locales';
import { coreTeamMember, coreTeamEmeriti } from '@/assets/data/team-members';
import { hubI18nMembers } from '@/assets/data/i18n-members';
import type { MiHubMember } from '@/assets/data/team-members';

const { t } = useI18n();
const route = useRoute();

const { data } = await useFetch<{ contributors: MiHubMember[] }>('https://ungh.cc/repos/misskey-dev/misskey/contributors', {
	onRequestError: () => {
			alert(t('_servers._system.fetchError'));
	}
});

const contributors = computed(() =>
data.value?.contributors.filter((v) =>
!v.username?.includes('[bot]') && !coreTeamMember.map((e) => e.id).includes(v.id) && !coreTeamEmeriti.map((e) => e.id).includes(v.id))
);

route.meta.title = t('_aboutUs._team.title');
route.meta.description = t('_aboutUs._team.description');
</script>

<style module>
.yearRoot {
grid-template-columns: 1fr;
}

@screen lg {
.yearRoot {
	grid-template-columns: 300px 1fr;
}
}

</style>
