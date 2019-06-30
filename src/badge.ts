import { hasSupport } from './support';
import Favicon from './index';

const defaultOptions: favicon.BadgeDefaultOptions = {
    backgroundColor: '#ff0000',
    fontFamily: 'arial, sans-serif',
    fontStyle: 'normal',
    strokeColor: '#000',
    textColor: '#fff',
    faviconSrc: Favicon.getOriginalSrc(),
    maxCount: 99,
    size: Favicon.size,
    links: Favicon.icons,
    positionX: 'right',
    positionY: 'bottom'
};

export default class FaviconBadge {
    private options: favicon.BadgeOptions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private imageReady: boolean = false;
    private count: number;
    private lastCount: number = 0;

    constructor(options: favicon.BadgeOptions) {
        this.options = options || {};

        Object.keys(defaultOptions).forEach((name: keyof favicon.BadgeDefaultOptions) => {
            this.setOptionDefault(name, defaultOptions[name]);
        });

        this.count = Number(this.options.count || 0);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.size;
        this.canvas.height = this.options.size;
        this.context = this.canvas.getContext('2d');

        this.loadImage();
    }

    public set(count: number) {
        this.count = count;

        const formattedCount = this.options.formatter ?
            this.options.formatter(count) :
            this.formatter(count);

        if (hasSupport) {
            this.draw(count, formattedCount);
        } else if (this.options.fallback) {
            this.options.fallback(count, formattedCount);
        }
    }

    public reset() {
        Favicon.reset();
    }

    public destroy() {
        delete this.canvas;
        delete this.context;
        delete this.options;
    }

    private loadImage() {
        this.image = new Image();
        this.image.setAttribute('crossOrigin', 'anonymous');
        this.image.onload = this.image.onabort = this.image.onerror = () => {
            this.imageReady = true;
            this.set(this.count);
        };

        this.image.src = this.options.faviconSrc;
    }

    private setOptionDefault<T extends keyof favicon.BadgeDefaultOptions>(name: T, defaultValue: favicon.BadgeDefaultOptions[T]) {
        this.options[name] = this.options[name] || defaultValue;
    }

    private formatter(count: number): string {
        const maxCount = this.options.maxCount;
        if (count <= 0) {
            return '';
        } else if (maxCount && count > maxCount) {
            return `${maxCount}+`;
        }

        return String(count);
    }

    private draw(count: number, formattedCount: string) {
        if (!this.imageReady || count === this.lastCount) {
            return;
        }

        this.lastCount = count;

        const size = this.options.size;
        this.context.clearRect(0, 0, size, size);
        this.context.drawImage(this.image, 0, 0, size, size);

        if (count) {
            this.drawNumber(count, formattedCount);
        }

        Favicon.set(this.canvas, this.options.links);
    }

    private drawNumber(count: number, formattedCount: string) {
        const padding = 4;
        const size = this.options.size;
        const height = size * 0.6;
        const fontSize = String(count).length > 1 ? 0.9 : 1;

        const context = this.context;
        const positionX = this.options.positionX;
        const positionY = this.options.positionY;
        context.font = `${this.options.fontStyle} ${fontSize * height}px ${this.options.fontFamily}`;
        context.textAlign = 'left';
        context.textBaseline = 'top';

        context.beginPath();
        context.fillStyle = this.options.backgroundColor;
        context.strokeStyle = this.options.strokeColor;

        const width = padding * 2 + context.measureText(formattedCount).width;

        let x = 0;
        if (positionX === 'center') {
            x = Math.max((size - width) / 2, 0);
        } else if (positionX === 'right') {
            x = Math.max(size - width, 0);
        }

        let y = 0;
        if (positionY === 'center') {
            y = Math.max((size - height) / 2, 0);
        } else if (positionY === 'bottom') {
            y = Math.max(size - height, 0);
        }

        if (this.options.backgroundColor !== 'transparent') {
            context.fillRect(x, y, width - 1, height - 1)
            context.strokeRect(x, y, width - 1, height - 1);
        }
        context.fillStyle = this.options.textColor;
        context.fillText(formattedCount, x + padding, y + padding);

        context.closePath();
    }
};
