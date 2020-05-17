declare namespace favicon {
	type StatusType = 'error' | 'ok' | 'warning';

	interface Status {
		set(status: StatusType): void;
		reset(): void;
	}

	interface StatusStatic {
		new (options?: StatusOptions): Status;
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
