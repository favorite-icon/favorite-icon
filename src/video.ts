import Favicon from './index';

export default class FaviconVideo {
    private options: favicon.VideoOptions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private timer: number;

    constructor(options: favicon.VideoOptions) {
        const size = options.size || Favicon.size;
        const videoElement = options.videoElement;
        this.options = {
            size,
            videoElement
        };

        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;

        this.context = this.canvas.getContext('2d');
        
        videoElement.addEventListener('play', this.onplay, false);
        videoElement.addEventListener('ended', this.onstop, false);
        videoElement.addEventListener('abort', this.onstop, false);
    }

    private onplay = () => {
        this.play();
    }

    private onstop = () => {
        this.stop();
    }

    public play() {
        this.options.videoElement.muted = true;
        this.options.videoElement.play();
        this.timer = setInterval(() => this.draw(), this.options.timeout || 25);
    }

    public stop() {
        window.clearInterval(this.timer);
        Favicon.reset();
    }

    private draw() {
        const videoElement = this.options.videoElement;
        if (videoElement.paused || videoElement.ended) {
            this.stop();
            return;
        }

        try {
            const size = this.options.size;
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(videoElement, 0, 0, size, size);
        } catch (e) {
            console.error(e);
        }

        Favicon.change(this.canvas, this.options.links);
    }

    public destroy() {
        this.stop();

        const videoElement = this.options.videoElement;
        videoElement.removeEventListener('play', this.onplay, false);
        videoElement.removeEventListener('endeed', this.onstop, false);
        videoElement.removeEventListener('abort', this.onstop, false);

        delete this.canvas;
        delete this.context;
        delete this.options;
    }
}
