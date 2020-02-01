/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/favorite-icon-video/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/favorite-icon-video/src/index.ts":
/*!***************************************************!*\
  !*** ./packages/favorite-icon-video/src/index.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FaviconVideo; });\n/* harmony import */ var _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../favorite-icon/src/index */ \"./packages/favorite-icon/src/index.ts\");\n\nclass FaviconVideo {\n    constructor(options) {\n        this.onplay = () => {\n            this.play();\n        };\n        this.onpause = () => {\n            this.pause();\n        };\n        const size = options.size || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size;\n        const video = options.video;\n        this.options = {\n            links: options.links,\n            size,\n            video,\n        };\n        this.canvas = document.createElement('canvas');\n        this.canvas.width = size;\n        this.canvas.height = size;\n        this.context = this.canvas.getContext('2d');\n        video.addEventListener('play', this.onplay, false);\n        video.addEventListener('pause', this.onpause, false);\n        video.addEventListener('ended', this.onpause, false);\n        video.addEventListener('abort', this.onpause, false);\n    }\n    play() {\n        this.options.video.muted = true;\n        this.options.video.play();\n        this.timer = setInterval(() => this.draw(), this.options.timeout || 25);\n    }\n    pause() {\n        this.options.video.pause();\n        this.reset();\n        window.clearInterval(this.timer);\n    }\n    reset() {\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].reset();\n    }\n    destroy() {\n        this.pause();\n        const video = this.options.video;\n        video.removeEventListener('play', this.onplay, false);\n        video.removeEventListener('pause', this.onpause, false);\n        video.removeEventListener('endeed', this.onpause, false);\n        video.removeEventListener('abort', this.onpause, false);\n        delete this.canvas;\n        delete this.context;\n        delete this.options;\n    }\n    draw() {\n        const video = this.options.video;\n        if (video.paused || video.ended) {\n            this.pause();\n            return;\n        }\n        try {\n            const size = this.options.size;\n            this.context.clearRect(0, 0, size, size);\n            this.context.drawImage(video, 0, 0, size, size);\n        }\n        catch (e) {\n            console.error(e);\n        }\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(this.canvas, this.options.links);\n    }\n}\n\n\n//# sourceURL=webpack:///./packages/favorite-icon-video/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/index.ts":
/*!*********************************************!*\
  !*** ./packages/favorite-icon/src/index.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Favicon; });\n/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./support */ \"./packages/favorite-icon/src/support.ts\");\nconst PNG_MIME_TYPE = 'image/png';\n\nclass Favicon {\n    static set(src, elems) {\n        if (!this.hasSupport) {\n            return;\n        }\n        const items = elems || this.icons;\n        (Array.isArray(items) ? items : [items]).forEach((item) => {\n            item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src);\n        });\n    }\n    static reset() {\n        if (this.hasSupport) {\n            this.set(this.getOriginalSrc());\n        }\n    }\n    static getOriginalSrc() {\n        return this.icons[this.icons.length - 1].href;\n    }\n    static searchIcons() {\n        const result = [];\n        const links = document.querySelectorAll('head link');\n        for (let i = 0; i < links.length; i++) {\n            if ((/(^|\\s)icon(\\s|$)/i).test(links[i].rel)) {\n                result.push(links[i]);\n            }\n        }\n        if (!result.length) {\n            const icon = document.createElement('link');\n            icon.setAttribute('rel', 'icon');\n            document.head.appendChild(icon);\n            result.push(icon);\n        }\n        result.forEach((item) => {\n            item.setAttribute('type', PNG_MIME_TYPE);\n        });\n        return result;\n    }\n}\nFavicon.icons = Favicon.searchIcons();\nFavicon.size = 32;\nFavicon.hasSupport = _support__WEBPACK_IMPORTED_MODULE_0__[\"hasSupport\"];\n\n\n//# sourceURL=webpack:///./packages/favorite-icon/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/support.ts":
/*!***********************************************!*\
  !*** ./packages/favorite-icon/src/support.ts ***!
  \***********************************************/
/*! exports provided: hasSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasSupport\", function() { return hasSupport; });\nconst opera = Boolean(window.opera) || navigator.userAgent.indexOf('Opera') > -1;\nconst firefox = typeof window.InstallTrigger !== 'undefined';\nconst chrome = Boolean(window.chrome);\nconst hasSupport = chrome || firefox || opera;\n\n\n//# sourceURL=webpack:///./packages/favorite-icon/src/support.ts?");

/***/ })

/******/ });