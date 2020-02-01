import Favicon from '../../favorite-icon/src/index';

export default class FaviconVideo {
    private options: favicon.VideoOptions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private timer: number;

    constructor(options: favicon.VideoOptions) {
        const size = options.size || Favicon.size;
        const video = options.video;
        this.options = {
            links: options.links,
            size,
            video,
        };

        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;

        this.context = this.canvas.getContext('2d');

        video.addEventListener('play', this.onplay, false);
        video.addEventListener('ended', this.onstop, false);
        video.addEventListener('abort', this.onstop, false);
    }

    private onplay = () => {
        this.play();
    }

    private onstop = () => {
        this.pause();
    }

    public play() {
        this.options.video.muted = true;
        this.options.video.play();
        this.timer = setInterval(() => this.draw(), this.options.timeout || 25);
    }

    public pause() {
        this.options.video.pause();
        window.clearInterval(this.timer);
        Favicon.reset();
    }

    public destroy() {
        this.pause();

        const video = this.options.video;
        video.removeEventListener('play', this.onplay, false);
        video.removeEventListener('endeed', this.onstop, false);
        video.removeEventListener('abort', this.onstop, false);

        delete this.canvas;
        delete this.context;
        delete this.options;
    }

    private draw() {
        const video = this.options.video;
        if (video.paused || video.ended) {
            this.pause();
            return;
        }

        try {
            const size = this.options.size;
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(video, 0, 0, size, size);
        } catch (e) {
            console.error(e);
        }

        Favicon.set(this.canvas, this.options.links);
    }
}
