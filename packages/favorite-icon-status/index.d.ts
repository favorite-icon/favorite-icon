declare namespace favicon {	
	type StatusType = 'error' | 'ok' | 'warning';

	interface StatusStatic {
		set(status: StatusType): void;
		reset(): void;
	}

	interface StatusOptions {
		faviconSrc?: string;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
		size?: number;
	}
}

declare module 'favicon-icon-status' {
	const FaviconTrafficLights: favicon.StatusStatic;

	export = FaviconTrafficLights;
}
