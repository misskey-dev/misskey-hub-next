export function resolveObjPath(o: object, s: string): any {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

export function isLocalPath(link: string, base?: string): boolean {
    let baseUrl;
    if (base) {
        baseUrl = base;
    } else {
        const runtimeConfig = useRuntimeConfig();
        baseUrl = runtimeConfig.public.baseUrl;
    }
    const rootDomain = new URL(baseUrl);
    try {
        const url = new URL(link);
        if (!url.hostname || rootDomain.hostname === url.hostname) {
            return true;
        } else if (rootDomain.hostname !== url.hostname) {
            return false;
        }
        return false;
    } catch(error) {
        if(link !== '') {
            return true;
        } else {
            throw error;
        }
    }
    
}