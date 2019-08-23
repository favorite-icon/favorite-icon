(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FaviconVideo"] = factory();
	else
		root["FaviconVideo"] = factory();
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../favorite-icon/src/index */ \"./packages/favorite-icon/src/index.ts\");\n\nvar FaviconVideo = /** @class */ (function () {\n    function FaviconVideo(options) {\n        var _this = this;\n        this.onplay = function () {\n            _this.play();\n        };\n        this.onstop = function () {\n            _this.pause();\n        };\n        var size = options.size || _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].size;\n        var video = options.video;\n        this.options = {\n            size: size,\n            video: video,\n            links: options.links\n        };\n        this.canvas = document.createElement('canvas');\n        this.canvas.width = size;\n        this.canvas.height = size;\n        this.context = this.canvas.getContext('2d');\n        video.addEventListener('play', this.onplay, false);\n        video.addEventListener('ended', this.onstop, false);\n        video.addEventListener('abort', this.onstop, false);\n    }\n    FaviconVideo.prototype.play = function () {\n        var _this = this;\n        this.options.video.muted = true;\n        this.options.video.play();\n        this.timer = setInterval(function () { return _this.draw(); }, this.options.timeout || 25);\n    };\n    FaviconVideo.prototype.pause = function () {\n        this.options.video.pause();\n        window.clearInterval(this.timer);\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].reset();\n    };\n    FaviconVideo.prototype.destroy = function () {\n        this.pause();\n        var video = this.options.video;\n        video.removeEventListener('play', this.onplay, false);\n        video.removeEventListener('endeed', this.onstop, false);\n        video.removeEventListener('abort', this.onstop, false);\n        delete this.canvas;\n        delete this.context;\n        delete this.options;\n    };\n    FaviconVideo.prototype.draw = function () {\n        var video = this.options.video;\n        if (video.paused || video.ended) {\n            this.pause();\n            return;\n        }\n        try {\n            var size = this.options.size;\n            this.context.clearRect(0, 0, size, size);\n            this.context.drawImage(video, 0, 0, size, size);\n        }\n        catch (e) {\n            console.error(e);\n        }\n        _favorite_icon_src_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(this.canvas, this.options.links);\n    };\n    return FaviconVideo;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (FaviconVideo);\n\n\n//# sourceURL=webpack://FaviconVideo/./packages/favorite-icon-video/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/index.ts":
/*!*********************************************!*\
  !*** ./packages/favorite-icon/src/index.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./support */ \"./packages/favorite-icon/src/support.ts\");\nvar PNG_MIME_TYPE = 'image/png';\n\nvar Favicon = /** @class */ (function () {\n    function Favicon() {\n    }\n    Favicon.set = function (src, elems) {\n        if (!this.hasSupport) {\n            return;\n        }\n        var items = elems || this.icons;\n        (Array.isArray(items) ? items : [items]).forEach(function (item) {\n            item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src);\n        });\n    };\n    Favicon.reset = function () {\n        if (this.hasSupport) {\n            this.set(this.getOriginalSrc());\n        }\n    };\n    Favicon.getOriginalSrc = function () {\n        return this.icons[this.icons.length - 1].href;\n    };\n    Favicon.searchIcons = function () {\n        var result = [];\n        var links = document.querySelectorAll('head link');\n        for (var i = 0; i < links.length; i++) {\n            if ((/(^|\\s)icon(\\s|$)/i).test(links[i].rel)) {\n                result.push(links[i]);\n            }\n        }\n        if (!result.length) {\n            var icon = document.createElement('link');\n            icon.setAttribute('rel', 'icon');\n            document.head.appendChild(icon);\n            result.push(icon);\n        }\n        result.forEach(function (item) {\n            item.setAttribute('type', PNG_MIME_TYPE);\n        });\n        return result;\n    };\n    Favicon.icons = Favicon.searchIcons();\n    Favicon.size = 32;\n    Favicon.hasSupport = _support__WEBPACK_IMPORTED_MODULE_0__[\"hasSupport\"];\n    return Favicon;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (Favicon);\n\n\n//# sourceURL=webpack://FaviconVideo/./packages/favorite-icon/src/index.ts?");

/***/ }),

/***/ "./packages/favorite-icon/src/support.ts":
/*!***********************************************!*\
  !*** ./packages/favorite-icon/src/support.ts ***!
  \***********************************************/
/*! exports provided: hasSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasSupport\", function() { return hasSupport; });\nvar opera = Boolean(window.opera) || navigator.userAgent.indexOf('Opera') > -1;\nvar firefox = typeof window.InstallTrigger !== 'undefined';\nvar chrome = Boolean(window.chrome);\nvar hasSupport = chrome || firefox || opera;\n\n\n//# sourceURL=webpack://FaviconVideo/./packages/favorite-icon/src/support.ts?");

/***/ })

/******/ })["default"];
});