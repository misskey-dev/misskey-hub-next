<template>
	<div>
		<GNav
			:class="[
				{ 'text-white dark:text-white': (scrollPos > -40) }
			]"
			:fixed="true"
		/>
		<div class="min-h-screen h-full relative text-white dark:text-white">
			<img src="/img/historical-materials/lp/curtain.jpg" class="absolute top-0 left-0 object-cover w-full h-full pointer-events-none"/>
			<div class="w-full h-screen relative">
				<div class="absolute top-0 left-0 w-full h-full pointer-events-none" :class="$style.heroSpotLightRoot"></div>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] text-center px-6">
					<div class="mb-6">
						<span class="inline-block px-2 py-0.5 border-[6px] border-white border-double">{{ $t('_historicalMaterials.heroSubtitle') }}</span>
					</div>
					<div class="w-full">
						<MisskeyLogo class="w-[75%] mx-auto mb-2" />
						<h1 class="font-bold text-3xl lg:text-5xl mb-6"><span class="sr-only">Misskey </span>{{ $t('_historicalMaterials.title') }}</h1>
						<p class="whitespace-pre-wrap leading-relaxed">{{ $t('_historicalMaterials.heroDescription') }}</p>
					</div>
				</div>
				<div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center">
					<div class="text-center text-lg w-full mb-3">Scroll</div>
					<ChevronDownIco class="w-8 h-8 animate-bounce" />
				</div>
				<div class="absolute top-20 left-1/2 -translate-x-1/2 hidden xl:block w-full h-[calc(100vh-5rem)] max-w-screen-2xl pointer-events-none">
					<img :class="[$style.heroImages, $style.heroImagesLeft, $style.heroImages1]" src="/img/historical-materials/2014/56031e4a20b3edf83c3dd100-1.jpg" />
					<img :class="[$style.heroImages, $style.heroImagesLeft, $style.heroImages2]" src="/img/historical-materials/2015/20150201.png" />
					<img :class="[$style.heroImages, $style.heroImagesLeft, $style.heroImages3]" src="/img/historical-materials/2019/20190414.png" />
					<img :class="[$style.heroImages, $style.heroImagesRight, $style.heroImages1]" src="/img/historical-materials/2014/56002e01550f83a515819092-1.jpg" />
					<img :class="[$style.heroImages, $style.heroImagesRight, $style.heroImages2]" src="/img/historical-materials/2015/20151025.png" />
					<img :class="[$style.heroImages, $style.heroImagesRight, $style.heroImages3]" src="/img/historical-materials/2020/20200215.png" />
				</div>
			</div>
			<div class="w-full relative py-12 bg-gradient-to-t from-black to-black/50">
				<div class="container mx-auto max-w-screen-md px-6">
					<div class="p-6 border-2 border-white rounded-xl">
						<h2 class="font-bold text-lg lg:text-xl mb-3">{{ $t('_historicalMaterials.submissionTitle') }}</h2>
						<I18nT tag="p" scope="global" keypath="_historicalMaterials.submissionDescription" class="whitespace-pre-wrap">
							<template #gh_issue><GNuxtLink to="https://github.com/misskey-dev/misskey-hub-next/issues" target="_blank" class="underline-offset-4 hover:underline">GitHub Issue<ExtIco class="mx-1"/></GNuxtLink></template>
						</I18nT>
					</div>
				</div>
			</div>
		</div>
		<div class="pb-12 bg-black text-slate-200">
			<div class="container mx-auto max-w-screen-xl px-6 pt-4 space-y-12">
				<GLocalNav :items="[
					{
						name: '2014',
						anchor: '#y2014',
					},
					{
						name: '2015',
						anchor: '#y2015',
					},
					{
						name: '2016',
						anchor: '#y2016',
					},
					{
						name: '2018',
						anchor: '#y2018',
					},
					{
						name: '2019',
						anchor: '#y2019',
					},
					{
						name: '2020',
						anchor: '#y2020',
					},
					{
						name: '2024',
						anchor: '#y2024',
					},
				]" />
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2014">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2014</h3>
						</div>
					</div>
					<div>
						<div class="grid md:grid-cols-2 gap-4">
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2014/e32efd98b06f42efb19504574ce31e42.png" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">2014年7月ごろ</p>
									<p class="text-sm text-slate-300">Misskey公開。ウィンドウが並ぶ特徴的なUI</p>
								</div>
							</div>
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2014/20141100.jpg" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">2014年11月ごろ</p>
									<p class="text-sm text-slate-300">記事を公開できる「ノート機能」(※現在の「ノート」とは別)</p>
								</div>
							</div>
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2014/20141203.jpg" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">2014年12月ごろ</p>
									<p class="text-sm text-slate-300">タイムライン機能がメインになる</p>
								</div>
							</div>
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2014/56002e01550f83a515819092-1.jpg" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">時期不明</p>
									<p class="text-sm text-slate-300">しゅいろの操作ミスでデータ全消滅事件</p>
								</div>
							</div>
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2014/56031e4a20b3edf83c3dd100-1.jpg" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">時期不明</p>
									<p class="text-sm text-slate-300">この頃配布された壁紙</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2015">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2015</h3>
						</div>
					</div>
					<div class="space-y-4">
						<div>
							<img src="/img/historical-materials/2015/20150201.png" class="rounded-lg" />
							<div class="text-center mt-2">
								<p class="text-sm text-slate-300">2015年2月ごろ</p>
							</div>
						</div>
						<div>
							<img src="/img/historical-materials/2015/20151025.png" class="rounded-lg" />
							<div class="text-center mt-2">
								<p class="text-sm text-slate-300">2015年10月ごろ</p>
								<p class="text-sm text-slate-300">UIが現代のものに近づく</p>
							</div>
						</div>
					</div>
				</div>
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2016">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2016</h3>
						</div>
					</div>
					<div class="space-y-4">
						<div>
							<img src="/img/historical-materials/2016/20160501.png" class="rounded-lg" />
							<div class="text-center mt-2">
								<p class="text-sm text-slate-300">2016年5月ごろ</p>
								<p class="text-sm text-slate-300">まだ分散型ではないものの、この頃から既にいくつかサーバーがあった</p>
							</div>
						</div>
					</div>
				</div>
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2018">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2018</h3>
						</div>
					</div>
					<div>
						<div class="grid md:grid-cols-2 gap-4">
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2018/20180930.png" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">2018年9月ごろ</p>
									<p class="text-sm text-slate-300">この頃になるとUIも洗練され、現代のMisskeyとあまり変わらない。分散型になり、リアクション機能もある</p>
								</div>
							</div>
							<div :class="$style.yearContentItem">
								<div :class="$style.yearImage">
									<img src="/img/historical-materials/2018/propaganda.jpg" />
								</div>
								<div class="text-center mt-2">
									<p class="text-sm text-slate-300">2018年9月ごろ</p>
									<p class="text-sm text-slate-300">当時のプロパガンダ画像。なお画像を制作したのは海外ユーザーで、何故か藍ちゃんが管理者扱いになっている</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2019">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2019</h3>
						</div>
					</div>
					<div class="space-y-4">
						<div>
							<img src="/img/historical-materials/2019/20190414.png" class="rounded-lg" />
							<div class="text-center mt-2">
								<p class="text-sm text-slate-300">2019年4月ごろ</p>
								<p class="text-sm text-slate-300">時代は平成から令和に</p>
							</div>
						</div>
					</div>
				</div>
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2020">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2020</h3>
						</div>
					</div>
					<div class="space-y-4">
						<div>
							<img src="/img/historical-materials/2020/20200215.png" class="rounded-lg" />
							<div class="text-center mt-2">
								<p class="text-sm text-slate-300">2020年2月ごろ</p>
								<p class="text-sm text-slate-300">UIが少し変わる</p>
							</div>
						</div>
					</div>
				</div>
				<div class="grid gap-x-12 gap-y-4 w-full" :class="$style.yearRoot" id="y2024">
					<div>
						<div class="lg:sticky lg:top-32">
							<h3 class="font-bold text-2xl lg:text-2xl mb-2 lg:mb-4">2024</h3>
						</div>
					</div>
					<div class="space-y-4">
						<div>
							<img src="/img/historical-materials/2024/acbedd05d6ef418498c6b9467dd0fe6c.webp" class="rounded-lg" />
							<div class="text-center mt-2">
								<p class="text-sm text-slate-300">2024年6月</p>
								<p class="text-sm text-slate-300">現代のMisskey</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<GFooter />
	</div>
