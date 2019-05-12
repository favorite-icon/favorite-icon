import { hasSupport } from './support';
import Favicon from './index';

const defaultOptions: favicon.BadgeDefaultOptions = {
    backgroundColor: '#ff0000',
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    textColor: '#ffffff',
    faviconSrc: Favicon.getOriginalSrc(),
    maxCount: 99,
    width: Favicon.width,
    height: Favicon.height,
    links: Favicon.icons
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
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.context = this.canvas.getContext('2d');

        this.loadImage();
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
            this.update(this.count);
        };

        this.image.src = this.options.faviconSrc;
    }

    private setOptionDefault<T extends keyof favicon.BadgeDefaultOptions>(name: T, defaultValue: favicon.BadgeDefaultOptions[T]) {
        this.options[name] = this.options[name] || defaultValue;
    }

    public update(count: number) {
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

        const { width, height } = this.options;
        this.context.clearRect(0, 0, width, height);
        this.context.drawImage(this.image, 0, 0, width, height);

        if (count) {
            this.drawNumber(count, formattedCount);
        }

        Favicon.change(this.canvas);
    }

    private drawNumber(count: number, formattedCount: string) {
        const padding = 2;
        const height = this.options.height * 0.6;
        const fontSize = String(count).length > 1 ? 0.9 : 1;

        const context = this.context;
        context.font = `${this.options.fontStyle} ${fontSize * height}px ${this.options.fontFamily}`;
        context.textAlign = 'center';

        context.beginPath();
        context.textBaseline = 'middle';
        context.fillStyle = this.options.backgroundColor;

        const width = padding * 2 + context.measureText(formattedCount).width;
        const x = Math.max(this.options.width - width, 0);
        const y = this.options.height - height;
        context.fillRect(x, y, width - 1, height - 1)
        context.strokeRect(x, y, width - 1, height - 1);
        context.fillStyle = this.options.textColor;
        context.fillText(formattedCount, x + width / 2, y + height / 2 + 2);

        context.closePath();
    }
};
