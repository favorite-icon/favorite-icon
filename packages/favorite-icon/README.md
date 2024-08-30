⭐ Favorite Icon
=============

[![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)

Small library for manipulating favicon.

# Installation
`npm install favorite-icon`

# Using
```js
import { Favicon } from 'favorite-icon';

Favicon.set('/my-icon.png');
```

# API

## `Favicon.set(src: string | HTMLCanvasElement)`
Set the favicon with your own image.

```js
import { Favicon } from 'favorite-icon';

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

```js
import { FaviconIcon } from 'favorite-icon';

// ...

Favicon.reset();
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
