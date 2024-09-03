🔴 Favorite Icon Dot
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-dot.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-dot)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-dot.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-dot)

Small library for dot manipulating with desktop favicon.

# Desktop browser support
- Chrome: ✅
- Edge: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Safari: ❌ (Safari hides favicons)

# Installation
`npm install favorite-icon-dot`

# [Demo](https://favorite-icon.github.io/favorite-icon/examples/dot.html)

# Using
```js
import { FaviconDot } from 'favorite-icon-dot';

const dot = new FaviconDot();

dot.show();
```

## Advanced settings
```js
import { FaviconDot } from 'favorite-icon-dot';

const dot = new FaviconDot({
    backgroundColor: '#ff0000',
    radius: 5,
    strokeColor: '#000',
    faviconSrc: '/my-icon.png',
    positionX: 'right',
    positionY: 'bottom'
});

dot.show();
```

# API

## `.show()`
Show dot in favicon.

```js
import { FaviconDot } from 'favorite-icon-dot';

const dot = new FaviconDot();

dot.show(count);
```

### `.hide()`
Reset the favicon.

```js
import { FaviconDot } from 'favorite-icon-dot';

const dot = new FaviconDot();

// ...

dot.hide();
```

# [License](./LICENSE)
MIT License
