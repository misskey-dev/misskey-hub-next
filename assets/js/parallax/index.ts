export const vParallax = {
	mounted: (src: HTMLElement, binding: Ref<number>) => {
		src.style.willChange = 'transform';

		window.addEventListener('scroll', () => {
			src.style.transform = `translateY(${window.scrollY / binding.value}px)`;
		}, { passive: true });
	}
}
