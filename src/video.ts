import Favicon from './index';

export default class FaviconVideo {
    private options: favicon.VideoOptions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private timer: number;

    constructor(options: favicon.VideoOptions) {
        this.options = options;

        this.canvas = document.createElement('canvas');
        this.canvas.width = options.width;
        this.canvas.height = options.height;

        this.context = this.canvas.getContext('2d');

        this.options.videoElement.addEventListener('play', this.onplay, false);
        this.options.videoElement.addEventListener('endeed', this.onstop, false);
        this.options.videoElement.addEventListener('abort', this.onstop, false);
    }

    private onplay = () => {
        this.start();
    }

    private onstop = () => {
        this.stop();
    }

    public start() {
        this.timer = setInterval(() => this.draw(), this.options.timeout);
    }

    public stop() {
        window.clearInterval(this.timer);
        Favicon.reset();
    }

    private draw() {
        const video = this.options.videoElement;
        if (video.paused || video.ended) {
            this.stop();

            return false;
        }

        try {
            this.context.clearRect(0, 0, this.options.width, this.options.height);
            this.context.drawImage(this.options.videoElement, 0, 0, this.options.width, this.options.height);
        } catch (e) {}

        Favicon.change(this.canvas, this.options.links);
    }

    public destroy() {
        this.stop();

        this.options.videoElement.removeEventListener('play', this.onplay, false);
        this.options.videoElement.removeEventListener('endeed', this.onstop, false);
        this.options.videoElement.removeEventListener('abort', this.onstop, false);

        delete this.canvas;
        delete this.context;
        delete this.options;
    }
}
