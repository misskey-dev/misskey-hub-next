import Rellax from 'rellax';

let rellax: Rellax.RellaxInstance;

export const vParallax = {
	mounted: (src: HTMLElement, binding: Ref<number>) => {
		src.style.willChange = 'transform';

		rellax = new Rellax(src, {
			speed: Math.pow(binding.value, 1.4) * -1,
		});
	},
	unmounted: () => {
		if (rellax) {
			rellax.destroy();
		}
	}
}
