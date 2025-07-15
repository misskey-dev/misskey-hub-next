import type { Directive } from 'vue';

export const vFadeIn = {
	mounted: (src, binding, vn) => {
		if (window.location.search.includes('ss')) return;
	
		const name = binding.value || 'default';

		src.classList.add(`__v_fadeIn_${name}_out`);
		src.children[0].style.transition = `all 0.5s ease`;

		function onIntersect(entries: IntersectionObserverEntry[]) {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add(`__v_fadeIn_${name}_in`);
				} else {
					entry.target.classList.remove(`__v_fadeIn_${name}_in`);
				}
			}
		}

		const observer = new IntersectionObserver(onIntersect, {
			root: null,
			rootMargin: '9999px 0px -200px 0px',
			threshold: 0,
		});

		observer.observe(src);
	}
} satisfies Directive;
