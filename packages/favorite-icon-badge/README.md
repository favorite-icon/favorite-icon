Favorite Icon Badge
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-badge.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-badge)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-badge.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-badge)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/favorite-icon-badge)](https://bundlephobia.com/result?p=favorite-icon-badge)

A small library for badge manipulating in favicon.

# Using
`npm install favorite-icon-badge`

# [Demo](https://hcodes.github.io/favorite-icon/examples/badge.html)

# API

## `.set(count: number)`
Set the favicon with the badge.

```js
import FaviconBadge from 'favorite-icon-badge';

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

# Browser support
- Chrome: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Edge: ❌
- Safari: ❌ (Safari hides favicons)

# [License](./LICENSE)
MIT License
