import FaviconBadge from '../../packages/favorite-icon-badge/src/index';
import './common';

const inputBackgroundColor: HTMLInputElement = document.querySelector('#backgroundColor');
const inputTextColor: HTMLInputElement = document.querySelector('#textColor');
const inputStrokeColor: HTMLInputElement = document.querySelector('#strokeColor');
const inputPositionX: HTMLInputElement = document.querySelector('#positionX');
const inputPositionY: HTMLInputElement = document.querySelector('#positionY');
const inputCount: HTMLInputElement = document.querySelector('#count');
const inputMaxCount: HTMLInputElement = document.querySelector('#maxCount');

let favBadge = new FaviconBadge();
let imageBadge = new FaviconBadge();

let count = 1;

function updateSettings() {
    const maxCount = parseInt(inputMaxCount.value, 10);
    const positionX = inputPositionX.value as favicon.PositionX;
    const positionY = inputPositionY.value as favicon.PositionY;

    favBadge = new FaviconBadge({
        backgroundColor: inputBackgroundColor.value,
        textColor: inputTextColor.value,
        strokeColor: inputStrokeColor.value,
        maxCount: maxCount,
        positionX,
        positionY,
    });

    imageBadge = new FaviconBadge({
        backgroundColor: inputBackgroundColor.value,
        textColor: inputTextColor.value,
        strokeColor: inputStrokeColor.value,
        maxCount: maxCount,
        positionX,
        positionY,
        size: 64,
        links: [
            document.querySelector('#preview')
        ]
    });

    favBadge.set(count);
    imageBadge.set(count);
}

updateSettings();

favBadge.set(count);
imageBadge.set(count);

inputCount.value = String(count);
inputCount.oninput = function() {
    const count = Number(inputCount.value);
    favBadge.set(count);
    imageBadge.set(count)
};

inputBackgroundColor.onchange =
inputTextColor.onchange =
inputStrokeColor.onchange =
inputPositionX.onchange =
inputPositionY.onchange = updateSettings;