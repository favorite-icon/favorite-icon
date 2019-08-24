declare namespace favicon {
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
		count?: string | number;
		fallback?(count: number, formattedCount: string): void;
		faviconSrc?: string;
		fontFamily?: string;
		fontStyle?: string;
		formatter?(count: number): string;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		maxCount?: number;
		positionX?: PositionX;
		positionY?: PositionY;
		size?: number;
		strokeColor?: string;
		textColor?: string;
	}

	interface BadgeDefaultOptions {
		backgroundColor: string;
		faviconSrc: string;
		fontFamily: string;
		fontStyle: string;
		links: Array<HTMLLinkElement | HTMLImageElement>;
		maxCount: number;
		positionX: PositionX;
		positionY: PositionY;
		size?: number;
		strokeColor: string;
		textColor: string;
	}
}

declare module 'favorite-icon-badge' {
	const FaviconBadge: favicon.BadgeStatic;

	export = FaviconBadge;
}
