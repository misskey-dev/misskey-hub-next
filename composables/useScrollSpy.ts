/**
 * Scrollspy allows you to watch visible headings in a specific page.
 * Useful for table of contents live style updates.
 */
export const useScrollspy = (config?: IntersectionObserverInit) => {
    let observingElements: Element[] = [];

    const observer = ref<IntersectionObserver>();
    const visibleHeadings = ref<string[]>([]);
    const activeHeadings = ref<string[]>([]);
    const mainHeading = ref<string | null>(null);

    function observerCallback(entries: IntersectionObserverEntry[]) {
        entries.forEach((entry) => {
            const id = entry.target.id;

            if (entry.isIntersecting) {
                visibleHeadings.value.push(id);
            } else {
                visibleHeadings.value = visibleHeadings.value.filter((t) => t !== id);
            }
        });

        mainHeading.value = entries.reduce((max, entry) => (entry.intersectionRatio > max.intersectionRatio ? entry : max), entries[0]).target.id;
    }

    function updateHeadings(headings: Element[]) {
        observingElements.forEach((el) => {
            observer.value?.unobserve(el);
        });

        observingElements = headings;

        observingElements.forEach((heading) => {
            observer.value?.observe(heading);
        });
    }

    watch(visibleHeadings, (val, oldVal) => {
        if (val.length === 0) { activeHeadings.value = oldVal } else { activeHeadings.value = val }
    }, { deep: true })

    // Create intersection observer
    onBeforeMount(() => (observer.value = new IntersectionObserver(observerCallback, config)))

    // Destroy it
    onBeforeUnmount(() => observer.value?.disconnect())

    return {
        visibleHeadings,
        activeHeadings,
        mainHeading,
        updateHeadings
    }
}