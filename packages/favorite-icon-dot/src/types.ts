export type FaviconDotPositionX = 'left' | 'center' | 'right' | number;
export type FaviconDotPositionY = 'top' | 'middle' | 'bottom' | number;

export interface FaviconDotOptions {
    alpha?: number;
    backgroundColor?: string;
    faviconSrc?: string;
    links?: Array<HTMLLinkElement | HTMLImageElement>;
    positionX?: FaviconDotPositionX;
    positionY?: FaviconDotPositionY;
    radius?: number;
    size?: number;
    strokeColor?: string;
}

export interface FaviconDotDefaultOptions {
    alpha: number;
    backgroundColor: string;
    faviconSrc: string;
    links: Array<HTMLLinkElement | HTMLImageElement>;
    positionX: FaviconDotPositionX;
    positionY: FaviconDotPositionY;
    radius: number;
    size?: number;
    strokeColor: string;
}
