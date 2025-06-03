<template>
<main class="main">
	<section class="section_top _primaryWidth">
		<div class="section_top_tagline"><strong>Create.<br>Connect.<br>with <b class="_textGradient">Misskey</b>.</strong></div>
		<div class="section_top_description">{{ $t('_landing._hero.description') }}</div>
		<GNuxtLink v-if="notice" class="notice _plainLink" :to="isLocalPath(notice.to) ? localePath(notice.to) : notice.to" :target="!isLocalPath(notice.to) ? '_blank' : undefined">
			<div class="noticeInner">
				<div class="noticeIconBase">
					<MegaphoneIco style="width: 16px; height: 16px;" />
				</div>
				<span>{{ localizedNotice }}</span>
				<ArrowRightIco v-if="isLocalPath(notice.to)" />
				<ArrowUpRightIco v-else />
			</div>
		</GNuxtLink>
		<div class="section_top_buttons">
			<GButton button-type="button" shadow color="accent" @click="scrollTo('#getStarted')">{{ $t('_landing._hero.gettingStarted') }}</GButton>
			<GButton button-type="button" @click="scrollTo('#introduction')">{{ $t('learnMore') }}</GButton>
		</div>
	</section>

	<section class="section_keyFeatures _primaryWidth">
		<div class="section_keyFeatures_item acrylic">
			<div class="section_keyFeatures_itemIcon"><img src="/img/emojis/four-leaf-clover_1f340.png" aria-hidden="true"></div>
			<h3 class="section_keyFeatures_itemTitle">{{ $t('_landing._keyFeatures._open.title') }}</h3>
			<div class="section_keyFeatures_itemDescription">{{ $t('_landing._keyFeatures._open.description') }}</div>
		</div>
		<div class="section_keyFeatures_item acrylic">
			<div class="section_keyFeatures_itemIcon"><img src="/img/emojis/ringed-planet_1fa90.png" aria-hidden="true"></div>
			<h3 class="section_keyFeatures_itemTitle">{{ $t('_landing._keyFeatures._federated.title') }}</h3>
			<div class="section_keyFeatures_itemDescription">{{ $t('_landing._keyFeatures._federated.description') }}</div>
		</div>
		<div class="section_keyFeatures_item acrylic">
			<div class="section_keyFeatures_itemIcon"><img src="/img/emojis/package_1f4e6.png" aria-hidden="true"></div>
			<h3 class="section_keyFeatures_itemTitle">{{ $t('_landing._keyFeatures._powerful.title') }}</h3>
			<div class="section_keyFeatures_itemDescription">{{ $t('_landing._keyFeatures._powerful.description') }}</div>
		</div>
	</section>

	<section class="section_getStarted _primaryWidth" id="getStarted">
		<div class="section_getStarted_titleContainer acrylic">
			<h2 class="section_getStarted_titleContainer_title"><b v-text-underline>{{ $t('_landing._getStarted.title') }}</b></h2>
		</div>
		<div class="section_getStarted_items">
			<div class="section_getStarted_itemContainer">
				<div class="section_getStarted_item acrylic">
					<img class="section_getStarted_item_icon" src="/img/emojis/package_color.svg" aria-hidden="true">
					<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._create.title') }}</b>
					<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/docs/for-admin/install/guides/')">{{ $t('_landing._getStarted._create.guide') }}<ArrowRightIco /></GButton>
				</div>
			</div>
			<div class="section_getStarted_itemContainer">
				<div class="section_getStarted_item acrylic">
					<img class="section_getStarted_item_icon" src="/img/emojis/light_bulb_color.svg" aria-hidden="true">
					<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._docs.title') }}</b>
					<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/docs')">{{ $t('_landing._getStarted._docs.docs') }}<ArrowRightIco /></GButton>
				</div>
			</div>
			<div class="section_getStarted_itemContainer">
				<div class="section_getStarted_item acrylic">
					<img class="section_getStarted_item_icon" src="/img/emojis/ringed_planet_color.svg" aria-hidden="true">
					<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._find.title') }}</b>
					<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/servers')">{{ $t('_landing._getStarted._find.list') }}<ArrowRightIco /></GButton>
				</div>
			</div>
			<div class="section_getStarted_itemContainer">
				<div class="section_getStarted_item acrylic">
					<img class="section_getStarted_item_icon" src="/img/emojis/hammer_and_wrench_color.svg" aria-hidden="true">
					<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._dev.title') }}</b>
					<GButton class="section_getStarted_item_button" color="accent" buttonType="link" to="https://github.com/misskey-dev">GitHub<ArrowUpRightIco /></GButton>
				</div>
			</div>
		</div>
	</section>

	<section class="section_donationAndSponsors _primaryWidth">
		<div class="section_donationAndSponsors_content acrylic">
			<section class="section_donationAndSponsors_sponsors">
				<IndexSponsors />
			</section>
			<section class="section_donationAndSponsors_donation">
				<h2 class="section_donationAndSponsors_donationTitle">{{ $t('_landing._donation.title') }}</h2>
				<p class="section_donationAndSponsors_donationDescription">{{ $t('_landing._donation.description') }}</p>
				<div>
					<GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
				</div>
			</section>
		</div>
	</section>

	<section class="section_introduction _primaryWidth" id="introduction">
		<div class="section_introduction_content">
			<h2 class="section_introduction_content_title"><b v-text-underline>{{ $t('_landing._introduction.title') }}</b></h2>
			<div class="section_introduction_content_description">{{ $t('_landing._introduction.description') }}</div>
		</div>
		<div class="swiper acrylic">
			<div class="swiper-wrapper">
				<div class="swiper-slide"><img class="swiper-slide-image" src="/img/hero/misskey-light.png"></div>
				<div class="swiper-slide"><img class="swiper-slide-image" src="/img/hero/ss-jobqueue.light.png"></div>
				<div class="swiper-slide"><img class="swiper-slide-image" src="/img/hero/misskey-light.png"></div>
				<div class="swiper-slide"><img class="swiper-slide-image" src="/img/hero/misskey-light.png"></div>
				<div class="swiper-slide"><img class="swiper-slide-image" src="/img/hero/misskey-light.png"></div>
			</div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</section>

	<section class="introductionTip _primaryWidth">
		<b class="" style="background: #9ad11b; color: #000; border-radius: 999px; padding: 4px 16px; margin-right: 16px;">TIP:</b>
		<span>{{ $t('_landing._introduction.tip') }}</span>
	</section>

	<section class="section_decentralized _secondaryWidth">
		<div v-fade-in="'right'">
			<div class="section_decentralized_cloudContainer">
				<div class="section_decentralized_cloudContainer_cloud"></div>
			</div>
		</div>
		<div v-fade-in="'left'">
			<div class="section_decentralized_content">
				<h2 class="section_decentralized_title"><b v-text-underline>{{ $t('_landing._decenterized.title') }}</b></h2>
				<div class="section_decentralized_description">
					<I18nT scope="global" keypath="_landing._decenterized.description" tag="div">
						<b v-text-underline>{{ $t('_landing._decenterized.activityPub') }}</b>
					</I18nT>
					<GButton buttonType="link" color="accent" style="margin-top: 12px;">{{ $t('learnMore') }}</GButton>
				</div>
			</div>
		</div>
	</section>

	<section class="section_useCases _primaryWidth">
		<div class="_secondaryWidth">
			<div v-fade-in="'up'">
				<h2 class="section_useCases_title">{{ $t('_landing._useCases.title') }}</h2>
			</div>
			<div class="section_useCases_items">
				<div v-fade-in="'up'">
					<div class="section_useCases_item">
						<div class="section_useCases_itemIcon"><img src="/img/emojis/house_color.svg" aria-hidden="true"></div>
						<b class="section_useCases_itemLabel">Single</b>
						<h3 class="section_useCases_itemTitle">{{ $t('_landing._useCases.single') }}</h3>
					</div>
				</div>
				<div v-fade-in="'up'">
					<div class="section_useCases_item">
						<div class="section_useCases_itemIcon"><img src="/img/emojis/check_mark_button_color.svg" aria-hidden="true"></div>
						<b class="section_useCases_itemLabel">Official</b>
						<h3 class="section_useCases_itemTitle">{{ $t('_landing._useCases.official') }}</h3>
					</div>
				</div>
				<div v-fade-in="'up'">
					<div class="section_useCases_item">
						<div class="section_useCases_itemIcon"><img src="/img/emojis/globe_with_meridians_color.svg" aria-hidden="true"></div>
						<b class="section_useCases_itemLabel">Community</b>
						<h3 class="section_useCases_itemTitle">{{ $t('_landing._useCases.community') }}</h3>
					</div>
				</div>
				<div v-fade-in="'up'">
					<div class="section_useCases_item">
						<div class="section_useCases_itemIcon"><img src="/img/emojis/locked_color.svg" aria-hidden="true"></div>
						<b class="section_useCases_itemLabel">Private</b>
						<h3 class="section_useCases_itemTitle">{{ $t('_landing._useCases.inHouse') }}</h3>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section_free _primaryWidth">
		<GDots class="dotsBg" :space="30" />

		<div v-fade-in="'up'">
			<div class="section_free_content _secondaryWidth">
				<div class="section_free_main">
					<h2 class="section_free_title"><b v-text-underline>{{ $t('_landing._free.title') }}🍀</b></h2>
					<div class="section_free_description">{{ $t('_landing._free.description') }}</div>
					<div>
						<GButton buttonType="link" to="https://github.com/misskey-dev" color="accent">View GitHub</GButton>
						<GButton buttonType="link" :to="localePath('/docs/donate/')">Donate</GButton>
					</div>
				</div>
				<div class="section_free_sub">
					<div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
						<img src="/midev.png" class="section_free_sub_icon" style="border-radius: 6px;" />
						<div> x </div>
						<GHIcon class="section_free_sub_icon" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section_features _primaryWidth">
		<div v-fade-in="'up'">
			<div class="section_features_bg">
				<IndexHeroBg/>
			</div>
		</div>
		<div class="section_features_bgText">
			<div v-fade-in="'up'">
				<svg style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" width="100%" height="100%" viewBox="0 0 161 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
					<g transform="matrix(1,0,0,1,-69.945,-39.89)">
						<path d="M70.665,59.75L73.095,59.75C73.545,59.75 73.815,59.48 73.815,59.03L73.815,52.37L81.945,52.37C82.395,52.37 82.665,52.1 82.665,51.65L82.665,49.46C82.665,49.01 82.395,48.74 81.945,48.74L73.815,48.74L73.815,43.91L82.515,43.91C82.965,43.91 83.235,43.64 83.235,43.19L83.235,40.97C83.235,40.52 82.965,40.25 82.515,40.25L70.665,40.25C70.215,40.25 69.945,40.52 69.945,40.97L69.945,59.03C69.945,59.48 70.215,59.75 70.665,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M90.075,59.75L101.835,59.75C102.285,59.75 102.555,59.48 102.555,59.03L102.555,56.93C102.555,56.48 102.285,56.21 101.835,56.21L93.225,56.21L93.225,51.77L101.205,51.77C101.655,51.77 101.925,51.5 101.925,51.05L101.925,48.95C101.925,48.5 101.655,48.23 101.205,48.23L93.225,48.23L93.225,43.79L101.835,43.79C102.285,43.79 102.555,43.52 102.555,43.07L102.555,40.97C102.555,40.52 102.285,40.25 101.835,40.25L90.075,40.25C89.625,40.25 89.355,40.52 89.355,40.97L89.355,59.03C89.355,59.48 89.625,59.75 90.075,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M108.705,59.75L111.315,59.75C111.705,59.75 111.975,59.54 112.125,59.18L113.175,56.54L121.185,56.54L122.235,59.18C122.385,59.54 122.655,59.75 123.045,59.75L125.655,59.75C126.195,59.75 126.435,59.39 126.225,58.91L118.905,40.82C118.755,40.46 118.455,40.25 118.065,40.25L116.325,40.25C115.935,40.25 115.635,40.46 115.485,40.82L108.135,58.91C107.925,59.39 108.165,59.75 108.705,59.75ZM114.585,53L117.195,46.37L119.805,53L114.585,53Z" style="fill-rule:nonzero;"/>
						<path d="M137.625,59.75L140.085,59.75C140.535,59.75 140.805,59.48 140.805,59.03L140.805,43.79L145.905,43.79C146.355,43.79 146.625,43.52 146.625,43.07L146.625,40.97C146.625,40.52 146.355,40.25 145.905,40.25L131.775,40.25C131.325,40.25 131.055,40.52 131.055,40.97L131.055,43.07C131.055,43.52 131.325,43.79 131.775,43.79L136.905,43.79L136.905,59.03C136.905,59.48 137.175,59.75 137.625,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M159.885,59.99C164.745,59.99 167.445,56.72 167.445,52.85L167.445,40.97C167.445,40.52 167.175,40.25 166.725,40.25L164.295,40.25C163.845,40.25 163.575,40.52 163.575,40.97L163.575,52.43C163.575,55.13 161.865,56.21 159.885,56.21C157.905,56.21 156.195,55.13 156.195,52.43L156.195,40.97C156.195,40.52 155.925,40.25 155.475,40.25L153.045,40.25C152.595,40.25 152.325,40.52 152.325,40.97L152.325,52.85C152.325,56.72 155.025,59.99 159.885,59.99Z" style="fill-rule:nonzero;"/>
						<path d="M174.465,59.75L176.895,59.75C177.345,59.75 177.615,59.48 177.615,59.03L177.615,53.09L180.765,53.09L184.665,59.27C184.875,59.6 185.145,59.75 185.535,59.75L188.415,59.75C188.985,59.75 189.195,59.36 188.895,58.88L185.025,52.76C187.215,51.98 189.045,49.91 189.045,46.67C189.045,42.47 186.015,40.25 183.105,40.25L174.465,40.25C174.015,40.25 173.745,40.52 173.745,40.97L173.745,59.03C173.745,59.48 174.015,59.75 174.465,59.75ZM177.615,49.31L177.615,44L182.475,44C183.915,44 185.145,45.02 185.145,46.67C185.145,48.29 183.915,49.31 182.475,49.31L177.615,49.31Z" style="fill-rule:nonzero;"/>
						<path d="M195.855,59.75L207.615,59.75C208.065,59.75 208.335,59.48 208.335,59.03L208.335,56.93C208.335,56.48 208.065,56.21 207.615,56.21L199.005,56.21L199.005,51.77L206.985,51.77C207.435,51.77 207.705,51.5 207.705,51.05L207.705,48.95C207.705,48.5 207.435,48.23 206.985,48.23L199.005,48.23L199.005,43.79L207.615,43.79C208.065,43.79 208.335,43.52 208.335,43.07L208.335,40.97C208.335,40.52 208.065,40.25 207.615,40.25L195.855,40.25C195.405,40.25 195.135,40.52 195.135,40.97L195.135,59.03C195.135,59.48 195.405,59.75 195.855,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M222.285,60.11C226.965,60.11 230.055,58.01 230.055,53.96C230.055,49.88 224.985,48.65 223.515,48.14C221.985,47.63 219.105,47.15 219.105,45.53C219.105,44.45 220.035,43.76 221.805,43.76C223.845,43.76 225.585,44.66 226.395,45.53C226.725,45.86 227.025,45.92 227.385,45.68L229.305,44.45C229.665,44.21 229.815,43.88 229.605,43.49C228.525,41.6 225.675,39.89 222.285,39.89C218.325,39.89 214.665,41.57 214.665,45.74C214.665,50 219.645,50.96 221.175,51.47C222.675,51.98 225.735,52.52 225.735,54.14C225.735,55.37 225.075,56.21 222.705,56.21C220.365,56.21 218.325,54.83 217.395,53.72C217.095,53.36 216.765,53.3 216.405,53.57L214.425,54.98C214.065,55.22 213.945,55.58 214.155,55.97C215.355,58.1 218.175,60.11 222.285,60.11Z" style="fill-rule:nonzero;"/>
					</g>
				</svg>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="section_features_header _secondaryWidth">
				<h2 class="section_features_title"><b v-text-underline>{{ $t('_landing._features._root.title') }}</b></h2>
				<div class="section_features_description">{{ $t('_landing._features._root.description') }}</div>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="_secondaryWidth">
				<div :class="$style.features_items">
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/top-features-note.png" :class="$style.features_itemContentImage" alt="some notes">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._note.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._note.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/top-features-reaction.png" :class="$style.features_itemContentImage" alt="some emojis in the reaction picker">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._reaction.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._reaction.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/customEmojis.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._customEmojis.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._customEmojis.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/role.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._roles.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._roles.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/top-features-charts.png" :class="$style.features_itemContentImage" alt="Charts">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._charts.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._charts.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._privacy.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._privacy.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._multiPurpose.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._multiPurpose.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/oss.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._oss.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._oss.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/top-features-federation.png" :class="$style.features_itemContentImage" alt="logos of Misskey and other ActivityPub server software">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._federation.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._federation.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/top-features-drive.png" :class="$style.features_itemContentImage" alt="a list of files in Misskey Drive">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._drive.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._drive.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/2fa.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._2fa.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._2fa.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/branding.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._branding.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._branding.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/moderation.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._moderation.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._moderation.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._monetization.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._monetization.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/since2014.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._features._battleTested.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._features._battleTested.description') }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section_features _primaryWidth">
		<div v-fade-in="'up'">
			<div class="section_features_bg">
				<IndexHeroBg/>
			</div>
		</div>
		<div class="section_features_bgText" style="right: 0; ">
			<div v-fade-in="'up'">
				<svg width="100%" height="100%" viewBox="0 0 146 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
					<g transform="matrix(1,0,0,1,-77.22,-40.01)">
						<path d="M77.94,59.75L86.85,59.75C89.85,59.75 92.7,57.65 92.7,54.11C92.7,51.95 91.65,50.48 90.15,49.64C91.26,48.86 91.98,47.6 91.98,45.74C91.98,42.2 89.31,40.25 86.31,40.25L77.94,40.25C77.49,40.25 77.22,40.52 77.22,40.97L77.22,59.03C77.22,59.48 77.49,59.75 77.94,59.75ZM81.09,48.14L81.09,43.79L85.68,43.79C87.09,43.79 87.99,44.6 87.99,45.95C87.99,47.3 87.09,48.14 85.68,48.14L81.09,48.14ZM81.09,56.21L81.09,51.35L86.22,51.35C87.72,51.35 88.71,52.43 88.71,53.78C88.71,55.13 87.78,56.21 86.22,56.21L81.09,56.21Z" style="fill-rule:nonzero;"/>
						<path d="M98.34,59.75L100.95,59.75C101.34,59.75 101.61,59.54 101.76,59.18L102.81,56.54L110.82,56.54L111.87,59.18C112.02,59.54 112.29,59.75 112.68,59.75L115.29,59.75C115.83,59.75 116.07,59.39 115.86,58.91L108.54,40.82C108.39,40.46 108.09,40.25 107.7,40.25L105.96,40.25C105.57,40.25 105.27,40.46 105.12,40.82L97.77,58.91C97.56,59.39 97.8,59.75 98.34,59.75ZM104.22,53L106.83,46.37L109.44,53L104.22,53Z" style="fill-rule:nonzero;"/>
						<path d="M130.83,59.99C134.04,59.99 136.65,58.7 138.36,56.57C138.6,56.24 138.51,55.91 138.15,55.61L136.17,54.08C135.81,53.78 135.45,53.84 135.15,54.2C134.16,55.22 132.66,56.12 130.83,56.12C127.26,56.12 124.86,53.54 124.86,50C124.86,46.46 127.26,43.88 130.83,43.88C132.66,43.88 134.19,44.66 135.15,45.71C135.48,46.04 135.81,46.1 136.17,45.83L138.15,44.36C138.54,44.06 138.57,43.73 138.3,43.37C136.59,41.27 134.01,40.01 130.83,40.01C125.04,40.01 120.99,44.21 120.99,50C120.99,55.79 125.04,59.99 130.83,59.99Z" style="fill-rule:nonzero;"/>
						<path d="M145.02,59.75L147.45,59.75C147.9,59.75 148.17,59.48 148.17,59.03L148.17,51.62L154.38,59.33C154.62,59.63 154.89,59.75 155.25,59.75L158.1,59.75C158.7,59.75 158.94,59.36 158.55,58.88L151.44,50L158.19,41.12C158.55,40.64 158.34,40.25 157.74,40.25L154.95,40.25C154.59,40.25 154.32,40.37 154.08,40.67L148.17,48.32L148.17,40.97C148.17,40.52 147.9,40.25 147.45,40.25L145.02,40.25C144.57,40.25 144.3,40.52 144.3,40.97L144.3,59.03C144.3,59.48 144.57,59.75 145.02,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M165.06,59.75L176.82,59.75C177.27,59.75 177.54,59.48 177.54,59.03L177.54,56.93C177.54,56.48 177.27,56.21 176.82,56.21L168.21,56.21L168.21,51.77L176.19,51.77C176.64,51.77 176.91,51.5 176.91,51.05L176.91,48.95C176.91,48.5 176.64,48.23 176.19,48.23L168.21,48.23L168.21,43.79L176.82,43.79C177.27,43.79 177.54,43.52 177.54,43.07L177.54,40.97C177.54,40.52 177.27,40.25 176.82,40.25L165.06,40.25C164.61,40.25 164.34,40.52 164.34,40.97L164.34,59.03C164.34,59.48 164.61,59.75 165.06,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M184.41,59.75L186.87,59.75C187.32,59.75 187.59,59.48 187.59,59.03L187.59,47.06L195.48,59.27C195.69,59.6 195.96,59.75 196.35,59.75L198.81,59.75C199.26,59.75 199.53,59.48 199.53,59.03L199.53,40.97C199.53,40.52 199.26,40.25 198.81,40.25L196.38,40.25C195.93,40.25 195.66,40.52 195.66,40.97L195.66,52.97L187.77,40.73C187.56,40.4 187.29,40.25 186.9,40.25L184.41,40.25C183.96,40.25 183.69,40.52 183.69,40.97L183.69,59.03C183.69,59.48 183.96,59.75 184.41,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M206.55,59.75L213.06,59.75C218.76,59.75 222.63,55.79 222.63,50C222.63,44.21 218.76,40.25 213.06,40.25L206.55,40.25C206.1,40.25 205.83,40.52 205.83,40.97L205.83,59.03C205.83,59.48 206.1,59.75 206.55,59.75ZM209.7,55.97L209.7,44L213.06,44C214.98,44 218.73,45.17 218.76,50C218.79,54.86 214.98,55.97 213.06,55.97L209.7,55.97Z" style="fill-rule:nonzero;"/>
					</g>
				</svg>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="section_features_header _secondaryWidth">
				<h2 class="section_features_title"><b v-text-underline>{{ $t('_landing._featuresServer._root.title') }}</b></h2>
				<div class="section_features_description">{{ $t('_landing._featuresServer._root.description') }}</div>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="_secondaryWidth">
				<div :class="$style.features_items">
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._easyInstall.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._easyInstall.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._easySetup.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._easySetup.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/nodejs.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._nodejs.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._nodejs.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._postgresql.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._postgresql.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/scalable.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._scalable.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._scalable.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/jobQueue.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._jobQueue.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._jobQueue.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._seo.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._seo.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._cdn.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._cdn.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/api.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._api.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._api.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._relay.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._relay.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/ftt.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._ftt.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._ftt.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/rbt.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._rbt.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._rbt.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._fullTextSearch.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._fullTextSearch.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/ml.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._ml.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._ml.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/sentry.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresServer._sentry.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresServer._sentry.description') }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section_features _primaryWidth">
		<div v-fade-in="'up'">
			<div class="section_features_bg">
				<IndexHeroBg/>
			</div>
		</div>
		<div class="section_features_bgText" style="left: 0; ">
			<div v-fade-in="'up'">
				<svg width="100%" height="100%" viewBox="0 0 168 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
					<g transform="matrix(1,0,0,1,-66.39,-40.01)">
						<path d="M67.11,59.75L69.54,59.75C69.99,59.75 70.26,59.48 70.26,59.03L70.26,52.37L78.39,52.37C78.84,52.37 79.11,52.1 79.11,51.65L79.11,49.46C79.11,49.01 78.84,48.74 78.39,48.74L70.26,48.74L70.26,43.91L78.96,43.91C79.41,43.91 79.68,43.64 79.68,43.19L79.68,40.97C79.68,40.52 79.41,40.25 78.96,40.25L67.11,40.25C66.66,40.25 66.39,40.52 66.39,40.97L66.39,59.03C66.39,59.48 66.66,59.75 67.11,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M86.52,59.75L88.95,59.75C89.4,59.75 89.67,59.48 89.67,59.03L89.67,53.09L92.82,53.09L96.72,59.27C96.93,59.6 97.2,59.75 97.59,59.75L100.47,59.75C101.04,59.75 101.25,59.36 100.95,58.88L97.08,52.76C99.27,51.98 101.1,49.91 101.1,46.67C101.1,42.47 98.07,40.25 95.16,40.25L86.52,40.25C86.07,40.25 85.8,40.52 85.8,40.97L85.8,59.03C85.8,59.48 86.07,59.75 86.52,59.75ZM89.67,49.31L89.67,44L94.53,44C95.97,44 97.2,45.02 97.2,46.67C97.2,48.29 95.97,49.31 94.53,49.31L89.67,49.31Z" style="fill-rule:nonzero;"/>
						<path d="M116.73,59.99C122.52,59.99 126.51,55.79 126.51,50C126.51,44.21 122.52,40.01 116.73,40.01C110.94,40.01 106.89,44.21 106.89,50C106.89,55.79 110.94,59.99 116.73,59.99ZM116.73,56.12C113.16,56.12 110.76,53.54 110.76,50C110.76,46.46 113.16,43.88 116.73,43.88C120.3,43.88 122.61,46.46 122.61,50C122.61,53.54 120.3,56.12 116.73,56.12Z" style="fill-rule:nonzero;"/>
						<path d="M133.08,59.75L135.54,59.75C135.99,59.75 136.26,59.48 136.26,59.03L136.26,47.06L144.15,59.27C144.36,59.6 144.63,59.75 145.02,59.75L147.48,59.75C147.93,59.75 148.2,59.48 148.2,59.03L148.2,40.97C148.2,40.52 147.93,40.25 147.48,40.25L145.05,40.25C144.6,40.25 144.33,40.52 144.33,40.97L144.33,52.97L136.44,40.73C136.23,40.4 135.96,40.25 135.57,40.25L133.08,40.25C132.63,40.25 132.36,40.52 132.36,40.97L132.36,59.03C132.36,59.48 132.63,59.75 133.08,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M160.47,59.75L162.93,59.75C163.38,59.75 163.65,59.48 163.65,59.03L163.65,43.79L168.75,43.79C169.2,43.79 169.47,43.52 169.47,43.07L169.47,40.97C169.47,40.52 169.2,40.25 168.75,40.25L154.62,40.25C154.17,40.25 153.9,40.52 153.9,40.97L153.9,43.07C153.9,43.52 154.17,43.79 154.62,43.79L159.75,43.79L159.75,59.03C159.75,59.48 160.02,59.75 160.47,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M175.89,59.75L187.65,59.75C188.1,59.75 188.37,59.48 188.37,59.03L188.37,56.93C188.37,56.48 188.1,56.21 187.65,56.21L179.04,56.21L179.04,51.77L187.02,51.77C187.47,51.77 187.74,51.5 187.74,51.05L187.74,48.95C187.74,48.5 187.47,48.23 187.02,48.23L179.04,48.23L179.04,43.79L187.65,43.79C188.1,43.79 188.37,43.52 188.37,43.07L188.37,40.97C188.37,40.52 188.1,40.25 187.65,40.25L175.89,40.25C175.44,40.25 175.17,40.52 175.17,40.97L175.17,59.03C175.17,59.48 175.44,59.75 175.89,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M195.24,59.75L197.7,59.75C198.15,59.75 198.42,59.48 198.42,59.03L198.42,47.06L206.31,59.27C206.52,59.6 206.79,59.75 207.18,59.75L209.64,59.75C210.09,59.75 210.36,59.48 210.36,59.03L210.36,40.97C210.36,40.52 210.09,40.25 209.64,40.25L207.21,40.25C206.76,40.25 206.49,40.52 206.49,40.97L206.49,52.97L198.6,40.73C198.39,40.4 198.12,40.25 197.73,40.25L195.24,40.25C194.79,40.25 194.52,40.52 194.52,40.97L194.52,59.03C194.52,59.48 194.79,59.75 195.24,59.75Z" style="fill-rule:nonzero;"/>
						<path d="M217.38,59.75L223.89,59.75C229.59,59.75 233.46,55.79 233.46,50C233.46,44.21 229.59,40.25 223.89,40.25L217.38,40.25C216.93,40.25 216.66,40.52 216.66,40.97L216.66,59.03C216.66,59.48 216.93,59.75 217.38,59.75ZM220.53,55.97L220.53,44L223.89,44C225.81,44 229.56,45.17 229.59,50C229.62,54.86 225.81,55.97 223.89,55.97L220.53,55.97Z" style="fill-rule:nonzero;"/>
					</g>
				</svg>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="section_features_header _secondaryWidth">
				<h2 class="section_features_title"><b v-text-underline>{{ $t('_landing._featuresClient._root.title') }}</b></h2>
				<div class="section_features_description">{{ $t('_landing._featuresClient._root.description') }}</div>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="_secondaryWidth">
				<div :class="$style.features_items">
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/responsive.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._responsive.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._responsive.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/theme.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._theme.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._theme.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/mfm.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._mfm.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._mfm.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/deck.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._deck.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._deck.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._realtimeMode.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._realtimeMode.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._pushNotification.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._pushNotification.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/multiAccounts.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._multiAccounts.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._multiAccounts.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._watermark.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._watermark.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._imageEditing.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._imageEditing.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/widgets.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._widgets.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._widgets.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/settings.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._settingsManagement.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._settingsManagement.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._achievements.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._achievements.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/plugin.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._plugin.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._plugin.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._embed.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._embed.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._pwa.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._pwa.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<img src="/img/top-features/i18n.webp" :class="$style.features_itemContentImage">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresClient._i18n.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresClient._i18n.description') }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section class="section_features _primaryWidth">
		<div v-fade-in="'up'">
			<div class="section_features_header _secondaryWidth">
				<h2 class="section_features_title"><b v-text-underline>{{ $t('_landing._featuresUpcoming._root.title') }}</b></h2>
				<div class="section_features_description">{{ $t('_landing._featuresUpcoming._root.description') }}</div>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="_secondaryWidth">
				<div :class="$style.features_items">
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresUpcoming._jwt.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresUpcoming._jwt.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresUpcoming._newBackend.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresUpcoming._newBackend.description') }}</div>
						</div>
					</div>
					<div v-fade-in="'featuresItem'" :class="$style.features_item">
						<div :class="$style.features_itemContent">
							<h3 :class="$style.features_itemContentTitle">{{ $t('_landing._featuresUpcoming._vueVapor.title') }}</h3>
							<div :class="$style.features_itemContentDescription">{{ $t('_landing._featuresUpcoming._vueVapor.description') }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="_primaryWidth" style="position: relative; padding: 128px 0;">
		<GDots class="dotsBg" :space="30" />

		<section class="section_getStarted _secondaryWidth">
			<div v-fade-in="'up'">
				<div class="section_getStarted_titleContainer acrylic">
					<h2 class="section_getStarted_titleContainer_title"><b v-text-underline>{{ $t('_landing._getStarted.title') }}</b></h2>
				</div>
			</div>
			<div class="section_getStarted_items">
				<div v-fade-in="'up'" class="section_getStarted_itemContainer">
					<div class="section_getStarted_item acrylic">
						<img class="section_getStarted_item_icon" src="/img/emojis/package_color.svg" aria-hidden="true">
						<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._create.title') }}</b>
						<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/docs/for-admin/install/guides/')">{{ $t('_landing._getStarted._create.guide') }}<ArrowRightIco /></GButton>
					</div>
				</div>
				<div v-fade-in="'up'" class="section_getStarted_itemContainer">
					<div class="section_getStarted_item acrylic">
						<img class="section_getStarted_item_icon" src="/img/emojis/light_bulb_color.svg" aria-hidden="true">
						<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._docs.title') }}</b>
						<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/docs')">{{ $t('_landing._getStarted._docs.docs') }}<ArrowRightIco /></GButton>
					</div>
				</div>
				<div v-fade-in="'up'" class="section_getStarted_itemContainer">
					<div class="section_getStarted_item acrylic">
						<img class="section_getStarted_item_icon" src="/img/emojis/ringed_planet_color.svg" aria-hidden="true">
						<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._find.title') }}</b>
						<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/servers')">{{ $t('_landing._getStarted._find.list') }}<ArrowRightIco /></GButton>
					</div>
				</div>
				<div v-fade-in="'up'" class="section_getStarted_itemContainer">
					<div class="section_getStarted_item acrylic">
						<img class="section_getStarted_item_icon" src="/img/emojis/hammer_and_wrench_color.svg" aria-hidden="true">
						<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._dev.title') }}</b>
						<GButton class="section_getStarted_item_button" color="accent" buttonType="link" to="https://github.com/misskey-dev">GitHub<ArrowUpRightIco /></GButton>
					</div>
				</div>
			</div>
		</section>
		<section class="section_donationAndSponsors _secondaryWidth">
			<div v-fade-in="'up'">
				<div class="section_donationAndSponsors_content _secondaryWidth acrylic">
					<section class="section_donationAndSponsors_sponsors">
						<IndexSponsors />
					</section>
					<section class="section_donationAndSponsors_donation">
						<h2 class="section_donationAndSponsors_donationTitle">{{ $t('_landing._donation.title') }}</h2>
						<p class="section_donationAndSponsors_donationDescription">{{ $t('_landing._donation.description') }}</p>
						<div>
							<GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
						</div>
					</section>
				</div>
			</div>
		</section>
	</div>

	<section class="section_madeBy _primaryWidth">
		<div v-fade-in="'up'">
			<h2 class="section_madeBy_title">Made by</h2>
		</div>
		<div v-fade-in="'right'">
			<img class="section_madeBy_image" src="/midev.png" alt="">
		</div>
		<div v-fade-in="'left'">
			<b class="section_madeBy_name">Misskey Project</b>
		</div>
	</section>

</main>
</template>

<script setup lang="ts">
import { scrollTo } from '@/assets/js/scroll-to';
import { isLocalPath } from '@/assets/js/misc';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import MegaphoneIco from 'bi/megaphone.svg';
import ArrowRightIco from 'bi/arrow-right.svg';
import ArrowUpRightIco from 'bi/arrow-up-right.svg';
import { vFadeIn } from '@/assets/js/vFadeIn';
import { vTextUnderline } from '@/assets/js/vTextUnderline';
import TagCloud from 'TagCloud';
import GHIcon from "bi/github.svg";

const { notice } = useAppConfig();
const isUwu = useState<boolean>('isUwu');
const localePath = useGLocalePath();
const { locale, fallbackLocale } = useI18n();

// お知らせ欄にブログが来る可能性もあるので
const localeState = useState('miHub_blog_originalLocale', () => locale.value);
localeState.value = locale.value;

const localizedNotice = computed(() => {
	if (locale.value === 'ja-ks') {
		return notice.title.ja;
	} else if (locale.value === 'ja') {
		return notice.title.ja;
	} else {
		return notice.title?.en ?? notice.title.ja;
	}
});

useHead(() => ({
		link: isUwu ? [
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-light.png' },
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-dark.png' },
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-mobile-light.png' },
				{ rel: 'preload', as: 'image', href: '/img/uwu/misskey-uwu-mobile-dark.png' },
		] : [],
}));

onMounted(() => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		spaceBetween: 100,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 100,
			modifier: 2,
			slideShadows: false,
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	TagCloud('.section_decentralized_cloudContainer_cloud', [
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
		'<img src="https://0key.dev/favicon.ico" width="35">',
	], {
		radius: 150,
		maxSpeed: 'slow',
		initSpeed: 'slow',
		direction: 135,
		useHTML: true,
	});
});
</script>

