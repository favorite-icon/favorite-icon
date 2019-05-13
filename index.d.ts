declare namespace favicon {
	interface Static {
		icons: HTMLLinkElement[];
		change(src: string | HTMLCanvasElement, elems?: HTMLImageElement | HTMLLinkElement | Array<HTMLLinkElement | HTMLImageElement>): void;
		getOriginalSrc(): string;
		reset(): void;
		searchIcons(): HTMLLinkElement[];
	}

	interface Badge {
		update(count: number): void;
		destroy(): void;
	}

	interface BadgeStatic {
		new (options: BadgeOptions): Badge;
	}

	interface BadgeOptions {
		backgroundColor?: string;
		count?: string | number;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		maxCount?: number;
		fallback?(count: number, formattedCount: string): void;
		faviconSrc?: string;
		fontFamily?: string;
		fontStyle?: string;
		size?: number;
		formatter?(count: number): string;
		textColor?: string;
	}

	interface BadgeDefaultOptions {
		backgroundColor: string;
		faviconSrc: string;
		fontFamily: string;
		fontStyle: string;
		links: Array<HTMLLinkElement | HTMLImageElement>;
		maxCount: number;
		size?: number;
		textColor: string;
	}

	interface Video {
		start(): void;
		stop(): void;
		destroy(): void;
	}

	interface VideoStatic {
		new (options: VideoOptions): Video;
	}

	interface VideoOptions {
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		size?: number;
		timeout?: number;
		videoElement: HTMLVideoElement;
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
