import { FaviconDot } from '../../packages/favorite-icon-dot/src/index';
import { TimeoutWorker } from '../../packages/timeout-worker/src/index';
import './common';

let favDot = new FaviconDot();
let imageDot = new FaviconDot({
    size: 64,
    links: [
        document.querySelector('#preview')
    ]
});


let coefficient = -1;
let step = 0.2;
let value = 1;

const worker = new TimeoutWorker();
worker.setInterval(() => {
    value += coefficient * step;

    if (value >= 1) {
        coefficient = -1;
        value = 1;
    }

    if (value <= 0) {
        coefficient = 1;
        value = 0;
    }

    const options = { alpha: value };
    favDot.show(options);
    imageDot.show(options);
}, 100);
