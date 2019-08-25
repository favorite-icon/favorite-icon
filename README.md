Favorite Icon
=============

[![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![Build Status](https://img.shields.io/travis/hcodes/favorite-icon.svg?style=flat)](https://travis-ci.org/hcodes/favorite-icon)
[![Dependency Status](https://img.shields.io/david/hcodes/favorite-icon.svg?style=flat)](https://david-dm.org/hcodes/favorite-icon)
[![Build Status](https://badgen.net/bundlephobia/minzip/favorite-icon)](https://bundlephobia.com/result?p=favorite-icon)

A small library for manipulating the favicon, in particular adding alert bubbles and changing images.

# Using
`npm install favorite-icon`

# API

## Favicon

### `Favicon.set(src: string | HTMLCanvasElement)`
Set the favicon with your own image.

```js
Favicon.set('./image.png');

// or

Favicon.set('data:image/png;base64,...');

// or

const canvas = document.createElement('canvas');
//...
Favicon.set(canvas);
```

### `Favicon.reset()`
Reset the favicon.

## [FaviconBadge](https://hcodes.github.io/favorite-icon/examples/badge.html)

[Demo](https://hcodes.github.io/favorite-icon/examples/badge.html)

### `.set(count: number)`
Set the favicon with the badge.

```js
    const badge = new FaviconBadge({
        fontFamily: 'Helvetica',
        color: '#f0f0f0',
        backgroundColor: '#0f0'
    });
    badge.set(count);
```

### `.reset()`
Reset the favicon.

```js
badge.reset();
```

## [FaviconVideo](https://hcodes.github.io/favorite-icon/examples/video.html)

[Demo](https://hcodes.github.io/favorite-icon/examples/video.html)

### `.start()`
Starts tracking the video and changes the favicon.

```js
const favVideo = new FaviconVideo({
    video: document.querySelector('video')
})

favVideo.start();
```

### `.pause()`
Stop tracking the video and changes the favicon.

```js
favVideo.pause();
```

### `.reset()`
Reset the favicon.

```js
favVideo.reset();
```

### `.destroy()`

```js
favVideo.destroy();
```

## [FaviconEmoji](https://hcodes.github.io/favorite-icon/examples/emoji.html)

[Demo](https://hcodes.github.io/favorite-icon/examples/emoji.html)

### `FaviconEmoji.set(symbol: string)`
Set the favicon with your own emoji.

```js
FaviconEmoji.set('❤️');
```

### `FaviconEmoji.reset()`
Reset the favicon.

## [FaviconStatus](https://hcodes.github.io/favorite-icon/examples/status.html)

[Demo](https://hcodes.github.io/favorite-icon/examples/status.html)

### `.set(status: 'ok' | 'error' | 'warning')`
Set the favicon with status.

```js
const status = new FaviconStatus();
status.set('ok');
```

### `.reset()`
Reset the favicon.

```js
status.reset();
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
