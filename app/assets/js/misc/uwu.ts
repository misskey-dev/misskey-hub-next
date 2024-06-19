export function uwu(setLocalStorage = true, enableLog = true) {
    if (import.meta.client) {
        const params = new URLSearchParams(window.location.search);
        if (params.has('uwu') || params.has('kawaii') || window.localStorage.getItem('miHub_uwu') === 'true') {
            const uwuPreference = params.get('uwu') ?? params.get('kawaii');
            if (uwuPreference === 'false') {
                if (setLocalStorage) window.localStorage.setItem('miHub_uwu', 'false');
                return false;
            } else {
                if (setLocalStorage) window.localStorage.setItem('miHub_uwu', 'true');
                if (enableLog) console.log('Kawaii mode is enabled! You can disable it by adding ?uwu=false or ?kawaii=false to the URL.');
                return true;
            }
        } else {
            if (setLocalStorage) window.localStorage.setItem('miHub_uwu', 'false');
            return false;
        }
    } else {
        return false;
    }
}
