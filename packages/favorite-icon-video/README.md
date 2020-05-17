⏩ Favorite Icon Video
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-video.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-video)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-video.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-video)
[![Build Status](https://badgen.net/bundlephobia/minzip/favorite-icon-video)](https://bundlephobia.com/result?p=favorite-icon-video)

A small library for video manipulating in favicon.

# Installation
`npm install favorite-icon-video`

# [Demo](https://hcodes.github.io/favorite-icon/examples/video.html)

# API

## `.play()`
Starts tracking the video and changes the favicon.

```js
import FaviconVideo from 'favorite-icon-video';

const favVideo = new FaviconVideo({
    video: document.querySelector('video')
})

favVideo.start();
```

## `.pause()`
Stop tracking the video and changes the favicon.

```js
favVideo.pause();
```

## `.reset()`
Reset the favicon.

```js
favVideo.reset();
```

## `.destroy()`

```js
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
