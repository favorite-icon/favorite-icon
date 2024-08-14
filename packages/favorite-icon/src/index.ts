const PNG_MIME_TYPE = 'image/png';

import { hasSupport } from './support';

export class Favicon {
    public static icons: HTMLLinkElement[] = Favicon.searchIcons();
    public static originalSrc = Favicon.icons[Favicon.icons.length - 1].href;
    public static size = 32;

    public static hasSupport = hasSupport();

    public static set(src: string | HTMLCanvasElement, elems?: HTMLImageElement | HTMLLinkElement | Array<HTMLLinkElement | HTMLImageElement>): void {
        if (!this.hasSupport) {
            return;
        }

        const items = elems || this.icons;

         (Array.isArray(items) ? items : [items]).forEach((item: HTMLImageElement | HTMLLinkElement) => {
            item.setAttribute(
                item instanceof HTMLImageElement ? 'src' : 'href',
                src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src
            );
        });
    }

    public static reset(): void {
        if (this.hasSupport) {
            this.set(Favicon.originalSrc);
        }
    }

    public static searchIcons(): HTMLLinkElement[] {
        if (typeof window === 'undefined') {
            return [];
        }
        
        const result: HTMLLinkElement[] = [];

        const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('head link');
        for (let i = 0; i < links.length; i++) {
            if ((/(^|\s)icon(\s|$)/i).test(links[i].rel)) {
                result.push(links[i]);
            }
        }

        if (!result.length) {
            const icon = document.createElement('link');
            icon.setAttribute('rel', 'icon');
            document.head.appendChild(icon);
            result.push(icon);
        }

        result.forEach((item) => {
            item.setAttribute('type', PNG_MIME_TYPE);
        });

        return result;
    }
}

