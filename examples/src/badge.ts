import { FaviconBadge } from '../../packages/favorite-icon-badge/dist/index.esm';
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

function updateSettings() {
    const count = parseInt(inputCount.value, 10);
    const maxCount = parseInt(inputMaxCount.value, 10);
    const positionX = inputPositionX.value;
    const positionY = inputPositionY.value;

    favBadge = new FaviconBadge({
        backgroundColor: inputBackgroundColor.value,
        textColor: inputTextColor.value,
        strokeColor: inputStrokeColor.value,
        maxCount,
        positionX,
        positionY,
    });

    imageBadge = new FaviconBadge({
        backgroundColor: inputBackgroundColor.value,
        textColor: inputTextColor.value,
        strokeColor: inputStrokeColor.value,
        maxCount,
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

inputBackgroundColor.oninput =
inputTextColor.oninput =
inputStrokeColor.oninput =
inputCount.oninput =
inputMaxCount.oninput =
inputPositionX.onchange =
inputPositionY.onchange = updateSettings;

updateSettings();
