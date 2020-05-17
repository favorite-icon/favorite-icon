declare namespace favicon {
	interface Dot {
		show(): void;
		hide(): void;
		destroy(): void;
	}

	interface DotStatic {
		new (options?: DotOptions): Dot;
	}

	interface DotOptions {
		backgroundColor?: string;
		faviconSrc?: string;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		positionX?: PositionX;
		positionY?: PositionY;
		radius?: number;
		size?: number;
		strokeColor?: string;
	}

	interface DotDefaultOptions {
		backgroundColor: string;
		faviconSrc: string;
		links: Array<HTMLLinkElement | HTMLImageElement>;
		positionX: PositionX;
		positionY: PositionY;
		radius: number;
		size?: number;
		strokeColor: string;
	}
}

declare module 'favorite-icon-dot' {
	const FaviconDot: favicon.DotStatic;

	export = FaviconDot;
}
