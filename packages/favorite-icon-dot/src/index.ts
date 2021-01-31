import { Favicon } from '../../favorite-icon/src/index';
import { FaviconDotDefaultOptions, FaviconDotOptions } from './types';

const defaultOptions: FaviconDotDefaultOptions = {
    alpha: 1,
    backgroundColor: '#ff0000',
    faviconSrc: Favicon.originalSrc,
    links: Favicon.icons,
    positionX: 'right',
    positionY: 'top',
    radius: 5,
    size: Favicon.size,
    strokeColor: '#000',
};

export class FaviconDot {
    private options: FaviconDotOptions = {};
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private imageReady = false;
    private isShow = false;

    constructor(options?: FaviconDotOptions) {
        this.setOptions(options || {});

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

    private setOptionDefault<T extends keyof FaviconDotDefaultOptions>(name: T, defaultValue: FaviconDotDefaultOptions[T]): void {
        this.options[name] = this.options[name] ?? defaultValue;
    }

    public show(options?: FaviconDotOptions): void {
        this.isShow = true;

        if (options) {
            this.setOptions(options);
        }

        if (this.imageReady && Favicon.hasSupport) {
            this.draw();
        }
    }

    private setOptions(options?: FaviconDotOptions): void {
        const result = {};

        Object.keys(defaultOptions).forEach(key => {
            result[key] = options[key] ?? (result[key] ?? defaultOptions[key]);
        });

        this.options = result as FaviconDotDefaultOptions;
    }

    private draw(): void {
        const context = this.context;
        const { alpha, size, positionX, positionY } = this.options;
        this.context.clearRect(0, 0, size, size);
        this.context.drawImage(this.image, 0, 0, size, size);

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
        delete this.canvas;
        delete this.context;
        delete this.options;
    }
}
