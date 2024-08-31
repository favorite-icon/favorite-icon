import { TimeoutWorkerMethod, TimeoutWorkerEvent } from './types';

export class FaviconTimeoutWorker {
    static gid = 1;

    private idMap: Map<number, () => void>;
    private worker: Worker;
    readonly hasSupport = typeof Worker !== 'undefined' && typeof Map !== 'undefined';

    constructor() {
        if (!this.hasSupport) {
            return;
        }

        this.idMap = new Map();
        this.worker = new Worker('{worker}');
        this.worker.onmessage = (event: TimeoutWorkerEvent) => {
            const method = event?.data?.method;
            if (method === 'setTimeout' || method === 'setInterval') {
                const callback = this.idMap.get(event.data.timeoutId);
                callback?.();
            }
        };
    }

    setTimeout(callback: () => void, delay: number): number {
        if (!this.hasSupport) {
            return setTimeout(callback, delay);
        }

        const timeoutId = this.getTimeoutId();
        const message: TimeoutWorkerMethod = {
            method: 'setTimeout',
            timeoutId,
            delay,
        };

        this.worker.postMessage(message);
        this.idMap.set(timeoutId, callback);

        return timeoutId;
    }

    setInterval(callback: () => void, delay: number): number {
        if (!this.hasSupport) {
            return setInterval(callback, delay);
        }

        const timeoutId = this.getTimeoutId();
        const message: TimeoutWorkerMethod = {
            method: 'setInterval',
            timeoutId,
            delay,
        };

        this.worker.postMessage(message);
        this.idMap.set(timeoutId, callback);

        return timeoutId;
    }

    clearTimeout(timeoutId: number): void {
        if (!this.hasSupport) {
            return clearTimeout(timeoutId);
        }

        const message: TimeoutWorkerMethod = {
            method: 'clearTimeout',
            timeoutId,
        };

        this.worker.postMessage(message);
        this.idMap.delete(timeoutId);
    }

    clearInterval(timeoutId: number): void {
        if (!this.hasSupport) {
            return clearInterval(timeoutId);
        }

        const message: TimeoutWorkerMethod = {
            method: 'clearInterval',
            timeoutId,
        };

        this.worker.postMessage(message);
        this.idMap.delete(timeoutId);
    }

    private getTimeoutId() {
        return TimeoutWorker.gid++;
    }

    terminate(): void {
        this.idMap.clear();
        this.worker.terminate();
    }
}
