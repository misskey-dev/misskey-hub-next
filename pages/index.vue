<template>
<div>
	<GNav :landing="true" />

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
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
						<span class="tickersItem"><img class="tickersItemIcon" src="https://0key.dev/favicon.ico" alt="">xxxxxxx.example.com</span>
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
						<GButton button-type="button" @click="scrollTo('#learnMore')">{{ $t('learnMore') }}</GButton>
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

		<section class="section_keyFeatures _secondaryWidth">
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
				<span><b class="section_stats_label">Commits:</b>12,345</span>
				<span><b class="section_stats_label">Commits:</b>12,345</span>
				<span><b class="section_stats_label">Commits:</b>12,345</span>
				<span><b class="section_stats_label">Commits:</b>12,345</span>
			</div>
		</section>

		<svg class="scrollText" viewBox="0 0 300 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
			<g transform="matrix(30,0,0,30,64.2,59.75)">
				<path d="M0.309,0.012C0.465,0.012 0.575,-0.06 0.575,-0.199C0.575,-0.336 0.406,-0.381 0.363,-0.398C0.32,-0.415 0.238,-0.43 0.238,-0.467C0.238,-0.485 0.254,-0.497 0.288,-0.497C0.348,-0.497 0.399,-0.468 0.426,-0.445C0.438,-0.435 0.449,-0.434 0.461,-0.442L0.552,-0.503C0.564,-0.511 0.569,-0.523 0.561,-0.537C0.523,-0.599 0.424,-0.662 0.309,-0.662C0.181,-0.662 0.048,-0.608 0.048,-0.458C0.048,-0.31 0.218,-0.274 0.261,-0.257C0.304,-0.24 0.39,-0.224 0.39,-0.191C0.39,-0.173 0.384,-0.153 0.328,-0.153C0.26,-0.153 0.197,-0.2 0.168,-0.229C0.156,-0.24 0.145,-0.242 0.133,-0.233L0.039,-0.165C0.027,-0.156 0.023,-0.144 0.03,-0.131C0.07,-0.062 0.166,0.012 0.309,0.012Z" style="fill-rule:nonzero;"/>
			</g>
			<g transform="matrix(30,0,0,30,91.65,59.75)">
				<path d="M0.359,0.008C0.466,0.008 0.552,-0.035 0.609,-0.106C0.618,-0.117 0.614,-0.128 0.602,-0.138L0.509,-0.211C0.497,-0.221 0.485,-0.22 0.474,-0.208C0.448,-0.183 0.407,-0.157 0.359,-0.157C0.261,-0.157 0.195,-0.227 0.195,-0.325C0.195,-0.423 0.261,-0.493 0.359,-0.493C0.407,-0.493 0.448,-0.471 0.474,-0.446C0.486,-0.435 0.496,-0.432 0.509,-0.442L0.602,-0.512C0.615,-0.522 0.617,-0.534 0.607,-0.547C0.55,-0.616 0.464,-0.658 0.359,-0.658C0.166,-0.658 0.03,-0.518 0.03,-0.325C0.03,-0.132 0.166,0.008 0.359,0.008Z" style="fill-rule:nonzero;"/>
			</g>
			<g transform="matrix(30,0,0,30,120.36,59.75)">
				<path d="M0.065,-0L0.18,-0C0.196,-0 0.205,-0.009 0.205,-0.025L0.205,-0.201L0.272,-0.201L0.38,-0.017C0.387,-0.005 0.397,-0 0.41,-0L0.545,-0C0.565,-0 0.572,-0.012 0.562,-0.03L0.449,-0.222C0.513,-0.254 0.565,-0.321 0.565,-0.426C0.565,-0.579 0.455,-0.65 0.359,-0.65L0.065,-0.65C0.049,-0.65 0.04,-0.641 0.04,-0.625L0.04,-0.025C0.04,-0.009 0.049,-0 0.065,-0ZM0.205,-0.361L0.205,-0.49L0.331,-0.49C0.365,-0.49 0.4,-0.471 0.4,-0.426C0.4,-0.381 0.365,-0.361 0.331,-0.361L0.205,-0.361Z" style="fill-rule:nonzero;"/>
			</g>
			<g transform="matrix(30,0,0,30,147.66,59.75)">
				<path d="M0.359,0.008C0.552,0.008 0.686,-0.132 0.686,-0.325C0.686,-0.518 0.552,-0.658 0.359,-0.658C0.166,-0.658 0.03,-0.518 0.03,-0.325C0.03,-0.132 0.166,0.008 0.359,0.008ZM0.359,-0.157C0.261,-0.157 0.195,-0.227 0.195,-0.325C0.195,-0.423 0.261,-0.493 0.359,-0.493C0.457,-0.493 0.521,-0.423 0.521,-0.325C0.521,-0.227 0.457,-0.157 0.359,-0.157Z" style="fill-rule:nonzero;"/>
			</g>
			<g transform="matrix(30,0,0,30,178.59,59.75)">
				<path d="M0.065,-0L0.466,-0C0.482,-0 0.491,-0.009 0.491,-0.025L0.491,-0.125C0.491,-0.141 0.482,-0.15 0.466,-0.15L0.205,-0.15L0.205,-0.625C0.205,-0.641 0.196,-0.65 0.18,-0.65L0.065,-0.65C0.049,-0.65 0.04,-0.641 0.04,-0.625L0.04,-0.025C0.04,-0.009 0.049,-0 0.065,-0Z" style="fill-rule:nonzero;"/>
			</g>
			<g transform="matrix(30,0,0,30,203.52,59.75)">
				<path d="M0.065,-0L0.466,-0C0.482,-0 0.491,-0.009 0.491,-0.025L0.491,-0.125C0.491,-0.141 0.482,-0.15 0.466,-0.15L0.205,-0.15L0.205,-0.625C0.205,-0.641 0.196,-0.65 0.18,-0.65L0.065,-0.65C0.049,-0.65 0.04,-0.641 0.04,-0.625L0.04,-0.025C0.04,-0.009 0.049,-0 0.065,-0Z" style="fill-rule:nonzero;"/>
			</g>
			<g transform="matrix(30,0,0,30,228.45,59.75)">
				<path d="M0.055,-0.205L0.149,-0.205C0.165,-0.205 0.175,-0.213 0.175,-0.23L0.184,-0.625C0.184,-0.642 0.176,-0.65 0.16,-0.65L0.045,-0.65C0.029,-0.65 0.021,-0.642 0.021,-0.625L0.029,-0.23C0.029,-0.213 0.039,-0.205 0.055,-0.205ZM0.103,0.008C0.15,0.008 0.185,-0.027 0.185,-0.075C0.185,-0.122 0.15,-0.157 0.103,-0.157C0.055,-0.157 0.02,-0.122 0.02,-0.075C0.02,-0.027 0.055,0.008 0.103,0.008Z" style="fill-rule:nonzero;"/>
			</g>
		</svg>

		<section class="section_donationAndSponsors _primaryWidth">
			<GDots class="dotsBg" :space="30" />

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

		<section class="section_introduction _primaryWidth">
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
						<div style="line-height: 200%;">{{ $t('_landing._decenterized.description') }}</div>
						<GButton buttonType="link" color="accent">{{ $t('learnMore') }}</GButton>
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
				<div class="section_features_bg">
					<IndexHeroBg/>
				</div>
			</div>
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

		<section class="section_getStarted _primaryWidth" id="getStarted">
			<GDots class="dotsBgPrimary" :space="30" />

			<div class="section_getStarted_content _secondaryWidth">
				<div v-fade-in="'up'">
					<div class="section_getStarted_titleContainer acrylic">
						<b class="section_getStarted_titleContainer_title">{{ $t('_landing._getStarted.title') }}</b>
					</div>
				</div>
				<div class="section_getStarted_items">
					<div v-fade-in="'up'" class="section_getStarted_itemContainer">
						<div class="section_getStarted_item acrylic">
							<img class="section_getStarted_item_icon" src="/img/emojis/package_color.svg" aria-hidden="true">
							<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._create.title') }}</b>
							<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/servers')">{{ $t('_landing._getStarted._create.guide') }}<ArrowRightIco /></GButton>
						</div>
					</div>
					<div v-fade-in="'up'" class="section_getStarted_itemContainer">
						<div class="section_getStarted_item acrylic">
							<img class="section_getStarted_item_icon" src="/img/emojis/light_bulb_color.svg" aria-hidden="true">
							<b class="section_getStarted_item_title">{{ $t('_landing._getStarted._docs.title') }}</b>
							<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/servers')">{{ $t('_landing._getStarted._docs.docs') }}<ArrowRightIco /></GButton>
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
							<GButton class="section_getStarted_item_button" color="accent" buttonType="link" :to="localePath('/servers')">GitHub<ArrowUpRightIco /></GButton>
						</div>
					</div>
				</div>
			</div>
		</section>

	</main>

	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>

	<!--
	<GFooter />
	-->
</div>
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

definePageMeta({
		layout: 'landing',
});
</script>

<style scoped>
.main {
	--w-margin: 16px;
	--primary-width: 1800px;
	--secondary-width: 1150px;
	position: relative;
	z-index: 1;
}

._primaryWidth {
	width: calc(100vw - var(--w-margin) * 2);
	max-width: var(--primary-width);
	box-sizing: border-box;
	margin-left: auto;
	margin-right: auto;
}

._secondaryWidth {
	width: calc(100vw - var(--w-margin) * 2);
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
	padding-bottom: 160px;
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
	.topBarcode {
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

.scrollText {
	position: absolute;
	left: 0;
	right: 0;
	display: block;
	margin: 0 auto;
	fill: currentColor;
	width: 300px;
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

	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 6;
}

@keyframes parallax {
	from { transform: translateY(0); }
	to { transform: translateY(calc(-1700px + (var(--coefficient-parallax) * 400px))); }
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
	position: relative;
	padding: 128px 0;
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
	position: relative;
	padding: 128px 0;
}

.section_getStarted_titleContainer {
	padding: 24px;
	text-align: center;
	margin-bottom: 16px;
}

.section_getStarted_titleContainer_title {
	font-size: 130%;
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
	font-size: 90%;
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
