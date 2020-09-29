/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />
/// <reference lib="webworker" />

import { TimeoutWorkerMethod, TimeoutWorkerEvent } from './types';

const idMap = new Map<number, number>();

self.onmessage = (event: TimeoutWorkerEvent) => {
    const timeoutId = event.data.timeoutId;
    const workerTimeoutId = idMap.get(timeoutId);

    if (!workerTimeoutId) {
        return;
    }

    switch (event.data.method) {
        case 'clearTimeout':
            clearTimeout(workerTimeoutId);
            idMap.delete(timeoutId);
            break;
        case 'clearInterval':
            clearInterval(workerTimeoutId);
            idMap.delete(timeoutId);
            break
        case 'setTimeout':
            {
                const delay = event.data.delay;

                idMap.set(timeoutId, setTimeout(() => {
                    const message: TimeoutWorkerMethod = {
                        method: 'setTimeout',
                        timeoutId,
                        delay,
                    };

                    postMessage(message);
                    idMap.delete(timeoutId);
                }, delay));
            }
            break;
        case 'setInterval':
            {
                const delay = event.data.delay;

                idMap.set(timeoutId, setInterval(() => {
                    const message: TimeoutWorkerMethod = {
                        method: 'setInterval',
                        timeoutId,
                        delay,
                    };

                    postMessage(message);
                }, delay));
            }

            break;
    }
}

