!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FaviconTrafficLights=t():e.FaviconTrafficLights=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=Boolean(window.opera)||navigator.userAgent.indexOf("Opera")>-1,o=void 0!==window.InstallTrigger,i=Boolean(window.chrome)||o||r,u=function(){function e(){}return e.set=function(e,t){if(this.hasSupport){var n=t||this.icons;(Array.isArray(n)?n:[n]).forEach(function(t){t.setAttribute(t instanceof HTMLImageElement?"src":"href",e instanceof HTMLCanvasElement?e.toDataURL("image/png"):e)})}},e.reset=function(){this.hasSupport&&this.set(this.getOriginalSrc())},e.getOriginalSrc=function(){return this.icons[this.icons.length-1].href},e.searchIcons=function(){for(var e=[],t=document.querySelectorAll("head link"),n=0;n<t.length;n++)/(^|\s)icon(\s|$)/i.test(t[n].rel)&&e.push(t[n]);if(!e.length){var r=document.createElement("link");r.setAttribute("rel","icon"),document.head.appendChild(r),e.push(r)}return e.forEach(function(e){e.setAttribute("type","image/png")}),e},e.icons=e.searchIcons(),e.size=32,e.hasSupport=i,e}(),c=function(){function e(){}return e.reset=function(){u.reset()},e}();t.default=c}]).default});