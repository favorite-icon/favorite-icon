⭐ Favorite Icon
=============

[![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon)

Small library for manipulating desktop favicon.

# Desktop browser support
- Chrome: ✅
- Edge: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
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

# Packages

| Num. | Package        | Demo           | Version   | Download |
| ---- | -------------- | -------------- | ------- | ------ |
| 1. | ⭐ [Favorite Icon](https://github.com/favorite-icon/favorite-icon) | [Demo](https://favorite-icon.github.io/examples/index.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon.svg?style=flat)](https://www.npmjs.com/package/favorite-icon) |
| 2. | 📛 [Favorite Icon Badge](https://github.com/favorite-icon/favorite-icon-badge)| [Demo](https://favorite-icon.github.io/examples/badge.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon-badge.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-badge) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-badge.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-badge) |
| 3. | 😃 [Favorite Icon Emoji](https://github.com/favorite-icon/favorite-icon-emoji) | [Demo](https://favorite-icon.github.io/examples/emoji.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon-emoji.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-emoji) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-emoji.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-emoji) |
| 4. | ⚠️ [Favorite Icon Status](https://github.com/favorite-icon/favorite-icon-status) | [Demo](https://favorite-icon.github.io/examples/status.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon-status.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-status) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-status.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-status) |
| 5. | ⏩ [Favorite Icon Video](https://github.com/favorite-icon/favorite-icon-video) | [Demo](https://favorite-icon.github.io/examples/video.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon-video.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-video) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-video.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-video) |
| 6. | 🔴 [Favorite Icon Dot](https://github.com/favorite-icon/favorite-icon-dot) | [Demo](https://favorite-icon.github.io/examples/dot.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon-dot.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-dot) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-dot.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-dot) |
| 7. | ⏱️ [Favorite Icon Timeout Worker](https://github.com/favorite-icon/favorite-icon-timeout-worker) | [Demo](https://favorite-icon.github.io/examples/blinking-dot.html) | [![NPM version](https://img.shields.io/npm/v/favorite-icon-timeout-worker.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-timeout-worker) | [![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-timeout-worker.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-timeout-worker) |

