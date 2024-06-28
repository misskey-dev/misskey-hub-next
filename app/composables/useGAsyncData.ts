type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>;

export function useGAsyncData<ResT, DataE = Error, DataT = ResT, PickKeys extends KeysOf<DataT> = KeysOf<DataT>, DefaultT = null>(...params: Parameters<typeof useAsyncData<ResT, DataE, DataT, PickKeys, DefaultT>>): ReturnType<typeof useAsyncData<ResT, DataE, DataT, PickKeys, DefaultT>> {
    if (!params[2]) {
        params[2] = {};
    }
    params[2].getCachedData = (key) => useNuxtData(key).data.value ?? undefined;
    
    return useAsyncData<ResT, DataE, DataT, PickKeys, DefaultT>(...params);
}