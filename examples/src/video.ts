import { FaviconVideo } from '../../packages/favorite-icon-video/dist/index.esm';
import './common';

window.addEventListener('load', () => {
    const video = document.querySelector('video');

    const favVideo = new FaviconVideo();

    const previewVideo = new FaviconVideo({
        links: [
            document.querySelector('#preview')
        ],
        size: 64,
    });

    favVideo.start(video);
    previewVideo.start(video);
    video.play();
});
