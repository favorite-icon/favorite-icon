Favorite Icon
=============

[![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![Build Status](https://img.shields.io/travis/hcodes/favorite-icon.svg?style=flat)](https://travis-ci.org/hcodes/favorite-icon)
[![Dependency Status](https://img.shields.io/david/hcodes/favorite-icon.svg?style=flat)](https://david-dm.org/hcodes/favorite-icon)
[![Build Status](https://badgen.net/bundlephobia/minzip/favorite-icon)](https://bundlephobia.com/result?p=favorite-icon)

A small library for manipulating the favicon.

# Using
`npm install favorite-icon`

# API

## `Favicon.set(src: string | HTMLCanvasElement)`
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

# Browser support
- Chrome: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Edge: ❌
- Safari: ❌ (Safari hides favicons)

# [License](./LICENSE)
MIT License