import Favicon from '../../favorite-icon/src/index';
import { FaviconBadgeDefaultOptions, FaviconBadgeOptions } from './types';

const defaultOptions: FaviconBadgeDefaultOptions = {
    backgroundColor: '#ff0000',
    count: 0,
    fallback: () => {/* */},
    faviconSrc: Favicon.originalSrc,
    formatter: (count: number, maxCount: number) => {
        if (count <= 0) {
            return '';
        } else if (maxCount && count > maxCount) {
            return `${maxCount}+`;
        }

        return String(count);
    },
    fontFamily: 'arial, sans-serif',
    fontStyle: 'normal',
    links: Favicon.icons,
    maxCount: 99,
    positionX: 'right',
    positionY: 'bottom',
    size: Favicon.size,
    strokeColor: '#000',
    textColor: '#fff',
};

export default class FaviconBadge {
    private options: FaviconBadgeDefaultOptions;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private imageReady = false;
    private count: number;
    private lastCount: number;

    constructor(options?: FaviconBadgeOptions) {
        this.setDefaultOptions(options || {});

        this.count = this.options.count;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.size;
        this.canvas.height = this.options.size;
        this.context = this.canvas.getContext('2d');

        this.loadImage();
    }

    public set(count: number): void {
        this.count = count;

        const formattedCount = this.options.formatter(count, this.options.maxCount);
        if (Favicon.hasSupport) {
            this.draw(count, formattedCount);
        } else {
            this.options.fallback(count, formattedCount);
        }
    }

    public reset(): void {
        Favicon.reset();
    }

    public destroy(): void {
        delete this.canvas;
        delete this.context;
        delete this.options;
    }

    private loadImage(): void {
        this.image = new Image();
        this.image.setAttribute('crossOrigin', 'anonymous');
        this.image.onload = this.image.onabort = this.image.onerror = () => {
            this.imageReady = true;
            this.set(this.count);
        };

        this.image.src = this.options.faviconSrc;
    }

    private setDefaultOptions(options: FaviconBadgeOptions): void {
        const result = {};
        Object.keys(defaultOptions).forEach(name => {
            result[name] = options[name] ?? defaultOptions[name];
        });

        this.options = result as FaviconBadgeDefaultOptions;
    }

    private draw(count: number, formattedCount: string): void {
        if (!this.imageReady || count === this.lastCount) {
            return;
        }

        this.lastCount = count;

        const size = this.options.size;
        this.context.clearRect(0, 0, size, size);
        this.context.drawImage(this.image, 0, 0, size, size);

        if (count) {
            this.drawNumber(formattedCount);
        }

        Favicon.set(this.canvas, this.options.links);
    }

    private drawNumber(formattedCount: string): void {
        const paddingX = 5;
        const paddingY = 1;
        const size = this.options.size;
        const height = size * 0.55;

        const context = this.context;
        const positionX = this.options.positionX;
        const positionY = this.options.positionY;
        context.font = `${this.options.fontStyle} ${height - 2 * paddingY}px ${this.options.fontFamily}`;
        context.textAlign = 'left';
        context.textBaseline = 'top';

        context.beginPath();
        context.fillStyle = this.options.backgroundColor;
        context.strokeStyle = this.options.strokeColor;

        const width = paddingX * 2 + context.measureText(formattedCount).width;

        let x = 0;
        if (typeof positionX === 'number') {
            x = positionX * size / Favicon.size;
        } else {
            if (positionX === 'center') {
                x = Math.max((size - width) / 2, 0);
            } else if (positionX === 'right') {
                x = Math.max(size - width, 0);
            }
        }

        let y = 0;
        if (typeof positionY === 'number') {
            y = positionY * size / Favicon.size;
        } else {
            if (positionY === 'middle') {
                y = Math.max((size - height) / 2, 0);
            } else if (positionY === 'bottom') {
                y = Math.max(size - height, 0);
            }
        }

        if (this.options.backgroundColor !== 'transparent') {
            context.fillRect(x, y, width - 1, height - 1)
            context.strokeRect(x, y, width - 1, height - 1);
        }
        context.fillStyle = this.options.textColor;
        context.fillText(formattedCount, x + paddingX, y + paddingY + 1);

        context.closePath();
    }
}
