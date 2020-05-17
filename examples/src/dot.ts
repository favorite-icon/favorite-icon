import FaviconDot from '../../packages/favorite-icon-dot/src/index';
import './common';

const buttonShow: HTMLInputElement = document.querySelector('#show');
const buttonHide: HTMLInputElement = document.querySelector('#hide');

const inputBackgroundColor: HTMLInputElement = document.querySelector('#backgroundColor');
const inputStrokeColor: HTMLInputElement = document.querySelector('#strokeColor');
const inputPositionX: HTMLInputElement = document.querySelector('#positionX');
const inputPositionY: HTMLInputElement = document.querySelector('#positionY');
const inputRadius: HTMLInputElement = document.querySelector('#radius');

let favDot = new FaviconDot();
let imageDot = new FaviconDot();

function updateSettings() {
    const radius = parseInt(inputRadius.value, 10);
    const positionX = inputPositionX.value as favicon.PositionX;
    const positionY = inputPositionY.value as favicon.PositionY;

    favDot = new FaviconDot({
        backgroundColor: inputBackgroundColor.value,
        strokeColor: inputStrokeColor.value,
        radius,
        positionX,
        positionY,
    });

    imageDot = new FaviconDot({
        backgroundColor: inputBackgroundColor.value,
        strokeColor: inputStrokeColor.value,
        radius,
        positionX,
        positionY,
        size: 64,
        links: [
            document.querySelector('#preview')
        ]
    });

    favDot.show();
    imageDot.show();
}

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

updateSettings();
