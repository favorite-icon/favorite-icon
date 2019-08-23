(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FaviconBadge"] = factory();
	else
		root["FaviconBadge"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/favorite-icon-badge/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/favorite-icon-badge/src/index.ts":
/*!***************************************************!*\
  !*** ./packages/favorite-icon-badge/src/index.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../favorite-icon/src/index */ \"./packages/favorite-icon/src/index.ts\");\n\nvar defaultOptions = {\n    backgroundColor: '#ff0000',\n    fontFamily: 'arial, sans-serif',\n    fontStyle: 'normal',\n    strokeColor: '#000',\n    textColor: '#fff',\n    faviconSrc: _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getOriginalSrc(),\n    maxCount: 99,\n    size: _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size,\n    links: _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].icons,\n    positionX: 'right',\n    positionY: 'bottom'\n};\nvar FaviconBadge = /** @class */ (function () {\n    function FaviconBadge(options) {\n        var _this = this;\n        this.imageReady = false;\n        this.lastCount = 0;\n        this.options = options || {};\n        Object.keys(defaultOptions).forEach(function (name) {\n            _this.setOptionDefault(name, defaultOptions[name]);\n        });\n        this.count = Number(this.options.count || 0);\n        this.canvas = document.createElement('canvas');\n        this.canvas.width = this.options.size;\n        this.canvas.height = this.options.size;\n        this.context = this.canvas.getContext('2d');\n        this.loadImage();\n    }\n    FaviconBadge.prototype.set = function (count) {\n        this.count = count;\n        var formattedCount = this.options.formatter ?\n            this.options.formatter(count) :\n            this.formatter(count);\n        if (_favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].hasSupport) {\n            this.draw(count, formattedCount);\n        }\n        else if (this.options.fallback) {\n            this.options.fallback(count, formattedCount);\n        }\n    };\n    FaviconBadge.prototype.reset = function () {\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].reset();\n    };\n    FaviconBadge.prototype.destroy = function () {\n        delete this.canvas;\n        delete this.context;\n        delete this.options;\n    };\n    FaviconBadge.prototype.loadImage = function () {\n        var _this = this;\n        this.image = new Image();\n        this.image.setAttribute('crossOrigin', 'anonymous');\n        this.image.onload = this.image.onabort = this.image.onerror = function () {\n            _this.imageReady = true;\n            _this.set(_this.count);\n        };\n        this.image.src = this.options.faviconSrc;\n    };\n    FaviconBadge.prototype.setOptionDefault = function (name, defaultValue) {\n        this.options[name] = this.options[name] || defaultValue;\n    };\n    FaviconBadge.prototype.formatter = function (count) {\n        var maxCount = this.options.maxCount;\n        if (count <= 0) {\n            return '';\n        }\n        else if (maxCount && count > maxCount) {\n            return maxCount + \"+\";\n        }\n        return String(count);\n    };\n    FaviconBadge.prototype.draw = function (count, formattedCount) {\n        if (!this.imageReady || count === this.lastCount) {\n            return;\n        }\n        this.lastCount = count;\n        var size = this.options.size;\n        this.context.clearRect(0, 0, size, size);\n        this.context.drawImage(this.image, 0, 0, size, size);\n        if (count) {\n            this.drawNumber(count, formattedCount);\n        }\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(this.canvas, this.options.links);\n    };\n    FaviconBadge.prototype.drawNumber = function (count, formattedCount) {\n        var padding = 4;\n        var size = this.options.size;\n        var height = size * 0.6;\n        var fontSize = String(count).length > 1 ? 0.9 : 1;\n        var context = this.context;\n        var positionX = this.options.positionX;\n        var positionY = this.options.positionY;\n        context.font = this.options.fontStyle + \" \" + fontSize * height + \"px \" + this.options.fontFamily;\n        context.textAlign = 'left';\n        context.textBaseline = 'top';\n        context.beginPath();\n        context.fillStyle = this.options.backgroundColor;\n        context.strokeStyle = this.options.strokeColor;\n        var width = padding * 2 + context.measureText(formattedCount).width;\n        var x = 0;\n        if (positionX === 'center') {\n            x = Math.max((size - width) / 2, 0);\n        }\n        else if (positionX === 'right') {\n            x = Math.max(size - width, 0);\n        }\n        var y = 0;\n        if (positionY === 'center') {\n            y = Math.max((size - height) / 2, 0);\n        }\n        else if (positionY === 'bottom') {\n            y = Math.max(size - height, 0);\n        }\n        if (this.options.backgroundColor !== 'transparent') {\n            context.fillRect(x, y, width - 1, height - 1);\n            context.strokeRect(x, y, width - 1, height - 1);\n        }\n        context.fillStyle = this.options.textColor;\n        context.fillText(formattedCount, x + padding, y + padding);\n        context.closePath();\n    };\n    return FaviconBadge;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (FaviconBadge);\n;\n\n\n//# sourceURL=webpack://FaviconBadge/./packages/favorite-icon-badge/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/index.ts":
/*!*********************************************!*\
  !*** ./packages/favorite-icon/src/index.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./support */ \"./packages/favorite-icon/src/support.ts\");\nvar PNG_MIME_TYPE = 'image/png';\n\nvar Favicon = /** @class */ (function () {\n    function Favicon() {\n    }\n    Favicon.set = function (src, elems) {\n        if (!this.hasSupport) {\n            return;\n        }\n        var items = elems || this.icons;\n        (Array.isArray(items) ? items : [items]).forEach(function (item) {\n            item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src);\n        });\n    };\n    Favicon.reset = function () {\n        if (this.hasSupport) {\n            this.set(this.getOriginalSrc());\n        }\n    };\n    Favicon.getOriginalSrc = function () {\n        return this.icons[this.icons.length - 1].href;\n    };\n    Favicon.searchIcons = function () {\n        var result = [];\n        var links = document.querySelectorAll('head link');\n        for (var i = 0; i < links.length; i++) {\n            if ((/(^|\\s)icon(\\s|$)/i).test(links[i].rel)) {\n                result.push(links[i]);\n            }\n        }\n        if (!result.length) {\n            var icon = document.createElement('link');\n            icon.setAttribute('rel', 'icon');\n            document.head.appendChild(icon);\n            result.push(icon);\n        }\n        result.forEach(function (item) {\n            item.setAttribute('type', PNG_MIME_TYPE);\n        });\n        return result;\n    };\n    Favicon.icons = Favicon.searchIcons();\n    Favicon.size = 32;\n    Favicon.hasSupport = _support__WEBPACK_IMPORTED_MODULE_0__[\"hasSupport\"];\n    return Favicon;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (Favicon);\n\n\n//# sourceURL=webpack://FaviconBadge/./packages/favorite-icon/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/support.ts":
/*!***********************************************!*\
  !*** ./packages/favorite-icon/src/support.ts ***!
  \***********************************************/
/*! exports provided: hasSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasSupport\", function() { return hasSupport; });\nvar opera = Boolean(window.opera) || navigator.userAgent.indexOf('Opera') > -1;\nvar firefox = typeof window.InstallTrigger !== 'undefined';\nvar chrome = Boolean(window.chrome);\nvar hasSupport = chrome || firefox || opera;\n\n\n//# sourceURL=webpack://FaviconBadge/./packages/favorite-icon/src/support.ts?");

/***/ })

/******/ })["default"];
});