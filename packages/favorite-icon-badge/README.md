📛 Favorite Icon Badge
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-badge.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-badge)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-badge.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-badge)

Small library for badge manipulating with desktop favicon.

# Desktop Browser support
- Chrome: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Edge: ❌
- Safari: ❌ (Safari hides favicons)

# Installation
`npm install favorite-icon-badge`

# [Demo](https://favorite-icon.github.io/favorite-icon/examples/badge.html)

# Using
```js
import { FaviconBadge } from 'favorite-icon-badge';

const badge = new FaviconBadge();

badge.set(count);
```

## Advanced settings
```js
import { FaviconBadge } from 'favorite-icon-badge';

const badge = new FaviconBadge({
    backgroundColor: '#ff0000',
    fontFamily: 'arial, sans-serif',
    fontStyle: 'normal',
    strokeColor: '#000',
    textColor: '#fff',
    faviconSrc: '/my-icon.png',
    maxCount: 99,
    size: Favicon.size,
    links: Favicon.icons,
    positionX: 'right',
    positionY: 'bottom'
});

badge.set(count);
```

# API

## `.set(count: number)`
Set the favicon with the badge.

```js
import { FaviconBadge } from 'favorite-icon-badge';

const badge = new FaviconBadge();

badge.set(count);
```

### `.reset()`
Reset the favicon.

```js
import { FaviconBadge } from 'favorite-icon-badge';

const badge = new FaviconBadge();

// ...

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
