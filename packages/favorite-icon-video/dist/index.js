!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.FaviconVideo=e():t.FaviconVideo=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o=Boolean(window.opera)||navigator.userAgent.indexOf("Opera")>-1,i=void 0!==window.InstallTrigger,r=Boolean(window.chrome)||i||o,s=function(){function t(){}return t.set=function(t,e){if(this.hasSupport){var n=e||this.icons;(Array.isArray(n)?n:[n]).forEach(function(e){e.setAttribute(e instanceof HTMLImageElement?"src":"href",t instanceof HTMLCanvasElement?t.toDataURL("image/png"):t)})}},t.reset=function(){this.hasSupport&&this.set(this.getOriginalSrc())},t.getOriginalSrc=function(){return this.icons[this.icons.length-1].href},t.searchIcons=function(){for(var t=[],e=document.querySelectorAll("head link"),n=0;n<e.length;n++)/(^|\s)icon(\s|$)/i.test(e[n].rel)&&t.push(e[n]);if(!t.length){var o=document.createElement("link");o.setAttribute("rel","icon"),document.head.appendChild(o),t.push(o)}return t.forEach(function(t){t.setAttribute("type","image/png")}),t},t.icons=t.searchIcons(),t.size=32,t.hasSupport=r,t}(),a=function(){function t(t){var e=this;this.onplay=function(){e.play()},this.onstop=function(){e.stop()};var n=t.size||s.size,o=t.video;this.options={size:n,video:o,links:t.links},this.canvas=document.createElement("canvas"),this.canvas.width=n,this.canvas.height=n,this.context=this.canvas.getContext("2d"),o.addEventListener("play",this.onplay,!1),o.addEventListener("ended",this.onstop,!1),o.addEventListener("abort",this.onstop,!1)}return t.prototype.play=function(){var t=this;this.options.video.muted=!0,this.options.video.play(),this.timer=setInterval(function(){return t.draw()},this.options.timeout||25)},t.prototype.stop=function(){window.clearInterval(this.timer),s.reset()},t.prototype.destroy=function(){this.stop();var t=this.options.video;t.removeEventListener("play",this.onplay,!1),t.removeEventListener("endeed",this.onstop,!1),t.removeEventListener("abort",this.onstop,!1),delete this.canvas,delete this.context,delete this.options},t.prototype.draw=function(){var t=this.options.video;if(t.paused||t.ended)this.stop();else{try{var e=this.options.size;this.context.clearRect(0,0,e,e),this.context.drawImage(t,0,0,e,e)}catch(t){console.error(t)}s.set(this.canvas,this.options.links)}},t}();e.default=a}]).default});