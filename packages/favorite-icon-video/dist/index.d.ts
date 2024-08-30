import { FaviconVideoOptions } from './types';
export interface Options {
    size: number;
    links?: Array<HTMLLinkElement | HTMLImageElement>;
}
export declare class FaviconVideo {
    private options;
    private canvas?;
    private context?;
    private video;
    constructor(options?: FaviconVideoOptions);
    start(video: HTMLVideoElement): void;
    stop(): void;
    private bindEvents;
    private unbindEvents;
    reset(): void;
    destroy(): void;
    private handleTimeupdate;
}
