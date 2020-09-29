declare namespace timeoutworker {
	interface TimeoutWorker {
		setTimeout(callback: () => void, timeoutId: number): number;
		setInterval(callback: () => void, timeoutId: number): number;
		clearTimeout(timeoutId: number): void;
		clearInterval(timeoutId: number): void;
		terminate(): void;
	}

	interface TimeoutWorkerStatic {
		new (): TimeoutWorker;
	}
}

declare module 'timeout-worker' {
	const TimeoutWorker: timeoutworker.TimeoutWorkerStatic;

	export = TimeoutWorker;
}
