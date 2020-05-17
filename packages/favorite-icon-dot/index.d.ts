declare namespace favicon {
	interface Dot {
		show(options?: DotOptions): void;
		hide(): void;
		destroy(): void;
	}

	interface DotStatic {
		new (options?: DotOptions): Dot;
	}

	type DotPositionX = 'left' | 'center' | 'right' | number;
	type DotPositionY = 'top' | 'middle' | 'bottom' | number;

	interface DotOptions {
		alpha?: number;
		backgroundColor?: string;
		faviconSrc?: string;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		positionX?: DotPositionX;
		positionY?: DotPositionY;
		radius?: number;
		size?: number;
		strokeColor?: string;
	}

	interface DotDefaultOptions {
		alpha: number;
		backgroundColor: string;
		faviconSrc: string;
		links: Array<HTMLLinkElement | HTMLImageElement>;
		positionX: DotPositionX;
		positionY: DotPositionY;
		radius: number;
		size?: number;
		strokeColor: string;
	}
}

declare module 'favorite-icon-dot' {
	const FaviconDot: favicon.DotStatic;

	export = FaviconDot;
}
