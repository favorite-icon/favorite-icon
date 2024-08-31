interface Window {
    opera?: unknown;
    chrome: unknown;
}

declare const window: Window;

export function hasSupport() {
    if (typeof window === 'undefined') {
        return false;
    }
    
    const ua = navigator.userAgent;
    if (ua.search(/Mobi|Android/i) > -1) {
        return false;
    }

    const opera = Boolean(window.opera) || ua.indexOf('Opera') > -1;
    const firefox = ua.toLowerCase().indexOf('firefox') > -1;
    const chrome = Boolean(window.chrome);

    return chrome || firefox || opera;
}
