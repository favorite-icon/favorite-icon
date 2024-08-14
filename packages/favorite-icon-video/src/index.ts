import { Favicon } from '../../favorite-icon/src/index';
import { FaviconVideoOptions } from './types';

export class FaviconVideo {
    private options: Required<FaviconVideoOptions>;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;

    constructor(options: FaviconVideoOptions) {
        const size = options.size || Favicon.size;
        this.options = {
            links: options.links,
            size,
            video: options.video,
        };

        this.canvas = document.createElement('canvas');

        this.canvas.width = size;
        this.canvas.height = size;

        this.context = this.canvas.getContext('2d');
    }

    public start() {
        this.unbindEvents();
        this.bindEvents();
    }

    public stop() {
        this.unbindEvents();
    }

    private bindEvents() {
        this.options.video.addEventListener('timeupdate', this.handleTimeupdate, false);
    }

    private unbindEvents() {
        this.options.video.removeEventListener('timeupdate', this.handleTimeupdate, false);
    }

    public reset(): void {
        Favicon.reset();
    }

    public destroy(): void {
        const video = this.options.video;
        video.removeEventListener('timeupdate', this.handleTimeupdate, false);
    }

    private handleTimeupdate = () => {
        if (!this.context) {
            return;
        }

        try {
            const { size, video } = this.options;
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(video, 0, 0, size, size);
        } catch (e) {
            console.error(e);
        }

        Favicon.set(this.canvas, this.options.links);
    }
}
