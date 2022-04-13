😃 Favorite Icon Emoji
===================

[![NPM version](https://img.shields.io/npm/v/favorite-icon-emoji.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-emoji)
[![NPM downloads](https://img.shields.io/npm/dm/favorite-icon-emoji.svg?style=flat)](https://www.npmjs.com/package/favorite-icon-emoji)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/favorite-icon-emoji)](https://bundlephobia.com/result?p=favorite-icon-emoji)

A small library for emoji manipulating in favicon.

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

# Browser support
- Chrome: ✅
- Firefox: ✅
- Opera: ✅
- IE: ❌
- Edge: ❌
- Safari: ❌ (Safari hides favicons)

# [License](./LICENSE)
MIT License
