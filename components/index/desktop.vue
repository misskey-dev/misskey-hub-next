<template>
<main class="main">
	<section class="section_top _primaryWidth">
		<div class="section_top_bg">
			<IndexHeroParticles/>
			<IndexHeroBg/>
		</div>
		<section class="tickers">
			<span class="tickersLabel">
				<b class="tickersLabelContent">Servers:</b>
			</span>
			<span class="tickersItems">
				<GMarquee :duration="90">
					<span v-for="instance in tickerServers" class="tickersItem"><img class="tickersItemIcon" :src="`https://${instance.url}/favicon.ico`" alt="">{{ instance.url }}</span>
				</GMarquee>
			</span>
		</section>
		<div class="_secondaryWidth" style="display: flex;">
			<div class="section_top_left">
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
			</div>
			<div class="section_top_right">
				<div>
					<IndexHeroMi3d style="margin: -20px auto 0 auto;" />
				</div>
			</div>
		</div>
		<svg class="section_top_barcode" viewBox="0 0 127 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
			<g transform="matrix(1,0,0,1,-12.72,-1)">
				<path d="M12.72,1L13.72,1L13.72,19L12.72,19L12.72,1ZM15.96,1L16.96,1L16.96,19L15.96,19L15.96,1ZM17.96,1L20.2,1L20.2,19L17.96,19L17.96,1ZM21.2,1L23.44,1L23.44,19L21.2,19L21.2,1ZM24.44,1L25.44,1L25.44,19L24.44,19L24.44,1ZM26.91,1L29.15,1L29.15,19L26.91,19L26.91,1ZM30.15,1L32.39,1L32.39,19L30.15,19L30.15,1ZM33.39,1L34.39,1L34.39,19L33.39,19L33.39,1ZM35.39,1L36.39,1L36.39,19L35.39,19L35.39,1ZM38.63,1L39.63,1L39.63,19L38.63,19L38.63,1ZM41.1,1L42.1,1L42.1,19L41.1,19L41.1,1ZM43.1,1L45.34,1L45.34,19L43.1,19L43.1,1ZM46.34,1L47.34,1L47.34,19L46.34,19L46.34,1ZM49.58,1L51.82,1L51.82,19L49.58,19L49.58,1ZM52.82,1L53.82,1L53.82,19L52.82,19L52.82,1ZM55.29,1L56.29,1L56.29,19L55.29,19L55.29,1ZM57.29,1L59.53,1L59.53,19L57.29,19L57.29,1ZM60.53,1L61.53,1L61.53,19L60.53,19L60.53,1ZM62.53,1L64.769,1L64.769,19L62.53,19L62.53,1ZM67.01,1L68.01,1L68.01,19L67.01,19L67.01,1ZM69.48,1L70.48,1L70.48,19L69.48,19L69.48,1ZM71.48,1L73.72,1L73.72,19L71.48,19L71.48,1ZM74.72,1L75.72,1L75.72,19L74.72,19L74.72,1ZM76.72,1L78.96,1L78.96,19L76.72,19L76.72,1ZM81.2,1L82.2,1L82.2,19L81.2,19L81.2,1ZM83.67,1L85.91,1L85.91,19L83.67,19L83.67,1ZM86.91,1L87.91,1L87.91,19L86.91,19L86.91,1ZM88.91,1L89.91,1L89.91,19L88.91,19L88.91,1ZM90.91,1L91.91,1L91.91,19L90.91,19L90.91,1ZM94.15,1L96.39,1L96.39,19L94.15,19L94.15,1ZM97.86,1L100.1,1L100.1,19L97.86,19L97.86,1ZM101.1,1L102.1,1L102.1,19L101.1,19L101.1,1ZM103.1,1L105.34,1L105.34,19L103.1,19L103.1,1ZM107.58,1L108.58,1L108.58,19L107.58,19L107.58,1ZM109.58,1L110.58,1L110.58,19L109.58,19L109.58,1ZM112.05,1L114.29,1L114.29,19L112.05,19L112.05,1ZM116.53,1L117.53,1L117.53,19L116.53,19L116.53,1ZM118.53,1L120.77,1L120.77,19L118.53,19L118.53,1ZM121.77,1L122.77,1L122.77,19L121.77,19L121.77,1ZM123.77,1L124.77,1L124.77,19L123.77,19L123.77,1ZM126.24,1L127.24,1L127.24,19L126.24,19L126.24,1ZM129.479,1L130.479,1L130.479,19L129.479,19L129.479,1ZM131.48,1L133.72,1L133.72,19L131.48,19L131.48,1ZM134.72,1L136.96,1L136.96,19L134.72,19L134.72,1ZM137.96,1L138.96,1L138.96,19L137.96,19L137.96,1ZM16.543,24.187L16.832,23.3L18.531,23.851L18.531,21.975L19.465,21.975L19.465,23.851L21.163,23.3L21.453,24.187L19.912,24.691L20.865,26.324L20.052,26.782L19.101,25.139L17.868,26.8L17.113,26.25L18.232,24.738L16.543,24.187ZM30.854,28.135L30.854,21.387L32.385,21.387L33.188,24.028L33.99,21.387L35.521,21.387L35.521,28.135L34.588,28.135L34.588,22.628L33.636,25.774L32.74,25.774L31.788,22.628L31.788,28.135L30.854,28.135ZM45.576,28.033L45.576,27.099L46.911,27.099L46.911,22.433L45.763,22.433L45.763,21.499L48.993,21.499L48.993,22.433L47.845,22.433L47.845,27.099L49.179,27.099L49.179,28.033L45.576,28.033ZM59.496,26.147L60.42,26.026C60.426,26.051 60.434,26.099 60.443,26.171C60.452,26.242 60.459,26.289 60.462,26.311C60.465,26.332 60.471,26.373 60.48,26.432C60.49,26.491 60.499,26.533 60.508,26.558C60.518,26.583 60.529,26.618 60.541,26.665C60.554,26.712 60.567,26.748 60.583,26.773C60.599,26.797 60.617,26.829 60.639,26.866C60.661,26.903 60.686,26.936 60.714,26.964C60.742,26.992 60.771,27.018 60.802,27.043C60.983,27.186 61.207,27.258 61.474,27.258C61.81,27.258 62.096,27.168 62.333,26.987C62.545,26.813 62.651,26.576 62.651,26.278C62.651,26.098 62.608,25.94 62.525,25.807C62.44,25.673 62.355,25.578 62.268,25.522C62.181,25.466 62.053,25.394 61.885,25.307C61.798,25.264 61.635,25.186 61.395,25.074C61.156,24.962 60.977,24.875 60.858,24.812C60.74,24.75 60.586,24.654 60.396,24.523C60.207,24.392 60.065,24.265 59.972,24.14C59.878,24.016 59.794,23.857 59.72,23.664C59.645,23.472 59.608,23.26 59.608,23.03C59.608,22.545 59.799,22.148 60.182,21.84C60.564,21.532 61.023,21.371 61.559,21.359L61.615,21.359C62.094,21.359 62.496,21.474 62.823,21.705C63.15,21.934 63.369,22.246 63.481,22.638L63.612,23.086L62.716,23.338C62.66,23.151 62.612,23.008 62.571,22.909C62.531,22.809 62.47,22.705 62.389,22.596C62.308,22.487 62.202,22.409 62.072,22.363C61.941,22.316 61.776,22.292 61.577,22.292C61.304,22.311 61.062,22.384 60.854,22.512C60.645,22.639 60.541,22.812 60.541,23.03C60.541,23.198 60.581,23.346 60.662,23.473C60.743,23.601 60.821,23.689 60.896,23.739C60.97,23.789 61.089,23.86 61.251,23.954C61.344,24.004 61.512,24.083 61.754,24.192C61.997,24.301 62.181,24.386 62.305,24.448C62.43,24.511 62.587,24.609 62.777,24.742C62.966,24.876 63.109,25.007 63.206,25.135C63.302,25.262 63.389,25.425 63.467,25.625C63.545,25.824 63.584,26.042 63.584,26.278C63.584,26.776 63.422,27.194 63.098,27.533C62.775,27.872 62.361,28.079 61.857,28.154C61.683,28.179 61.555,28.191 61.474,28.191C60.983,28.191 60.555,28.042 60.191,27.743C59.827,27.445 59.617,27.068 59.561,26.614L59.496,26.147ZM73.686,26.147L74.61,26.026C74.616,26.051 74.624,26.099 74.633,26.171C74.642,26.242 74.649,26.289 74.652,26.311C74.655,26.332 74.661,26.373 74.67,26.432C74.68,26.491 74.689,26.533 74.698,26.558C74.708,26.583 74.719,26.618 74.731,26.665C74.744,26.712 74.757,26.748 74.773,26.773C74.789,26.797 74.807,26.829 74.829,26.866C74.851,26.903 74.876,26.936 74.904,26.964C74.932,26.992 74.961,27.018 74.992,27.043C75.173,27.186 75.397,27.258 75.664,27.258C76,27.258 76.286,27.168 76.523,26.987C76.735,26.813 76.841,26.576 76.841,26.278C76.841,26.098 76.798,25.94 76.715,25.807C76.63,25.673 76.545,25.578 76.458,25.522C76.371,25.466 76.243,25.394 76.075,25.307C75.988,25.264 75.825,25.186 75.585,25.074C75.346,24.962 75.167,24.875 75.048,24.812C74.93,24.75 74.776,24.654 74.586,24.523C74.397,24.392 74.255,24.265 74.162,24.14C74.068,24.016 73.984,23.857 73.91,23.664C73.835,23.472 73.798,23.26 73.798,23.03C73.798,22.545 73.989,22.148 74.372,21.84C74.754,21.532 75.213,21.371 75.749,21.359L75.805,21.359C76.284,21.359 76.686,21.474 77.013,21.705C77.34,21.934 77.559,22.246 77.671,22.638L77.802,23.086L76.906,23.338C76.85,23.151 76.802,23.008 76.761,22.909C76.721,22.809 76.66,22.705 76.579,22.596C76.498,22.487 76.392,22.409 76.262,22.363C76.131,22.316 75.966,22.292 75.767,22.292C75.494,22.311 75.252,22.384 75.044,22.512C74.835,22.639 74.731,22.812 74.731,23.03C74.731,23.198 74.771,23.346 74.852,23.473C74.933,23.601 75.011,23.689 75.086,23.739C75.16,23.789 75.279,23.86 75.441,23.954C75.534,24.004 75.702,24.083 75.944,24.192C76.187,24.301 76.371,24.386 76.495,24.448C76.62,24.511 76.777,24.609 76.967,24.742C77.156,24.876 77.3,25.007 77.396,25.135C77.492,25.262 77.579,25.425 77.657,25.625C77.735,25.824 77.774,26.042 77.774,26.278C77.774,26.776 77.612,27.194 77.288,27.533C76.965,27.872 76.551,28.079 76.047,28.154C75.873,28.179 75.745,28.191 75.664,28.191C75.173,28.191 74.745,28.042 74.381,27.743C74.017,27.445 73.807,27.068 73.751,26.614L73.686,26.147ZM87.745,28.135L87.745,21.387L88.678,21.387L88.678,24.178L91.59,21.2L92.262,21.854L89.528,24.635L92.468,27.669L91.805,28.331L88.678,25.102L88.678,28.135L87.745,28.135ZM102.234,28.033L102.234,21.499L106.359,21.499L106.359,22.433L103.167,22.433L103.167,24.159L105.911,24.159L105.911,25.093L103.167,25.093L103.167,27.099L106.359,27.099L106.359,28.033L102.234,28.033ZM116.041,21.667L116.863,21.228L118.328,23.963L119.784,21.228L120.615,21.667L118.795,25.064L118.795,28.135L117.861,28.135L117.861,25.064L116.041,21.667ZM130.063,24.187L130.352,23.3L132.051,23.851L132.051,21.975L132.985,21.975L132.985,23.851L134.683,23.3L134.973,24.187L133.432,24.691L134.385,26.324L133.572,26.782L132.621,25.139L131.388,26.8L130.633,26.25L131.752,24.738L130.063,24.187Z"/>
			</g>
		</svg>
	</section>

	<section class="section_keyFeatures _secondaryWidth" id="learnMore">
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

	<section class="section_stats _secondaryWidth">
		<div class="section_stats_text">
			<span><b class="section_stats_label">Notes:</b>{{ instances?.stats.notesCount }}+</span>
			<span><b class="section_stats_label">Users:</b>{{ instances?.stats.usersCount }}+</span>
			<span><b class="section_stats_label">MAUs:</b>{{ instances?.stats.mau }}+</span>
			<span><b class="section_stats_label">Servers:</b>{{ instances?.stats.instancesCount }}+</span>
		</div>
	</section>

	<div class="scrollLabel">
		<svg class="scrollText" width="100%" height="100%" viewBox="0 0 170 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
			<g transform="matrix(1,0,0,1,-64.9967,-39.89)">
				<path d="M73.47,60.11C78.15,60.11 81.45,57.95 81.45,53.78C81.45,49.67 76.38,48.32 75.09,47.81C73.8,47.3 71.34,46.85 71.34,45.74C71.34,45.2 71.82,44.84 72.84,44.84C74.64,44.84 76.17,45.71 76.98,46.4C77.34,46.7 77.67,46.73 78.03,46.49L80.76,44.66C81.12,44.42 81.27,44.06 81.03,43.64C79.89,41.78 76.92,39.89 73.47,39.89C69.63,39.89 65.64,41.51 65.64,46.01C65.64,50.45 70.74,51.53 72.03,52.04C73.32,52.55 75.9,53.03 75.9,54.02C75.9,54.56 75.72,55.16 74.04,55.16C72,55.16 70.11,53.75 69.24,52.88C68.88,52.55 68.55,52.49 68.19,52.76L65.37,54.8C65.01,55.07 64.89,55.43 65.1,55.82C66.3,57.89 69.18,60.11 73.47,60.11Z" style="fill-rule:nonzero;"/>
				<path d="M102.42,59.99C105.63,59.99 108.21,58.7 109.92,56.57C110.19,56.24 110.07,55.91 109.71,55.61L106.92,53.42C106.56,53.12 106.2,53.15 105.87,53.51C105.09,54.26 103.86,55.04 102.42,55.04C99.48,55.04 97.5,52.94 97.5,50C97.5,47.06 99.48,44.96 102.42,44.96C103.86,44.96 105.09,45.62 105.87,46.37C106.23,46.7 106.53,46.79 106.92,46.49L109.71,44.39C110.1,44.09 110.16,43.73 109.86,43.34C108.15,41.27 105.57,40.01 102.42,40.01C96.63,40.01 92.55,44.21 92.55,50C92.55,55.79 96.63,59.99 102.42,59.99Z" style="fill-rule:nonzero;"/>
				<path d="M122.31,59.75L125.76,59.75C126.24,59.75 126.51,59.48 126.51,59L126.51,53.72L128.52,53.72L131.76,59.24C131.97,59.6 132.27,59.75 132.66,59.75L136.71,59.75C137.31,59.75 137.52,59.39 137.22,58.85L133.83,53.09C135.75,52.13 137.31,50.12 137.31,46.97C137.31,42.38 134.01,40.25 131.13,40.25L122.31,40.25C121.83,40.25 121.56,40.52 121.56,41L121.56,59C121.56,59.48 121.83,59.75 122.31,59.75ZM126.51,48.92L126.51,45.05L130.29,45.05C131.31,45.05 132.36,45.62 132.36,46.97C132.36,48.32 131.31,48.92 130.29,48.92L126.51,48.92Z" style="fill-rule:nonzero;"/>
				<path d="M158.43,59.99C164.22,59.99 168.24,55.79 168.24,50C168.24,44.21 164.22,40.01 158.43,40.01C152.64,40.01 148.56,44.21 148.56,50C148.56,55.79 152.64,59.99 158.43,59.99ZM158.43,55.04C155.49,55.04 153.51,52.94 153.51,50C153.51,47.06 155.49,44.96 158.43,44.96C161.37,44.96 163.29,47.06 163.29,50C163.29,52.94 161.37,55.04 158.43,55.04Z" style="fill-rule:nonzero;"/>
				<path d="M180.54,59.75L192.57,59.75C193.05,59.75 193.32,59.48 193.32,59L193.32,56C193.32,55.52 193.05,55.25 192.57,55.25L184.74,55.25L184.74,41C184.74,40.52 184.47,40.25 183.99,40.25L180.54,40.25C180.06,40.25 179.79,40.52 179.79,41L179.79,59C179.79,59.48 180.06,59.75 180.54,59.75Z" style="fill-rule:nonzero;"/>
				<path d="M205.47,59.75L217.5,59.75C217.98,59.75 218.25,59.48 218.25,59L218.25,56C218.25,55.52 217.98,55.25 217.5,55.25L209.67,55.25L209.67,41C209.67,40.52 209.4,40.25 208.92,40.25L205.47,40.25C204.99,40.25 204.72,40.52 204.72,41L204.72,59C204.72,59.48 204.99,59.75 205.47,59.75Z" style="fill-rule:nonzero;"/>
				<path d="M230.1,53.6L232.92,53.6C233.4,53.6 233.7,53.36 233.7,52.85L233.97,41C233.97,40.49 233.73,40.25 233.25,40.25L229.8,40.25C229.32,40.25 229.08,40.49 229.08,41L229.32,52.85C229.32,53.36 229.62,53.6 230.1,53.6ZM231.54,59.99C232.95,59.99 234,58.94 234,57.5C234,56.09 232.95,55.04 231.54,55.04C230.1,55.04 229.05,56.09 229.05,57.5C229.05,58.94 230.1,59.99 231.54,59.99Z" style="fill-rule:nonzero;"/>
			</g>
		</svg>
	</div>

	<div class="_primaryWidth" style="position: relative; padding: 128px 0;" id="getStarted">
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
						<div style="margin-top: 0.75em;">
							<GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
						</div>
					</section>
				</div>
			</div>
		</section>
	</div>

	<section class="section_introduction _primaryWidth" id="introduction">
		<div v-fade-in="'up'">
			<div class="section_introduction_bg">
				<img class="section_introduction_bg_image" src="/img/hero/mi-abstract-alpha.webp" alt="">
			</div>
		</div>
		<svg class="section_introduction_barcode" viewBox="0 0 28 198" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
			<g transform="matrix(1,0,0,1,-97.6635,83.9435)">
				<g transform="matrix(6.12323e-17,-1,1,6.12323e-17,96.6635,125.967)">
					<path d="M12.72,1L13.72,1L13.72,19L12.72,19L12.72,1ZM15.96,1L16.96,1L16.96,19L15.96,19L15.96,1ZM17.96,1L20.2,1L20.2,19L17.96,19L17.96,1ZM21.2,1L23.44,1L23.44,19L21.2,19L21.2,1ZM24.44,1L25.44,1L25.44,19L24.44,19L24.44,1ZM26.91,1L27.91,1L27.91,19L26.91,19L26.91,1ZM28.91,1L31.15,1L31.15,19L28.91,19L28.91,1ZM32.15,1L33.15,1L33.15,19L32.15,19L32.15,1ZM35.39,1L37.63,1L37.63,19L35.39,19L35.39,1ZM38.63,1L39.63,1L39.63,19L38.63,19L38.63,1ZM41.1,1L42.1,1L42.1,19L41.1,19L41.1,1ZM43.1,1L44.1,1L44.1,19L43.1,19L43.1,1ZM45.1,1L47.34,1L47.34,19L45.1,19L45.1,1ZM48.34,1L49.34,1L49.34,19L48.34,19L48.34,1ZM51.58,1L53.82,1L53.82,19L51.58,19L51.58,1ZM55.29,1L56.29,1L56.29,19L55.29,19L55.29,1ZM57.29,1L58.29,1L58.29,19L57.29,19L57.29,1ZM59.29,1L61.53,1L61.53,19L59.29,19L59.29,1ZM62.53,1L64.769,1L64.769,19L62.53,19L62.53,1ZM67.01,1L68.01,1L68.01,19L67.01,19L67.01,1ZM69.48,1L71.72,1L71.72,19L69.48,19L69.48,1ZM72.72,1L73.72,1L73.72,19L72.72,19L72.72,1ZM74.72,1L75.72,1L75.72,19L74.72,19L74.72,1ZM76.72,1L78.96,1L78.96,19L76.72,19L76.72,1ZM81.2,1L82.2,1L82.2,19L81.2,19L81.2,1ZM83.67,1L85.91,1L85.91,19L83.67,19L83.67,1ZM86.91,1L87.91,1L87.91,19L86.91,19L86.91,1ZM88.91,1L91.15,1L91.15,19L88.91,19L88.91,1ZM92.15,1L93.15,1L93.15,19L92.15,19L92.15,1ZM95.39,1L96.39,1L96.39,19L95.39,19L95.39,1ZM97.86,1L98.86,1L98.86,19L97.86,19L97.86,1ZM99.86,1L100.86,1L100.86,19L99.86,19L99.86,1ZM101.86,1L104.1,1L104.1,19L101.86,19L101.86,1ZM106.34,1L107.34,1L107.34,19L106.34,19L106.34,1ZM108.34,1L110.58,1L110.58,19L108.34,19L108.34,1ZM112.05,1L114.29,1L114.29,19L112.05,19L112.05,1ZM116.53,1L117.53,1L117.53,19L116.53,19L116.53,1ZM118.53,1L119.53,1L119.53,19L118.53,19L118.53,1ZM120.53,1L121.53,1L121.53,19L120.53,19L120.53,1ZM122.53,1L124.77,1L124.77,19L122.53,19L122.53,1ZM126.24,1L128.479,1L128.479,19L126.24,19L126.24,1ZM129.479,1L131.72,1L131.72,19L129.479,19L129.479,1ZM132.72,1L133.72,1L133.72,19L132.72,19L132.72,1ZM135.96,1L136.96,1L136.96,19L135.96,19L135.96,1ZM137.96,1L138.96,1L138.96,19L137.96,19L137.96,1ZM140.43,1L141.43,1L141.43,19L140.43,19L140.43,1ZM142.43,1L143.43,1L143.43,19L142.43,19L142.43,1ZM144.43,1L146.67,1L146.67,19L144.43,19L144.43,1ZM147.67,1L149.91,1L149.91,19L147.67,19L147.67,1ZM152.15,1L153.15,1L153.15,19L152.15,19L152.15,1ZM154.62,1L155.62,1L155.62,19L154.62,19L154.62,1ZM156.62,1L158.86,1L158.86,19L156.62,19L156.62,1ZM159.86,1L160.86,1L160.86,19L159.86,19L159.86,1ZM163.1,1L165.34,1L165.34,19L163.1,19L163.1,1ZM166.34,1L167.34,1L167.34,19L166.34,19L166.34,1ZM168.81,1L171.05,1L171.05,19L168.81,19L168.81,1ZM172.05,1L173.05,1L173.05,19L172.05,19L172.05,1ZM174.05,1L176.29,1L176.29,19L174.05,19L174.05,1ZM177.29,1L178.29,1L178.29,19L177.29,19L177.29,1ZM180.53,1L181.53,1L181.53,19L180.53,19L180.53,1ZM183,1L184,1L184,19L183,19L183,1ZM185,1L186,1L186,19L185,19L185,1ZM187,1L189.24,1L189.24,19L187,19L187,1ZM190.24,1L191.24,1L191.24,19L190.24,19L190.24,1ZM193.48,1L195.72,1L195.72,19L193.48,19L193.48,1ZM197.19,1L198.19,1L198.19,19L197.19,19L197.19,1ZM200.43,1L201.43,1L201.43,19L200.43,19L200.43,1ZM202.43,1L204.67,1L204.67,19L202.43,19L202.43,1ZM205.67,1L207.91,1L207.91,19L205.67,19L205.67,1ZM208.91,1L209.91,1L209.91,19L208.91,19L208.91,1ZM16.543,24.187L16.832,23.3L18.531,23.851L18.531,21.975L19.465,21.975L19.465,23.851L21.163,23.3L21.453,24.187L19.912,24.691L20.865,26.324L20.052,26.782L19.101,25.139L17.868,26.8L17.113,26.25L18.232,24.738L16.543,24.187ZM31.386,28.033L31.386,27.099L32.721,27.099L32.721,22.433L31.573,22.433L31.573,21.499L34.803,21.499L34.803,22.433L33.655,22.433L33.655,27.099L34.989,27.099L34.989,28.033L31.386,28.033ZM45.175,28.135L45.175,21.387L46.286,21.387L48.647,26.343L48.647,21.387L49.58,21.387L49.58,28.135L48.47,28.135L46.108,23.179L46.108,28.135L45.175,28.135ZM59.234,22.433L59.234,21.499L63.901,21.499L63.901,22.433L62.035,22.433L62.035,28.135L61.101,28.135L61.101,22.433L59.234,22.433ZM73.798,28.135L73.798,21.499C74.159,21.48 74.516,21.471 74.871,21.471C75.842,21.471 76.567,21.605 77.046,21.873C77.276,21.997 77.463,22.156 77.606,22.348C77.749,22.541 77.82,22.75 77.82,22.974C77.82,23.528 77.718,24.005 77.513,24.407C77.307,24.808 76.987,25.089 76.551,25.251L78.054,27.836L77.242,28.303L75.534,25.363L74.731,25.363L74.731,28.135L73.798,28.135ZM74.731,24.43L75.758,24.43C76.1,24.43 76.355,24.358 76.523,24.215C76.679,24.084 76.778,23.919 76.822,23.72C76.865,23.521 76.887,23.273 76.887,22.974C76.887,22.88 76.791,22.787 76.598,22.694C76.256,22.507 75.808,22.414 75.254,22.414C75.154,22.414 74.98,22.42 74.731,22.433L74.731,24.43ZM87.643,24.729L87.643,24.644C87.643,24.084 87.731,23.555 87.908,23.058C88.086,22.56 88.354,22.145 88.711,21.812C89.069,21.479 89.481,21.312 89.948,21.312C90.421,21.312 90.838,21.484 91.199,21.826C91.56,22.168 91.825,22.594 91.997,23.104C92.168,23.615 92.253,24.156 92.253,24.729C92.247,25.282 92.16,25.814 91.992,26.324C91.824,26.835 91.56,27.269 91.199,27.627C90.838,27.984 90.421,28.163 89.948,28.163C89.475,28.163 89.058,27.986 88.697,27.631C88.336,27.277 88.07,26.843 87.899,26.329C87.728,25.816 87.643,25.282 87.643,24.729ZM88.576,24.729C88.576,25.083 88.621,25.444 88.711,25.811C88.801,26.178 88.956,26.506 89.173,26.796C89.391,27.085 89.649,27.23 89.948,27.23C90.24,27.23 90.495,27.085 90.713,26.796C90.931,26.506 91.087,26.178 91.18,25.811C91.273,25.444 91.32,25.083 91.32,24.729C91.32,24.355 91.275,23.987 91.184,23.623C91.094,23.258 90.94,22.938 90.723,22.661C90.505,22.384 90.247,22.246 89.948,22.246C89.724,22.246 89.522,22.322 89.341,22.474C89.161,22.627 89.016,22.826 88.907,23.072C88.798,23.317 88.716,23.577 88.66,23.851C88.604,24.125 88.576,24.395 88.576,24.663L88.576,24.729ZM102.28,28.033L102.28,21.499L102.747,21.499C103.407,21.499 103.959,21.622 104.404,21.868C104.849,22.113 105.239,22.463 105.575,22.918C106.011,23.509 106.229,24.187 106.229,24.953C106.229,25.749 106.001,26.418 105.547,26.959C105.093,27.501 104.508,27.836 103.792,27.967C103.562,28.011 103.214,28.033 102.747,28.033L102.28,28.033ZM103.214,27.081C103.855,27.025 104.362,26.817 104.735,26.46C105.108,26.102 105.295,25.6 105.295,24.953C105.295,24.069 104.925,23.36 104.185,22.824C103.911,22.625 103.587,22.504 103.214,22.46L103.214,27.081ZM116.125,26.072L116.125,21.387L117.058,21.387L117.058,26.072C117.058,26.514 117.211,26.838 117.516,27.043C117.709,27.168 117.979,27.23 118.328,27.23C118.72,27.23 119.03,27.127 119.256,26.922C119.484,26.717 119.597,26.433 119.597,26.072L119.597,21.387L120.531,21.387L120.531,26.072C120.531,26.427 120.454,26.76 120.302,27.071C120.149,27.382 119.933,27.631 119.653,27.818C119.305,28.048 118.863,28.163 118.328,28.163C117.786,28.163 117.345,28.048 117.002,27.818C116.722,27.631 116.506,27.382 116.354,27.071C116.201,26.76 116.125,26.427 116.125,26.072ZM130.633,24.85L130.633,24.747C130.633,24.293 130.667,23.876 130.735,23.496C130.804,23.117 130.915,22.764 131.071,22.437C131.227,22.11 131.449,21.852 131.738,21.662C132.028,21.473 132.371,21.371 132.77,21.359C133.181,21.359 133.537,21.471 133.839,21.695C134.14,21.919 134.332,22.208 134.412,22.563L134.515,23.011L133.601,23.217C133.594,23.185 133.58,23.114 133.558,23.002C133.537,22.89 133.52,22.81 133.507,22.764C133.495,22.717 133.47,22.661 133.432,22.596C133.395,22.53 133.352,22.479 133.302,22.442C133.171,22.342 133,22.292 132.788,22.292C131.973,22.342 131.566,23.132 131.566,24.663L131.566,24.831C131.572,25.08 131.583,25.301 131.599,25.494C131.614,25.687 131.648,25.898 131.701,26.129C131.754,26.359 131.824,26.549 131.911,26.698C131.998,26.847 132.119,26.973 132.275,27.076C132.431,27.178 132.618,27.23 132.835,27.23C132.978,27.23 133.095,27.211 133.185,27.174C133.276,27.137 133.347,27.065 133.4,26.959C133.453,26.853 133.488,26.765 133.507,26.693C133.526,26.622 133.551,26.499 133.582,26.324L134.497,26.493C134.422,26.878 134.341,27.172 134.254,27.375C134.167,27.577 134.011,27.753 133.787,27.902C133.514,28.076 133.196,28.163 132.835,28.163C132.418,28.163 132.062,28.071 131.767,27.888C131.471,27.704 131.245,27.449 131.09,27.123C130.934,26.796 130.821,26.449 130.749,26.082C130.677,25.715 130.639,25.304 130.633,24.85ZM144.374,22.433L144.374,21.499L149.041,21.499L149.041,22.433L147.175,22.433L147.175,28.135L146.241,28.135L146.241,22.433L144.374,22.433ZM159.096,28.033L159.096,27.099L160.431,27.099L160.431,22.433L159.283,22.433L159.283,21.499L162.513,21.499L162.513,22.433L161.365,22.433L161.365,27.099L162.699,27.099L162.699,28.033L159.096,28.033ZM172.783,24.729L172.783,24.644C172.783,24.084 172.871,23.555 173.048,23.058C173.226,22.56 173.494,22.145 173.851,21.812C174.209,21.479 174.621,21.312 175.088,21.312C175.561,21.312 175.978,21.484 176.339,21.826C176.7,22.168 176.965,22.594 177.137,23.104C177.308,23.615 177.393,24.156 177.393,24.729C177.387,25.282 177.3,25.814 177.132,26.324C176.964,26.835 176.7,27.269 176.339,27.627C175.978,27.984 175.561,28.163 175.088,28.163C174.615,28.163 174.198,27.986 173.837,27.631C173.476,27.277 173.21,26.843 173.039,26.329C172.868,25.816 172.783,25.282 172.783,24.729ZM173.716,24.729C173.716,25.083 173.761,25.444 173.851,25.811C173.941,26.178 174.096,26.506 174.313,26.796C174.531,27.085 174.789,27.23 175.088,27.23C175.38,27.23 175.635,27.085 175.853,26.796C176.071,26.506 176.227,26.178 176.32,25.811C176.413,25.444 176.46,25.083 176.46,24.729C176.46,24.355 176.415,23.987 176.325,23.623C176.234,23.258 176.08,22.938 175.863,22.661C175.645,22.384 175.387,22.246 175.088,22.246C174.864,22.246 174.662,22.322 174.481,22.474C174.301,22.627 174.156,22.826 174.047,23.072C173.938,23.317 173.856,23.577 173.8,23.851C173.744,24.125 173.716,24.395 173.716,24.663L173.716,24.729ZM187.075,28.135L187.075,21.387L188.186,21.387L190.547,26.343L190.547,21.387L191.481,21.387L191.481,28.135L190.37,28.135L188.008,23.179L188.008,28.135L187.075,28.135ZM201.013,24.187L201.302,23.3L203.001,23.851L203.001,21.975L203.935,21.975L203.935,23.851L205.633,23.3L205.923,24.187L204.382,24.691L205.335,26.324L204.522,26.782L203.571,25.139L202.338,26.8L201.583,26.25L202.702,24.738L201.013,24.187Z"/>
				</g>
			</g>
		</svg>
		<div v-fade-in="'right'">
			<div class="section_introduction_content _secondaryWidth">
				<h2 class="section_introduction_content_title"><b v-text-underline>{{ $t('_landing._introduction.title') }}</b></h2>
				<div class="section_introduction_content_description">{{ $t('_landing._introduction.description') }}</div>
			</div>
		</div>
		<div v-fade-in="'up'">
			<div class="swiper _secondaryWidth acrylic">
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
		</div>
	</section>

	<section class="introductionTip _secondaryWidth">
		<p class="introductionTipText">
			<b class="" style="background: #9ad11b; color: #000; border-radius: 999px; padding: 4px 16px; margin-right: 16px;">TIP:</b>
			<span>{{ $t('_landing._introduction.tip') }}</span>
		</p>
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
					<div style="margin-top: 0.75em; display: flex; gap: 12px;">
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
			<div style="position: sticky; top: 100px;">
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
			<div style="position: sticky; top: 100px;">
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
			<div style="position: sticky; top: 100px;">
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
						<div style="margin-top: 0.75em;">
							<GButton buttonType="link" :to="localePath('/docs/donate/')" color="accent">{{ $t('learnMore') }}</GButton>
						</div>
					</section>
				</div>
			</div>
		</section>
	</div>

	<section class="section_madeBy _primaryWidth" v-fade-in="'up'">
		<div>
			<h2 class="section_madeBy_title">Made by</h2>
			<img class="section_madeBy_image" src="/midev.png" alt="">
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
import type { InstanceInfo, InstanceItem, InstancesStatsObj } from '@/types/instances-info';

