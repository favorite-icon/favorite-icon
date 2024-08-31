import { FaviconBadge } from 'favorite-icon-badge';
import './common';

const inputBackgroundColor = document.querySelector('#backgroundColor') as HTMLInputElement;
const inputTextColor = document.querySelector('#textColor') as HTMLInputElement;
const inputStrokeColor = document.querySelector('#strokeColor') as HTMLInputElement;
const inputPositionX = document.querySelector('#positionX') as HTMLInputElement;
const inputPositionY = document.querySelector('#positionY') as HTMLInputElement;
const inputCount = document.querySelector('#count') as HTMLInputElement;
const inputMaxCount = document.querySelector('#maxCount') as HTMLInputElement;

let favBadge = new FaviconBadge();
let imageBadge = new FaviconBadge();

function updateSettings() {
    const count = parseInt(inputCount.value, 10);
    const maxCount = parseInt(inputMaxCount.value, 10);
    const positionX = Number(inputPositionX.value);
    const positionY = Number(inputPositionY.value);

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
