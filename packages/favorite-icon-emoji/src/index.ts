import { Favicon } from 'favorite-icon';
import { FaviconEmojiOptions } from './types';
export type { FaviconEmojiOptions };

export class FaviconEmoji {
    public static set(symbol: string, rawOptions: FaviconEmojiOptions): void {
        const options = rawOptions ?? {};
        const size = options && options.size || Favicon.size;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext('2d');

        const fontSize = size;
        context.fillStyle = options.color || '#000';
        context.font = `${fontSize}px/0.5 Arial, sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'top';

        context.clearRect(0, 0, size, size);
        context.fillText(symbol, size / 2, size * 0.1);

        Favicon.set(canvas, options && options.links);
    }

    public static reset(): void {
        Favicon.reset();
    }
}

