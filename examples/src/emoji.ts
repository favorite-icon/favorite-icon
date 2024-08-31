import { FaviconEmoji } from 'favorite-icon-emoji';
import './common';

const button1 = document.querySelector<HTMLInputElement>('#button1');
const button2 = document.querySelector<HTMLInputElement>('#button2');
const button3 = document.querySelector<HTMLInputElement>('#button3');
const button4 = document.querySelector<HTMLInputElement>('#button4');
const button5 = document.querySelector<HTMLInputElement>('#button5');
const button6 = document.querySelector<HTMLInputElement>('#button6');
const symbol = document.querySelector<HTMLInputElement>('#symbol');
const color = document.querySelector<HTMLInputElement>('#color');

function updateFavicon(value?: string) {
    const symbolString = value || symbol.value;

    if (value) {
        document.querySelector<HTMLInputElement>('#symbol').value = value;
    }

    FaviconEmoji.set(symbolString, {
    color: color.value,
    size: 64,
    links: [
        document.querySelector('#preview')
    ]
    });

    FaviconEmoji.set(symbolString, { color: color.value });
}

updateFavicon('❤️');

symbol.oninput =
    button1.onclick =
    button2.onclick =
    button3.onclick =
    button4.onclick =
    button5.onclick =
    button6.onclick = function(e) {
        const target = e.target as HTMLInputElement;
        updateFavicon(target.value);
    };

color.oninput = function() {
    updateFavicon();
};

window.addEventListener('load', () => {
    updateFavicon('❤️');
});
