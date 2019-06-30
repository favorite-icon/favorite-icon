import Favicon from './index';

export default class FaviconVideo {
    private options: favicon.VideoOptions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private timer: number;

    constructor(options: favicon.VideoOptions) {
        this.options = options;

        this.canvas = document.createElement('canvas');
        this.canvas.width = options.size;
        this.canvas.height = options.size;

        this.context = this.canvas.getContext('2d');

        const video = this.options.video;
        video.addEventListener('play', this.onplay, false);
        video.addEventListener('endeed', this.onstop, false);
        video.addEventListener('abort', this.onstop, false);
    }

    public start() {
        this.timer = setInterval(() => this.draw(), this.options.timeout);
    }

    public stop() {
        window.clearInterval(this.timer);
        Favicon.reset();
    }

    public destroy() {
        this.stop();

        const video = this.options.video;
        video.removeEventListener('play', this.onplay, false);
        video.removeEventListener('endeed', this.onstop, false);
        video.removeEventListener('abort', this.onstop, false);

        delete this.canvas;
        delete this.context;
        delete this.options;
    }

    private onplay = () => {
        this.start();
    }

    private onstop = () => {
        this.stop();
    }

    private draw() {
        const video = this.options.video;
        const size = this.options.size;
        if (video.paused || video.ended) {
            this.stop();

            return false;
        }

        try {
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(video, 0, 0, size, size);
        } catch (e) {}

        Favicon.set(this.canvas, this.options.links);
    }
}
