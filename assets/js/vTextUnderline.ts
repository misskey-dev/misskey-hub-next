import type { Directive } from 'vue';

export const vTextUnderline = {
	mounted: (src, binding, vn) => {
		if (window.location.search.includes('ss')) {
			src.classList.add(`__v_textUnderline`);
			src.classList.add(`__v_textUnderline_in`);
			return;
		}
	
		src.classList.add(`__v_textUnderline`);
		src.classList.add(`__v_textUnderline_out`);
		//src.children[0].style.transition = `all 0.5s ease`;

		function onIntersect(entries: IntersectionObserverEntry[]) {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add(`__v_textUnderline_in`);
				} else {
					entry.target.classList.remove(`__v_textUnderline_in`);
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
