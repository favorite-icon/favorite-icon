declare namespace favicon {
	interface Video {
		destroy(): void;
		pause(): void;
		reset(): void;
		start(): void;
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
}

declare module 'favicon-icon-video' {
	const FaviconVideo: favicon.VideoStatic;

	export = FaviconVideo;
}
