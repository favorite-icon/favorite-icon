import FaviconDot from '../../packages/favorite-icon-dot/dist/index.esm';
import TimeoutWorker from '../../packages/timeout-worker/dist/index.esm';
import './common';

let favDot = new FaviconDot();
let imageDot = new FaviconDot({
    size: 64,
    links: [
        document.querySelector('#preview')
    ]
});


let koef = -1;
let step = 0.2;
let value = 1;

const worker = new TimeoutWorker();
worker.setInterval(() => {
    value += koef * step;

    if (value >= 1) {
        koef = -1;
        value = 1;
    }

    if (value <= 0) {
        koef = 1;
        value = 0;
    }

    const options = { alpha: value };
    favDot.show(options);
    imageDot.show(options);
}, 100);
