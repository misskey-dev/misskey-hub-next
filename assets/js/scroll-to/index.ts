export function scrollTo(qs: string) {
    if (import.meta.client) {
        document.querySelector(qs)?.scrollIntoView({
            behavior: 'smooth',
        });
    }
}