<style scoped>
.main {
	--w-margin: 16px;
	--primary-width: 1800px;
	--secondary-width: 1150px;
	position: relative;
	z-index: 1;
	overflow-x: clip;
}

._primaryWidth {
	width: calc(100vw - var(--w-margin) * 2);
	max-width: var(--primary-width);
	box-sizing: border-box;
	margin-left: auto;
	margin-right: auto;
}


._textGradient {
	background: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
	color: transparent;
  background-clip: text;
}

.dotsBg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	mask-image: linear-gradient(to bottom, transparent 0px, black 100px, black calc(100% - 100px), transparent 100%);
	color: #0002;
}
:global(html.dark) {
	.dotsBg {
		color: #fff2;
	}
}
.dotsBgPrimary {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	mask-image: linear-gradient(to bottom, transparent 0px, black 100px, black calc(100% - 100px), transparent 100%);
	color: #86b300;
}

.acrylic {
	background: #fff6;
	backdrop-filter: blur(12px);
	color: #000b;
	border: solid 1px #0001;
	border-radius: 16px;
}
:global(html.dark) {
	.acrylic {
		background: #3336;
		color: #fffd;
		border: solid 1px #fff1;
	}
}

/* ------------------------------------------------------------------------- */
/* top section */

.section_top {
	position: relative;
	border-radius: 16px;
	overflow: clip;
	box-sizing: border-box;
	margin-top: 16px;
	padding-top: 16px;
	padding-bottom: 160px;
	margin-bottom: -150px;
	contain: content;
}

