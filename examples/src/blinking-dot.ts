import FaviconDot from '../../packages/favorite-icon-dot/dist/index.esm';
import TimeoutWorker from '../../packages/timeout-worker/dist/index.esm';
import './common';

const buttonShow: HTMLInputElement = document.querySelector('#show');
const buttonHide: HTMLInputElement = document.querySelector('#hide');

const inputBackgroundColor: HTMLInputElement = document.querySelector('#backgroundColor');
const inputStrokeColor: HTMLInputElement = document.querySelector('#strokeColor');
const inputPositionX: HTMLInputElement = document.querySelector('#positionX');
const inputPositionY: HTMLInputElement = document.querySelector('#positionY');
const inputRadius: HTMLInputElement = document.querySelector('#radius');
const inputAlpha: HTMLInputElement = document.querySelector('#alpha');

let favDot = new FaviconDot();
let imageDot = new FaviconDot({
    size: 64,
    links: [
        document.querySelector('#preview')
    ]
});


function updateSettings() {
    const radius = parseInt(inputRadius.value, 10);
    const alpha = parseFloat(inputAlpha.value);
    const positionX = inputPositionX.value as favicon.PositionX;
    const positionY = inputPositionY.value as favicon.PositionY;

    const options = {
        alpha,
        backgroundColor: inputBackgroundColor.value,
        strokeColor: inputStrokeColor.value,
        radius,
        positionX,
        positionY,
    };

    favDot.show(options);
    imageDot.show(options);
}

inputAlpha.oninput =
inputBackgroundColor.oninput =
inputStrokeColor.oninput =
inputRadius.oninput =
inputPositionX.onchange =
inputPositionY.onchange = updateSettings;

buttonShow.onclick = () => {
    imageDot.show();
    favDot.show();
};

buttonHide.onclick = () => {
    imageDot.hide();
    favDot.hide();
};


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

    favDot.show({
        alpha: value,
    });
}, 100);

updateSettings();
