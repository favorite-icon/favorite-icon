declare namespace favicon {
	interface FaviconStatic {
		icons: HTMLLinkElement[];
		set(src: string | HTMLCanvasElement, elems?: HTMLImageElement | HTMLLinkElement | Array<HTMLLinkElement | HTMLImageElement>): void;
		getOriginalSrc(): string;
		reset(): void;
		searchIcons(): HTMLLinkElement[];
	}
}

declare module 'favorite-icon' {
	const Favicon: favicon.FaviconStatic;

	export = Favicon;
}
