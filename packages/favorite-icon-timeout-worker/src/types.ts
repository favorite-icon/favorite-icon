export type FaviconTimeoutWorkerMethod = {
        method: 'clearTimeout';
        timeoutId: number;
    } | {
        method: 'clearInterval';
        timeoutId: number;
    } | {
        method: 'setTimeout';
        timeoutId: number;
        delay: number;
    } | {
        method: 'setInterval';
        timeoutId: number;
        delay: number;
    };

export interface FaviconTimeoutWorkerEvent extends MessageEvent {
    data: FaviconTimeoutWorkerMethod;
}
