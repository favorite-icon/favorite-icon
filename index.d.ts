declare namespace favicon {
	interface Static {
		icons: HTMLLinkElement[];
		set(src: string | HTMLCanvasElement, elems?: HTMLImageElement | HTMLLinkElement | Array<HTMLLinkElement | HTMLImageElement>): void;
		getOriginalSrc(): string;
		reset(): void;
		searchIcons(): HTMLLinkElement[];
	}

	interface Badge {
		set(count: number): void;
		reset(): void;
		destroy(): void;
	}

	interface BadgeStatic {
		new (options: BadgeOptions): Badge;
	}

	type PositionX = 'left' | 'center' | 'right';
	type PositionY = 'top' | 'center' | 'bottom';

	interface BadgeOptions {
		backgroundColor?: string;
		strokeColor?: string;
		count?: string | number;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		maxCount?: number;
		fallback?(count: number, formattedCount: string): void;
		faviconSrc?: string;
		fontFamily?: string;
		fontStyle?: string;
		positionX?: PositionX;
		positionY?: PositionY;
		size?: number;
		formatter?(count: number): string;
		textColor?: string;
	}

	interface BadgeDefaultOptions {
		backgroundColor: string;
		strokeColor: string;
		faviconSrc: string;
		fontFamily: string;
		fontStyle: string;
		links: Array<HTMLLinkElement | HTMLImageElement>;
		maxCount: number;
		positionX: PositionX;
		positionY: PositionY;
		size?: number;
		textColor: string;
	}

	interface Video {
		start(): void;
		stop(): void;
		reset(): void;
		destroy(): void;
	}

	interface VideoStatic {
		new (options: VideoOptions): Video;
	}

	interface VideoOptions {
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		size?: number;
		timeout?: number;
		video: HTMLVideoElement;
	}

	interface EmojiStatic {
		set(symbol: string): void;
		reset(): void;
	}

	interface EmojiOptions {
		size?: number;
	}
}

declare module 'favicon' {
	const Favicon: favicon.Static;

	export = Favicon;
}

declare module 'favicon/badge' {
	const FaviconBadge: favicon.BadgeStatic;

	export = FaviconBadge;
}

declare module 'favicon/video' {
	const FaviconVideo: favicon.VideoStatic;

	export = FaviconVideo;
}

declare module 'favicon/emoji' {
	const FaviconEmoji: favicon.EmojiStatic;

	export = FaviconEmoji;
}

