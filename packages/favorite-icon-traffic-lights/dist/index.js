(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FaviconTrafficLights"] = factory();
	else
		root["FaviconTrafficLights"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/favorite-icon-traffic-lights/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/favorite-icon-traffic-lights/src/index.ts":
/*!************************************************************!*\
  !*** ./packages/favorite-icon-traffic-lights/src/index.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../favorite-icon/src/index */ \"./packages/favorite-icon/src/index.ts\");\n\nvar MAX_STATUS_IMAGE = 3;\nvar FaviconTrafficLights = /** @class */ (function () {\n    function FaviconTrafficLights(rawOptions) {\n        this.isStatusImagesLoaded = false;\n        this.isFaviconLoaded = false;\n        this.countStatusImages = 0;\n        this.options = rawOptions || {};\n        this.options.size = this.options.size || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size;\n        this.loadStatusImages();\n        this.loadFavicon();\n    }\n    FaviconTrafficLights.prototype.set = function (status) {\n        if (status) {\n            this.status = status;\n        }\n        if (!this.isStatusImagesLoaded || !this.isFaviconLoaded || !this.status) {\n            return;\n        }\n        var size = this.options.size || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size;\n        var image = {\n            ok: this.okImage,\n            error: this.errorImage,\n            warning: this.warningImage\n        }[this.status];\n        var canvas = document.createElement('canvas');\n        canvas.width = size;\n        canvas.height = size;\n        var context = canvas.getContext('2d');\n        context.clearRect(0, 0, size, size);\n        context.drawImage(this.favicon, 0, 0, this.options.size, this.options.size);\n        var width = size / 2;\n        var height = size / 2;\n        var x = size - width;\n        var y = size - height;\n        context.drawImage(image, x, y, width, height);\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(canvas, this.options.links);\n    };\n    FaviconTrafficLights.prototype.loadStatusImages = function () {\n        var _this = this;\n        this.okImage = new Image();\n        this.errorImage = new Image();\n        this.warningImage = new Image();\n        this.okImage.onload =\n            this.warningImage.onload =\n                this.errorImage.onload = function () {\n                    _this.countStatusImages++;\n                    if (_this.countStatusImages === MAX_STATUS_IMAGE) {\n                        _this.isStatusImagesLoaded = true;\n                        _this.set();\n                    }\n                };\n        this.errorImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 348.333 348.334\"><path d=\"M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z\" fill=\"red\"/></svg>';\n        this.okImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 342.357 342.357\"><path d=\"M290.04 33.286L118.861 204.427l-66.541-66.52L0 190.226l118.862 118.845L342.357 85.606z\" fill=\"green\"/></svg>';\n        this.warningImage.src = 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 438.533 438.533\"><path d=\"M409.133 109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736 9.801 259.058 0 219.273 0c-39.781 0-76.47 9.801-110.063 29.407-33.595 19.604-60.192 46.201-79.8 79.796C9.801 142.8 0 179.489 0 219.267c0 39.78 9.804 76.463 29.407 110.062 19.607 33.592 46.204 60.189 79.799 79.798 33.597 19.605 70.283 29.407 110.063 29.407s76.47-9.802 110.065-29.407c33.593-19.602 60.189-46.206 79.795-79.798 19.603-33.596 29.403-70.284 29.403-110.062.001-39.782-9.8-76.472-29.399-110.064z\" fill=\"orange\"/></svg>';\n    };\n    FaviconTrafficLights.prototype.loadFavicon = function () {\n        var _this = this;\n        this.favicon = new Image();\n        this.favicon.onload =\n            this.favicon.onabort =\n                this.favicon.onerror = function () {\n                    _this.isFaviconLoaded = true;\n                    _this.set();\n                };\n        this.favicon.src = this.options.faviconSrc || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getOriginalSrc();\n    };\n    FaviconTrafficLights.prototype.reset = function () {\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].reset();\n    };\n    return FaviconTrafficLights;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (FaviconTrafficLights);\n\n\n//# sourceURL=webpack://FaviconTrafficLights/./packages/favorite-icon-traffic-lights/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/index.ts":
/*!*********************************************!*\
  !*** ./packages/favorite-icon/src/index.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./support */ \"./packages/favorite-icon/src/support.ts\");\nvar PNG_MIME_TYPE = 'image/png';\n\nvar Favicon = /** @class */ (function () {\n    function Favicon() {\n    }\n    Favicon.set = function (src, elems) {\n        if (!this.hasSupport) {\n            return;\n        }\n        var items = elems || this.icons;\n        (Array.isArray(items) ? items : [items]).forEach(function (item) {\n            item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src);\n        });\n    };\n    Favicon.reset = function () {\n        if (this.hasSupport) {\n            this.set(this.getOriginalSrc());\n        }\n    };\n    Favicon.getOriginalSrc = function () {\n        return this.icons[this.icons.length - 1].href;\n    };\n    Favicon.searchIcons = function () {\n        var result = [];\n        var links = document.querySelectorAll('head link');\n        for (var i = 0; i < links.length; i++) {\n            if ((/(^|\\s)icon(\\s|$)/i).test(links[i].rel)) {\n                result.push(links[i]);\n            }\n        }\n        if (!result.length) {\n            var icon = document.createElement('link');\n            icon.setAttribute('rel', 'icon');\n            document.head.appendChild(icon);\n            result.push(icon);\n        }\n        result.forEach(function (item) {\n            item.setAttribute('type', PNG_MIME_TYPE);\n        });\n        return result;\n    };\n    Favicon.icons = Favicon.searchIcons();\n    Favicon.size = 32;\n    Favicon.hasSupport = _support__WEBPACK_IMPORTED_MODULE_0__[\"hasSupport\"];\n    return Favicon;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (Favicon);\n\n\n//# sourceURL=webpack://FaviconTrafficLights/./packages/favorite-icon/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/support.ts":
/*!***********************************************!*\
  !*** ./packages/favorite-icon/src/support.ts ***!
  \***********************************************/
/*! exports provided: hasSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasSupport\", function() { return hasSupport; });\nvar opera = Boolean(window.opera) || navigator.userAgent.indexOf('Opera') > -1;\nvar firefox = typeof window.InstallTrigger !== 'undefined';\nvar chrome = Boolean(window.chrome);\nvar hasSupport = chrome || firefox || opera;\n\n\n//# sourceURL=webpack://FaviconTrafficLights/./packages/favorite-icon/src/support.ts?");

/***/ })

/******/ })["default"];
});