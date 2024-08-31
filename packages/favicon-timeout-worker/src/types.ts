export type TimeoutWorkerMethod = {
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

export interface TimeoutWorkerEvent extends MessageEvent {
    data: TimeoutWorkerMethod;
}
