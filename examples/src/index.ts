import { Favicon } from '../../packages/favorite-icon/dist/index.esm';
import './common';

document.querySelector<HTMLInputElement>('#button-set').onclick = function() {
    const value = document.querySelector<HTMLInputElement>('#favicon-src').value;

    Favicon.set(value, document.querySelector<HTMLImageElement>('#preview'));
    Favicon.set(value);
};
