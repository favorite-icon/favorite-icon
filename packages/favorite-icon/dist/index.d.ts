export declare class Favicon {
    static icons: HTMLLinkElement[];
    static originalSrc: string;
    static size: number;
    static hasSupport: boolean;
    static set(src: string | HTMLCanvasElement, elems?: HTMLImageElement | HTMLLinkElement | Array<HTMLLinkElement | HTMLImageElement>): void;
    static reset(): void;
    static searchIcons(): HTMLLinkElement[];
}
