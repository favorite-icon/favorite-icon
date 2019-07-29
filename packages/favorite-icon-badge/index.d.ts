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
}

declare module 'favorite-icon-badge' {
	const FaviconBadge: favicon.BadgeStatic;

	export = FaviconBadge;
}