</template>

<script setup lang="ts">
import MisskeyLogo from '@/assets/svg/misskey-logotype.svg';
import ExtIco from 'bi/box-arrow-up-right.svg';
import ChevronDownIco from 'bi/chevron-down.svg';

const { t } = useI18n();
const route = useRoute();

const scrollPos = useState<number>('miHub_global_scrollPos');

definePageMeta({
	layout: 'landing',
	colorMode: 'dark',
});

route.meta.title = t('_historicalMaterials.title');
route.meta.description = t('_historicalMaterials.description');
route.meta.gNavColorMode = 'dark';
</script>

<style module>
.heroSpotLightRoot {
	background-image: radial-gradient(50px 50px at center center, rgba(255, 255, 225, .7), rgba(255, 255, 225, .7) min(30vw, 30vh), rgba(0, 0, 0, 0.5) min(60vw, 40vh));
	mix-blend-mode: darken;
}

.heroImages {
	@apply absolute hidden lg:block w-[calc(20vh/.5625)] h-[20vh] rounded-xl shadow-2xl shadow-white/30 object-cover;
}

.heroImagesLeft {
	left: 3rem;
}

.heroImagesRight {
	right: 3rem;
}

.heroImages1 {
	top: 3rem;
}

.heroImages2 {
	top: 50%;
}

.heroImages3 {
	bottom: 3rem;
}

.heroImages1.heroImagesLeft {
	transform: perspective(1000px) rotateY(30deg) skew(-10deg, 5deg) scale(0.95);
}

.heroImages2.heroImagesLeft {
	left: 1.5rem;
	transform: perspective(1000px) rotateY(30deg) translateY(-50%);
}

.heroImages3.heroImagesLeft {
	transform: perspective(1000px) rotateY(30deg) skew(10deg, -5deg) scale(0.95);
}

.heroImages1.heroImagesRight {
	transform: perspective(1000px) rotateY(-30deg) skew(10deg, -5deg) scale(0.95);
}

.heroImages2.heroImagesRight {
	right: 1.5rem;
	transform: perspective(1000px) rotateY(-30deg) translateY(-50%);
}

.heroImages3.heroImagesRight {
	transform: perspective(1000px) rotateY(-30deg) skew(-10deg, 5deg) scale(0.95);
}

.yearRoot {
	grid-template-columns: 1fr;
}

@screen lg {
	.yearRoot {
		grid-template-columns: 300px 1fr;
	}
}

.yearContentItem {
	@apply flex flex-col justify-between;
}

.yearImage {
	@apply relative w-full h-auto aspect-video text-center;
}

.yearImage img {
	@apply absolute left-1/2 -translate-x-1/2 w-auto h-auto max-w-full max-h-full rounded-lg;
}
</style>
