Favorite Icon
=============

[![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![Build Status](https://img.shields.io/travis/hcodes/favorite-icon.svg?style=flat)](https://travis-ci.org/hcodes/favorite-icon)
[![Coverage Status](https://img.shields.io/coveralls/hcodes/favorite-icon.svg?style=flat)](https://coveralls.io/r/hcodes/favorite-icon)
[![Dependency Status](https://img.shields.io/david/hcodes/favorite-icon.svg?style=flat)](https://david-dm.org/hcodes/favorite-icon)

A small library for manipulating the favicon, in particular adding alert bubbles and changing images.

# Using
`npm install favorite-icon`


# API

## Favicon

### `Favicon.change(src: string | HTMLCanvasElement)`
Change the favicon to your own image.

```js
Favicon.change('./image.png');
// or
Favicon.change('data:image/png;base64,...');
// or
const canvas = document.createElement('canvas');
//...
Favicon.change(canvas);
```

### `Favicon.reset()`
Reset the favicon.

## FaviconBadge

### `FaviconBadge.update(count: number)`

### `FaviconBadge.destroy()`

## FaviconVideo

### `FaviconVideo.start()`

### `FaviconVideo.stop()`

### `FaviconVideo.destroy()`

# [License](./LICENSE)
MIT License
