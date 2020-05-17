declare namespace favicon {
	interface FaviconStatic {
		icons: HTMLLinkElement[];
		originalSrc: string;

		reset(): void;
		searchIcons(): HTMLLinkElement[];
		set(src: string | HTMLCanvasElement, elems?: HTMLImageElement | HTMLLinkElement | Array<HTMLLinkElement | HTMLImageElement>): void;
	}
}

declare module 'favorite-icon' {
	const Favicon: favicon.FaviconStatic;

	export = Favicon;
}
