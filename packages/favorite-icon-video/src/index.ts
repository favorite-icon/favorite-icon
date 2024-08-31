import { Favicon } from 'favorite-icon';
import { FaviconVideoOptions } from './types';
export type { FaviconVideoOptions };

export interface Options {
    size: number;
    links?: Array<HTMLLinkElement | HTMLImageElement>;
}

export class FaviconVideo {
    private options: Options;
    private canvas?: HTMLCanvasElement;
    private context?: CanvasRenderingContext2D | null;
    private video?: HTMLVideoElement;

    constructor(options: FaviconVideoOptions = {}) {
        this.options = {
            links: options.links || undefined,
            size: options.size || Favicon.size,
        };
    }

    public start(video: HTMLVideoElement) {
        if (!Favicon.hasSupport) {
            return;
        }

        this.unbindEvents();

        this.video = video;

        this.canvas = document.createElement('canvas');

        this.canvas.width = this.options.size;
        this.canvas.height = this.options.size;

        this.context = this.canvas.getContext('2d');

        this.bindEvents();
    }

    public stop() {
        if (!Favicon.hasSupport) {
            return;
        }

        this.unbindEvents();
    }

    private bindEvents() {
        this.video?.addEventListener('timeupdate', this.handleTimeupdate, false);
    }

    private unbindEvents() {
        this.video?.removeEventListener('timeupdate', this.handleTimeupdate, false);
    }

    public reset(): void {
        if (!Favicon.hasSupport) {
            return;
        }

        Favicon.reset();
    }

    public destroy(): void {
        if (!Favicon.hasSupport) {
            return;
        }
                
        this.unbindEvents();
        this.video = undefined;
        this.canvas = undefined;
        this.context = undefined;
    }

    private handleTimeupdate = () => {
        if (!this.context || !this.video || !this.canvas) {
            return;
        }

        try {
            const { size } = this.options;
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(this.video, 0, 0, size, size);
        } catch (e) {
            console.error(e);
        }

        Favicon.set(this.canvas, this.options.links);
    }
}
