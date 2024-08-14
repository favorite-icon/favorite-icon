declare namespace favicon {
	interface Video {
		destroy(): void;
		reset(): void;
		start(video: HTMLVideoElement): void;
		stop(): void;
	}

	interface VideoStatic {
		new (options?: VideoOptions): Video;
	}

	interface VideoOptions {
		links?: Array<HTMLLinkElement | HTMLImageElement> | undefined;
		size?: number;
	}
}

declare module 'favicon-icon-video' {
	const FaviconVideo: favicon.VideoStatic;

	export = FaviconVideo;
}
