export function useGAsyncData(...params: Parameters<typeof useAsyncData>) {
    if (!params[2]) {
        params[2] = {};
    }
    params[2].getCachedData = (key) => useNuxtData(key).data.value ?? null;
    
    return useAsyncData(...params);
}