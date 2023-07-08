export function scrollTo(qs: string) {
    if (process.client) {
        document.querySelector(qs)?.scrollIntoView({
            behavior: 'smooth',
        });
    }
}