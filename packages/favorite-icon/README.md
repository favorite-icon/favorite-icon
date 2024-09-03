⭐ Favorite Icon
=============

[![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)

Small library for manipulating desktop favicon.

# Desktop browser support
- Chrome: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Edge: ❌
- Safari: ❌ (Safari hides favicons)

# Advantages
- data: and canvas support
- GIF, JPEG, PNG, SVG and other browser-supported formats
- Ultra-small code size

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
import { Favicon } from 'favorite-icon';

// ...

Favicon.reset();
```

# [License](./LICENSE)
MIT License
