import type { Directive } from 'vue';

export const vFadeIn = {
	mounted: (src, binding, vn) => {
		src.classList.add('__v_fadeIn_out');
		src.children[0].style.transition = `all 0.5s ease`;

		function onIntersect(entries: IntersectionObserverEntry[]) {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('__v_fadeIn_in');
				} else {
					entry.target.classList.remove('__v_fadeIn_in');
				}
			}
		}

		const observer = new IntersectionObserver(onIntersect, {
			root: null,
			rootMargin: '9999px 0px -300px 0px',
			threshold: 0,
		});

		observer.observe(src);
	}
} satisfies Directive;
