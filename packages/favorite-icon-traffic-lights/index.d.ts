declare namespace favicon {
	interface TrafficLightsStatic {
		setStatus(status: 'error' | 'done' | 'awaiting'): void;
		reset(): void;
	}

	interface TrafficLightsOptions {
		size?: number;
		links?: Array<HTMLLinkElement | HTMLImageElement>;
	}
}

declare module 'favicon-icon-traffic-lights' {
	const FaviconTrafficLights: favicon.TrafficLightsStatic;

	export = FaviconTrafficLights;
}
