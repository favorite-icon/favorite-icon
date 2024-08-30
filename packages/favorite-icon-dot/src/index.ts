import { Favicon } from 'favorite-icon';
import { FaviconDotDefaultOptions, FaviconDotOptions } from './types';

const defaultOptions: FaviconDotDefaultOptions = {
    alpha: 1,
    backgroundColor: '#ff0000',
    faviconSrc: Favicon.originalSrc,
    links: undefined,
    positionX: 'right',
    positionY: 'top',
    radius: 5,
    size: Favicon.size,
    strokeColor: '#000',
};

export class FaviconDot {
    private options: Required<FaviconDotOptions>;
    private canvas: HTMLCanvasElement | null;
    private context: CanvasRenderingContext2D | null;
    private image: HTMLImageElement;
    private imageReady = false;
    private isShow = false;

    constructor(options?: FaviconDotOptions) {
        this.options = this.prepareOptions(options);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.size;
        this.canvas.height = this.options.size;
        this.context = this.canvas.getContext('2d');

        this.loadImage();
    }

    private loadImage(): void {
        this.image = new Image();
        this.image.setAttribute('crossOrigin', 'anonymous');
        this.image.onload = this.image.onabort = this.image.onerror = () => {
            this.imageReady = true;
            if (this.isShow) {
                this.show();
            }
        };

        this.image.src = this.options.faviconSrc;
    }

    public show(options?: FaviconDotOptions): void {
        this.isShow = true;

        if (options) {
            this.options = this.updateOptions(options);
        }

        if (this.imageReady && Favicon.hasSupport) {
            this.draw();
        }
    }

    private prepareOptions(options: FaviconDotOptions = {}): Required<FaviconDotOptions> {
        const result = {} as Required<FaviconDotOptions>;

        Object.keys(defaultOptions).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result[key] = options[key] ?? defaultOptions[key];
        });

        return result;
    }

    private updateOptions(options: FaviconDotOptions = {}): Required<FaviconDotOptions> {
        const result = {} as Required<FaviconDotOptions>;

        Object.keys(defaultOptions).forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result[key] = options[key] ?? (this.options[key] ?? defaultOptions[key]);
        });

        return result;
    }    

    private draw(): void {
        const context = this.context;
        if (!context || !this.canvas) {
            return;
        }

        const { alpha, size, positionX, positionY } = this.options;
        context.clearRect(0, 0, size, size);
        context.drawImage(this.image, 0, 0, size, size);

        context.save();
        context.globalAlpha = alpha;
        context.fillStyle = this.options.backgroundColor;
        context.strokeStyle = this.options.strokeColor;

        const radius = this.options.radius * size / Favicon.size;

        let x = 0;
        if (typeof positionX === 'number') {
            x = positionX * size / Favicon.size;
        } else {
            x = radius;
            if (positionX === 'center') {
                x = Math.max(size / 2, 0);
            } else if (positionX === 'right') {
                x = Math.max(size - radius, 0);
            }
        }

        let y = 0;
        if (typeof positionY === 'number') {
            y = positionY * size / Favicon.size;
        } else {
            y = radius;
            if (positionY === 'middle') {
                y = Math.max(size / 2, 0);
            } else if (positionY === 'bottom') {
                y = Math.max(size - radius, 0);
            }
        }

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fill();
        context.lineWidth = 1;
        context.stroke();
        context.closePath();

        context.restore();

        Favicon.set(this.canvas, this.options.links);
    }

    public hide(): void {
        this.isShow = false;
        Favicon.set(this.options.faviconSrc, this.options.links);
    }

    public destroy(): void {
        this.canvas = null;
        this.context = null;
    }
}
