⏩ Favorite Icon Video
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-video.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-video)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-video.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-video)

Small library for video manipulating in favicon.

# Installation
`npm install favorite-icon-video`

# [Demo](https://favorite-icon.github.io/favorite-icon/examples/video.html)

# API

## `.start()`
Starts tracking the video and changes the favicon.

```js
import { FaviconVideo } from 'favorite-icon-video';

const video = document.querySelector('video');
const favVideo = new FaviconVideo({ video });

favVideo.start();
video.play();
```

## `.stop()`
Stop tracking the video and changes the favicon.

```js
import { FaviconVideo } from 'favorite-icon-video';

const favVideo = new FaviconVideo({
    video: document.querySelector('video')
});

// ...

favVideo.stop();
```

## `.reset()`
Reset the favicon.

```js
import { FaviconVideo } from 'favorite-icon-video';

const favVideo = new FaviconVideo({
    video: document.querySelector('video')
});

// ...

favVideo.reset();
```

## `.destroy()`

```js
import { FaviconVideo } from 'favorite-icon-video';

const favVideo = new FaviconVideo({
    video: document.querySelector('video')
});

// ...

favVideo.destroy();
```

# Browser support
- Chrome: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Edge: ❌
- Safari: ❌ (Safari hides favicons)

# [License](./LICENSE)
MIT License
