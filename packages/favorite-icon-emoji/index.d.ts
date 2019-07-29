declare namespace favicon {
	interface EmojiStatic {
		set(symbol: string): void;
		reset(): void;
	}

	interface EmojiOptions {
		color?: string;
		size?: number;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
	}
}

declare module 'favicon-icon-emoji' {
	const FaviconEmoji: favicon.EmojiStatic;

	export = FaviconEmoji;
}

