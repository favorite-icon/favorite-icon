import { FaviconStatus } from '../../packages/favorite-icon-status/src/index';
import { FaviconStatusType } from '../../packages/favorite-icon-status/src/types';
import './common';

const preview = new FaviconStatus({
    size: 64,
    links: [
        document.querySelector('#preview')
    ]
});
const favicon = new FaviconStatus();

function updateFavicons(status: string) {
    preview.set(status as FaviconStatusType);
    favicon.set(status as FaviconStatusType);
}

updateFavicons('ok');

const ok = document.querySelector<HTMLInputElement>('#ok');
const error = document.querySelector<HTMLInputElement>('#error');
const warning = document.querySelector<HTMLInputElement>('#warning');

ok.onclick = () => {
    updateFavicons('ok');
};

error.onclick = () => {
    updateFavicons('error');
};

warning.onclick = () => {
    updateFavicons('warning');
};
