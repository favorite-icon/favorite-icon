import { TimeoutWorkerMethod, TimeoutWorkerEvent } from './types';

export class TimeoutWorker {
    static gid = 1;

    private idMap: Map<number, () => void>;
    private worker: Worker;
    readonly hasSupport = typeof Worker !== 'undefined' && typeof Map !== 'undefined';

    constructor() {
        if (!this.hasSupport) {
            return;
        }

        this.idMap = new Map();
        this.worker = new Worker('{./worker.ts}');
        this.worker.onmessage = (event: TimeoutWorkerEvent) => {
            const method = event?.data?.method;
            if (method === 'setTimeout' || method === 'setInterval') {
                const callback = this.idMap.get(event.data.timeoutId);
                callback?.();
            }
        };
    }

    setTimeout(callback: () => number, delay: number): number {
        if (!this.hasSupport) {
            return window.setTimeout(callback, delay);
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

    setInterval(callback: () => number, delay: number): number {
        if (!this.hasSupport) {
            return window.setInterval(callback, delay);
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