.section_top_tagline {
	font-size: 250%;
	line-height: 120%;
	text-align: center;
}

.section_top_description {
	margin: 16px 0;
	text-align: center;
	font-size: 90%;
}

.section_top_buttons {
	display: flex;
	justify-content: center;
	gap: 16px;
	margin-top: 24px;
}

.notice {
	display: block;
	width: max-content;
	box-sizing: border-box;
	background: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
	border-radius: 999px;
	padding: 2px;
	margin: 0 auto;
}

.noticeInner {
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: 999px;
	box-sizing: border-box;
	padding: 4px 16px 4px 4px;
	font-size: 90%;
}
:global(html.dark) {
	.noticeInner {
		background: #111;
	}
}

.noticeIconBase {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	margin-right: 8px;
	background: linear-gradient(90deg, #86b300, #4ab300, #4ab300);
	border-radius: 999px;
	color: #fff;
}

.section_top_barcode {
	position: absolute;
	bottom: 16px;
	right: 32px;
	width: 200px;
	color: #0002;
	fill: currentColor;
}
:global(html.dark)  {
	.section_top_barcode {
		color: #fff2;
	}
}

/* ------------------------------------------------------------------------- */
/* key features section */

.section_keyFeatures {
	display: grid;
	gap: 16px;
	margin-top: 16px;
	margin-bottom: 16px;
}
.section_keyFeatures_item {
	padding: 32px;
	text-align: center;

	mask-image: linear-gradient(#000, #000), url("/circle.svg");
  mask-repeat: no-repeat;
  mask-position: center center, 16px 16px;
  mask-size: 100% 100%, 16px 16px;
	mask-composite: exclude;
}

.section_keyFeatures_itemIcon {
	width: 50px;
	height: 50px;
	margin: 0 auto;
}
.section_keyFeatures_itemIcon img {
	width: 100%;
	height: 100%;
}
.section_keyFeatures_itemTitle {
	font-size: 120%;
	font-weight: bold;
	margin: 10px 0;
}
.section_keyFeatures_itemDescription {
	font-size: 90%;
}

/* ------------------------------------------------------------------------- */
/* stats section */

.section_stats {
	background: #fff6;
	backdrop-filter: blur(12px);
	border-radius: 999px;
	padding: 0 32px;
	line-height: 40px;
	font-size: 90%;
}
:global(html.dark)  {
	.section_stats {
		background: #4446;
	}
}
.section_stats_text {
	display: flex;
	align-items: start;
	justify-content: center;
	gap: 64px;
}
.section_stats_label {
	background: #9ad11b;
	color: #000;
	border-radius: 999px;
	padding: 4px 16px;
	margin-right: 8px;
}

.scrollLabel {
	position: absolute;
	z-index: 1;
	left: 0;
	right: 0;
	display: block;
	margin: 16px auto 0 auto;
	text-align: center;
}

.scrollText {
	display: block;
	fill: currentColor;
	width: 150px;
	margin: 0 auto;
	padding: 24px;
	background: var(--THEME-bg);
}

/* ------------------------------------------------------------------------- */
/* introduction section */

.section_introduction {
	position: relative;
}

.section_introduction_content {
	position: relative;
	padding-top: 55px;
	padding-bottom: 55px;
	text-align: center;
}

.section_introduction_content_title {
	font-size: 130%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 24px;
}

.section_introduction_content_description {
	font-size: 90%;
}

.swiper {
	position: relative;
	width: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 16px;
}

.swiper-wrapper {

}

.swiper-slide {
	width: 300px;
	border-radius: 16px;
	overflow: clip;
	user-select: none;
	cursor: grab;
}
.swiper-slide:not(.swiper-slide-active) {
	opacity: 0.5;
}
.swiper-slide-image {
	width: 100%;
}

.introductionTip {
	margin-top: 24px;
	font-size: 80%;
	text-align: center;
}


/* ------------------------------------------------------------------------- */
/* donation and sponsors section */

.section_donationAndSponsors {
	margin-top: 16px;
}

.section_donationAndSponsors_content {
	display: grid;
	padding: 16px;
	gap: 16px;
}

.section_donationAndSponsors_sponsors {
}
.section_donationAndSponsors_donation {
	text-align: center;
	background: #f3f5da;
	color: #3b3d20;
	padding: 32px;
	border-radius: 16px;
	font-size: 95%;
}
:global(html.dark)  {
	.section_donationAndSponsors_donation {
		background: #383c00;
		color: #fff;
	}
}

.section_donationAndSponsors_donationTitle {
	font-size: 100%;
	font-weight: bold;
	margin-bottom: 8px;
}

.section_donationAndSponsors_donationDescription {
	font-size: 90%;
}

/* ------------------------------------------------------------------------- */
/* decentralized section */

.section_decentralized {
	position: relative;
	margin-bottom: 50px;
	margin-top: 32px;
	display: flex;
	align-items: center;
}

.section_decentralized_title {
	font-size: 140%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 24px;
}

.section_decentralized_content {
	position: relative;
	background: #f7f7f7;
	padding: 46px 58px;
	border-radius: 16px;
}
:global(html.dark)  {
	.section_decentralized_content {
		background: #222;
	}
}

.section_decentralized_description {
	font-size: 90%;
}

.section_decentralized_cloudContainer {
	margin-right: 32px;
}

.section_decentralized_cloudContainer_cloud {
	padding: 16px;
	width: min-content;
	contain: content;
	content-visibility: auto;
}


/* ------------------------------------------------------------------------- */
/* use cases section */

.section_useCases {
	margin-top: 32px;
}

.section_useCases_title {
	font-size: 120%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 32px;
	text-align: center;
}

.section_useCases_items {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 16px;
}

.section_useCases_item {
	/*
	background: #86b30025;
	*/
	border-radius: 16px;
	color: #484a40;
	padding: 32px;
	text-align: center;

	background: radial-gradient(farthest-corner at 40px 40px, #84b3001f 0%, #00000000 100%);
  border: solid 1px #7db3001c;

	mask-image: linear-gradient(#000, #000), url("/circle.svg");
  mask-repeat: no-repeat;
  mask-position: center center, 16px 16px;
  mask-size: 100% 100%, 16px 16px;
	mask-composite: exclude;
}
:global(html.dark)  {
	.section_useCases_item {
		color: #f0ffc7;
	}
}
.section_useCases_itemIcon {
	width: 50px;
	height: 50px;
	margin: 0 auto;
}
.section_useCases_itemIcon img {
	width: 100%;
	height: 100%;
}
.section_useCases_itemLabel {
	display: block;
	font-size: 85%;
	margin: 10px auto;
	background: #9ad11b;
	color: #000;
	border-radius: 999px;
	padding: 3px 16px;
	width: max-content;
	margin-bottom: 8px;
}
.section_useCases_itemTitle {
	font-size: 90%;
	margin: 0;
}

/* ------------------------------------------------------------------------- */
/* free section */

.section_free {
	position: relative;
	padding: 100px 0;
}

.section_free_content {
	position: relative;
	display: flex;
	padding: 24px;
	background: #f7f7f7;
	border-radius: 16px;
}
:global(html.dark)  {
	.section_free_content {
		background: #222;
	}
}

.section_free_main {
	position: relative;
	flex: 1;
	padding: 24px;
}

.section_free_sub {
	background: #86b30025;
	border-radius: 16px;
	color: #484a40;
	padding: 32px;
	text-align: center;
	box-sizing: border-box;
	width: 300px;
	place-content: center;
}
:global(html.dark)  {
	.section_free_sub {
		color: #f0ffc7;
	}
}

.section_free_sub_icon {
	display: inline-block;
	vertical-align: bottom;
	width: 50px;
	height: 50px;
}

.section_free_title {
	font-size: 140%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 24px;
}
.section_free_description {
	font-size: 90%;
	margin: 0;
}

/* ------------------------------------------------------------------------- */
/* features section */

.section_features {
	position: relative;
	margin-bottom: 100px;
}

.section_features_bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 500px;
	background: #f7f7f7;
	border-radius: 16px;
	overflow: clip;
}
:global(html.dark)  {
	.section_features_bg {
		background: #222;
	}
}

.section_features_bgText {
	position: absolute;
	pointer-events: none;
	top: 550px;
	fill: #9ad11b;
	height: auto;
	width: 50%;
}

.section_features_header {
	position: relative;
	padding-top: 55px;
	padding-bottom: 55px;
	text-align: center;
}

.section_features_title {
	font-size: 150%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 24px;
}

.section_features_description {
	margin: 0 auto;
}

/* ------------------------------------------------------------------------- */
/* get started section */

.section_getStarted {
}

.section_getStarted_titleContainer {
	padding: 24px;
	text-align: center;
	margin-bottom: 16px;
}

.section_getStarted_titleContainer_title {
	font-size: 120%;
	font-weight: bold;
	margin: 0;
}

.section_getStarted_items {
	display: grid;
	gap: 16px;
}

.section_getStarted_itemContainer {
	flex: 1;
}

.section_getStarted_item {
	padding: 24px;
	text-align: center;
}

.section_getStarted_item_icon {
	display: block;
	width: 50px;
	height: 50px;
	margin: 0 auto;
}

.section_getStarted_item_title {
	display: block;
	font-size: 100%;
	font-weight: bold;
	margin: 12px 0;
}

.section_getStarted_item_button {
	font-size: 90%;
}

/* ------------------------------------------------------------------------- */
/* made by section */

.section_madeBy {
	min-height: 350px;
	text-align: center;
}

.section_madeBy_title {
	font-size: 120%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 16px;
}

.section_madeBy_image {
	display: block;
	width: 40px;
	height: 40px;
	margin: 0 auto;
	border-radius: 8px;
}

.section_madeBy_name {
	display: block;
	font-size: 90%;
	margin-top: 8px;
}
</style>

<style module>
.features_items {
	flex: 1;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 16px;
}

.features_itemContent {
	background: #fff6;
	backdrop-filter: blur(12px);
	color: #000b;
	border: solid 1px #0001;
	border-radius: 16px;
	padding: 20px;

	font-size: 90%;
	box-sizing: border-box;
	height: 100%;
}
:global(html.dark) {
	.features_itemContent {
		background: #3336;
		color: #fffd;
		border: solid 1px #fff1;
	}
}

.features_itemContentImage {
	display: block;
	width: 100%;
	border-radius: 8px;
	margin: 0 0 16px 0;
	aspect-ratio: 1.8;
	object-fit: cover;
}

.features_itemContentTitle {
	font-size: 120%;
	font-weight: bold;
	margin: 0 0 8px 0;
	padding: 0 6px;
}

.features_itemContentDescription {
	margin: 0;
	padding: 0 6px 0 6px;
}
</style>

<style scoped>
.__v_fadeIn_up_out > * {
	opacity: 0;
	transform: translateY(200px);
}

.__v_fadeIn_up_in > * {
	opacity: 1;
	transform: translateY(0);
}

.__v_fadeIn_right_out > * {
	opacity: 0;
	transform: translateX(-200px);
}
.__v_fadeIn_right_in > * {
	opacity: 1;
	transform: translateX(0);
}

.__v_fadeIn_left_out > * {
	opacity: 0;
	transform: translateX(200px);
}
.__v_fadeIn_left_in > * {
	opacity: 1;
	transform: translateX(0);
}

.__v_fadeIn_featuresItem_out > * {
	opacity: 0;
	transform: translateY(150px);
}

.__v_fadeIn_featuresItem_in > * {
	opacity: 1;
	transform: translateY(0);
}
</style>
