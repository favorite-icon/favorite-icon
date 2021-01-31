export type FaviconStatusType = 'error' | 'ok' | 'warning';

export interface FaviconStatusOptions {
    scale?: number;
    faviconSrc?: string;
    links?: Array<HTMLLinkElement | HTMLImageElement>;
    size?: number;
}
