Favorite Icon Status
====================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-status.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-status)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-status.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-status)
[![Dependency Status](https://img.shields.io/david/hcodes/favorite-icon-status.svg?style=flat)](https://david-dm.org/hcodes/favorite-icon-status)
[![Build Status](https://badgen.net/bundlephobia/minzip/favorite-icon-status)](https://bundlephobia.com/result?p=favorite-icon-status)

A small library for manipulating the favicon.

# Using
`npm install favorite-icon-status`

# [Demo](https://hcodes.github.io/favorite-icon/examples/status.html)

# API

## `.set(status: 'ok' | 'error' | 'warning')`
Set the favicon with status.

```js
import FaviconStatus from 'favorite-icon-status';

const status = new FaviconStatus();
status.set('ok'); // 'ok', 'error' or 'warning'

```

## `.reset()`
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
