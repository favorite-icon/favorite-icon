😃 Favorite Icon Emoji
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-emoji.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-emoji)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-emoji.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-emoji)


Small library for emoji manipulating with desktop favicon.

# Desktop browser support
- Chrome: ✅
- Edge: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Safari: ❌ (Safari hides favicons)

# Installation
`npm install favorite-icon-emoji`

# [Demo](https://favorite-icon.github.io/favorite-icon/examples/emoji.html)

# API

## `FaviconEmoji.set(symbol: string)`
Set the favicon with your own emoji.

```js
import { FaviconEmoji } from 'favorite-icon-emoji';

FaviconEmoji.set('❤️');
```

## `FaviconEmoji.reset()`
Reset the favicon.

```js
import { FaviconEmoji } from 'favorite-icon-emoji';
// ...
FaviconEmoji.reset();
```

# [License](./LICENSE)
MIT License
