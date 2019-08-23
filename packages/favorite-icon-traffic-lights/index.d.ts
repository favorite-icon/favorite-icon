declare namespace favicon {	
	type TrafficLightsStatus = 'error' | 'ok' | 'warning';

	interface TrafficLightsStatic {
		status?: TrafficLightsStatus;
		set(status: TrafficLightsStatus): void;
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
