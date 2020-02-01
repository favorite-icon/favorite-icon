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
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/favorite-icon-status/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/favorite-icon-status/src/index.ts":
/*!****************************************************!*\
  !*** ./packages/favorite-icon-status/src/index.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FaviconStatus; });\n/* harmony import */ var _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../favorite-icon/src/index */ \"./packages/favorite-icon/src/index.ts\");\n\nconst MAX_STATUS_IMAGE = 3;\nconst IMAGE_WIDTH = 12;\nconst IMAGE_HEIGHT = 16;\nclass FaviconStatus {\n    constructor(rawOptions) {\n        this.isStatusImagesLoaded = false;\n        this.isFaviconLoaded = false;\n        this.countStatusImages = 0;\n        this.options = {\n            faviconSrc: rawOptions && rawOptions.faviconSrc || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getOriginalSrc(),\n            links: rawOptions && rawOptions.links,\n            size: rawOptions && rawOptions.size || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size,\n        };\n        this.loadStatusImages();\n        this.loadFavicon();\n    }\n    set(status) {\n        if (status) {\n            this.status = status;\n        }\n        if (!this.isStatusImagesLoaded || !this.isFaviconLoaded || !this.status) {\n            return;\n        }\n        this.draw();\n    }\n    draw() {\n        const size = this.options.size;\n        const canvas = document.createElement('canvas');\n        canvas.width = size;\n        canvas.height = size;\n        const context = canvas.getContext('2d');\n        context.clearRect(0, 0, size, size);\n        context.drawImage(this.favicon, 0, 0, size, size);\n        const width = size / 1.2;\n        const height = size / 1.2;\n        const x = size / 3.5;\n        const y = size / 3.5;\n        context.drawImage({\n            ok: this.okImage,\n            error: this.errorImage,\n            warning: this.warningImage\n        }[this.status], 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, x, y, width, height);\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(canvas, this.options.links);\n    }\n    loadStatusImages() {\n        this.okImage = new Image();\n        this.errorImage = new Image();\n        this.warningImage = new Image();\n        this.okImage.onload =\n            this.warningImage.onload =\n                this.errorImage.onload = () => {\n                    this.countStatusImages++;\n                    if (this.countStatusImages === MAX_STATUS_IMAGE) {\n                        this.isStatusImagesLoaded = true;\n                        this.set();\n                    }\n                };\n        this.errorImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"16\" viewBox=\"0 0 12 16\"><path fill-rule=\"evenodd\" d=\"M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z\" fill=\"rgb(203, 36, 49)\" stroke=\"black\" stroke-width=\"0.5\" /></svg>';\n        this.okImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"16\" viewBox=\"0 0 12 16\"><path fill-rule=\"evenodd\" d=\"M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z\" fill=\"rgb(40, 167, 69)\" stroke=\"black\" stroke-width=\"0.5\" /></svg>';\n        this.warningImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"16\" viewBox=\"0 0 12 16\"><circle cx=\"6\" cy=\"8\" r=\"4\" fill=\"rgb(255, 165, 0)\" stroke=\"black\" stroke-width=\"0.5\" /></svg>';\n    }\n    loadFavicon() {\n        this.favicon = new Image();\n        this.favicon.onload =\n            this.favicon.onabort =\n                this.favicon.onerror = () => {\n                    this.isFaviconLoaded = true;\n                    this.set();\n                };\n        this.favicon.src = this.options.faviconSrc;\n    }\n    reset() {\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].reset();\n    }\n}\n\n\n//# sourceURL=webpack:///./packages/favorite-icon-status/src/index.ts?");

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