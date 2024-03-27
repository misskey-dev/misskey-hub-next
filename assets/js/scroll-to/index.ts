export function scrollTo(qs: string) {
    if (process.client) {
        document.querySelector(qs)?.scrollIntoView({
            behavior: 'smooth',
        });
    }
}

export function scrollIntoViewWithOffset(el: HTMLElement, offset?: number) {
    if (process.client) {
        let _offset = offset;
        const width = window ? window.innerWidth : 0;

        if (!_offset) {
            if (width < 1024) {
                _offset = 80;
            } else {
                _offset = 96;
            }
        }

        const rect = el.getBoundingClientRect();
        window.scrollTo({
            top: rect.top + window.scrollY - _offset,
            behavior: 'smooth',
        });
    }
}
