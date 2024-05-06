export function uwu(setLocalStorage = true) {
    if (import.meta.client) {
        const params = new URLSearchParams(window.location.search);
        if (params.has('uwu') || params.has('kawaii') || window.localStorage.getItem('miHub_uwu') === 'true') {
            const uwuPreference = params.get('uwu') ?? params.get('kawaii');
            if (uwuPreference === 'false') {
                if (setLocalStorage) window.localStorage.setItem('miHub_uwu', 'false');
                return false;
            } else {
                if (setLocalStorage) window.localStorage.setItem('miHub_uwu', 'true');
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