const { notice } = useAppConfig();
const isUwu = useState<boolean>('isUwu');
const localePath = useGLocalePath();
const { locale, fallbackLocale } = useI18n();
const runtimeConfig = useRuntimeConfig();

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

const { data: instances } = await useGAsyncData<InstanceInfo | null>('serverInfo', () => Promise.allSettled([
    $fetch<InstanceInfo>(`${runtimeConfig.public.serverListApiBaseUrl}/instances.json`),
]).then(([instances]) => {
    if (instances.status !== 'fulfilled') {
        return null;
    }

    return instances.status === 'fulfilled' ? instances.value : null;
}));

const tickerServers = instances.value == null ? [] : instances.value.instancesInfos
	.sort((a, b) => (b.stats?.originalUsersCount ?? 0) - (a.stats?.originalUsersCount ?? 0))
	.slice(0, 30);

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

	const cloudItems = instances.value == null ? [] : instances.value.instancesInfos
		.sort((a, b) => (b.stats?.originalUsersCount ?? 0) - (a.stats?.originalUsersCount ?? 0))
		.slice(0, 30)
		.filter(info => /^[a-zA-Z0-9\-\.]+$/.test(info.url))
		.map(info => `<img src="https://${info.url}/favicon.ico" alt="" width="35">`);

	TagCloud('.section_decentralized_cloudContainer_cloud', cloudItems, {
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
	--w-margin: 32px;
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

._secondaryWidth {
	width: calc(100vw - var(--w-margin) * 4);
	max-width: var(--secondary-width);
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
	border-radius: 16px;
}
:global(html.dark) {
	.acrylic {
		background: #3336;
		color: #fffd;
	}
}

/* ------------------------------------------------------------------------- */
/* top section */

.tickers {
	display: flex;
	align-items: center;
	background: #fff6;
	backdrop-filter: blur(12px);
	border-radius: 999px;
	padding: 0 8px;
	margin: 0 auto 32px auto;
	width: calc(100% - 32px);
	box-sizing: border-box;
	line-height: 40px;
	font-size: 90%;
	white-space: nowrap;
	overflow: clip;
}
:global(html.dark)  {
	.tickers {
		background: #4446;
	}
}
.tickersLabel {
	margin-right: 16px;
}
.tickersLabelContent {
	background: #9ad11b;
	color: #000;
	border-radius: 999px;
	padding: 4px 16px;
}
.tickersItems {
	display: inline-flex;
	flex: 1;
	min-width: 0;
	mask-image: linear-gradient(to right, transparent 0px, black 50px, black calc(100% - 50px), transparent 100%);
}
.tickersItem {
	display: inline-flex;
	align-items: center;
	vertical-align: bottom;
	margin: 0 24px;
	color: #000c;
}
:global(html.dark)  {
	.tickersItem {
		color: #fffd;
	}
}
.tickersItemIcon {
	display: inline-block;
	width: 20px;
	height: 20px;
	margin-right: 8px;
	border-radius: 999px;
}

.section_top {
	position: relative;
	border-radius: 16px;
	overflow: clip;
	box-sizing: border-box;
	margin-top: 16px;
	padding-top: 16px;
	padding-bottom: 140px;
	margin-bottom: -150px;
	contain: content;
}

.section_top_bg {
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 100%;
	height: 100%;
	border-radius: 16px;
	background: #ddd;
	overflow: clip;
	contain: content;
}
:global(html.dark)  {
	.section_top_bg {
		background: #222;
	}
}

.section_top_left {
	position: relative;
	padding: 45px 0 32px 0;
}

.section_top_right {
	position: relative;
	flex: 1;
}

.section_top_tagline {
	font-size: 320%;
	line-height: 120%;
}

.section_top_description {
	margin: 16px 0;
}

.section_top_buttons {
	display: flex;
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
	grid-template-columns: 1fr 1fr 1fr;
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
	margin-bottom: 100px;
	padding-bottom: 400px;
}

.section_introduction_bg {
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
	.section_introduction_bg {
		background: #222;
	}
}

.section_introduction_bg_image {
	position: absolute;
	bottom: -700px;
	right: -1200px;
	width: 2000px;
	max-width: initial;

	animation: parallax linear both;
	animation-timeline: view(y -50%);
	animation-range: cover;
}

@keyframes parallax {
	from { transform: translateY(-800px) }
	to { transform: translateY(800px) }
}

.section_introduction_barcode {
	position: absolute;
	top: 42px;
	left: 38px;
	height: 400px;
	color: #0001;
	fill: currentColor;
}
:global(html.dark)  {
	.section_introduction_barcode {
		color: #fff1;
	}
}

.section_introduction_content {
	position: relative;
	padding-top: 55px;
	padding-bottom: 55px;
}

.section_introduction_content_title {
	font-size: 150%;
	font-weight: bold;
	margin: 0;
	margin-bottom: 24px;
}

.section_introduction_content_description {
	max-width: 60%;
}

.swiper {
	position: absolute;
	left: 0;
	right: 0;
	width: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 32px;
}

.swiper-wrapper {

}

.swiper-slide {
	width: 700px;
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
	padding: 24px 32px;
	font-size: 90%;
	text-align: center;
}


/* ------------------------------------------------------------------------- */
/* donation and sponsors section */

.section_donationAndSponsors {
	margin-top: 16px;
}

.section_donationAndSponsors_content {
	display: flex;
	padding: 32px;
	gap: 16px;
}

.section_donationAndSponsors_sponsors {
	min-width: 0;
	width: 55%;
	box-sizing: border-box;
}
.section_donationAndSponsors_donation {
	min-width: 0;
	width: 45%;
	box-sizing: border-box;

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
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 8px;
}

.section_donationAndSponsors_donationDescription {}

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
	fill: #9ad11b;
	opacity: 0.5;
	--top-margin: 550px;
	top: var(--top-margin);
	height: calc(100% - (var(--top-margin) + 50px));
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
	display: flex;
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
	font-size: 85%;
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
