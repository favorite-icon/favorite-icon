interface Window {
    opera?: object;
    InstallTrigger?: object;
    chrome: object;
}

declare const window: Window;

const opera = Boolean(window.opera) || navigator.userAgent.indexOf('Opera') > -1;
const firefox = typeof window.InstallTrigger !== 'undefined';
const chrome = Boolean(window.chrome);

export const hasSupport = chrome || firefox || opera;
