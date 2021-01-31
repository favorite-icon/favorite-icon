export type FaviconBadgePositionX = 'left' | 'center' | 'right' | number;
export type FaviconBadgePositionY = 'top' | 'middle' | 'bottom' | number;

export interface FaviconBadgeOptions {
    backgroundColor?: string;
    count?: number;
    fallback?(count: number, formattedCount: string): void;
    faviconSrc?: string;
    fontFamily?: string;
    fontStyle?: string;
    formatter?(count: number, maxCount: number): string;
    links?: Array<HTMLLinkElement | HTMLImageElement>;
    maxCount?: number;
    positionX?: FaviconBadgePositionX;
    positionY?: FaviconBadgePositionY;
    size?: number;
    strokeColor?: string;
    textColor?: string;
}

export interface FaviconBadgeDefaultOptions {
    backgroundColor: string;
    count: number;
    fallback(count: number, formattedCount: string): void;
    faviconSrc: string;
    fontFamily: string;
    fontStyle: string;
    formatter(count: number, maxCount: number): string;
    links: Array<HTMLLinkElement | HTMLImageElement>;
    maxCount: number;
    positionX: FaviconBadgePositionX;
    positionY: FaviconBadgePositionY;
    size?: number;
    strokeColor: string;
    textColor: string;
}
