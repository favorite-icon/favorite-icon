'use strict';

var opera = Boolean(window.opera) || navigator.userAgent.indexOf('Opera') > -1;
var firefox = typeof window.InstallTrigger !== 'undefined';
var chrome = Boolean(window.chrome);
var hasSupport = chrome || firefox || opera;

var PNG_MIME_TYPE = 'image/png';
var Favicon = /** @class */ (function () {
    function Favicon() {
    }
    Favicon.set = function (src, elems) {
        if (!this.hasSupport) {
            return;
        }
        var items = elems || this.icons;
        (Array.isArray(items) ? items : [items]).forEach(function (item) {
            item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src);
        });
    };
    Favicon.reset = function () {
        if (this.hasSupport) {
            this.set(this.getOriginalSrc());
        }
    };
    Favicon.getOriginalSrc = function () {
        return this.icons[this.icons.length - 1].href;
    };
    Favicon.searchIcons = function () {
        var result = [];
        var links = document.querySelectorAll('head link');
        for (var i = 0; i < links.length; i++) {
            if ((/(^|\s)icon(\s|$)/i).test(links[i].rel)) {
                result.push(links[i]);
            }
        }
        if (!result.length) {
            var icon = document.createElement('link');
            icon.setAttribute('rel', 'icon');
            document.head.appendChild(icon);
            result.push(icon);
        }
        result.forEach(function (item) {
            item.setAttribute('type', PNG_MIME_TYPE);
        });
        return result;
    };
    Favicon.icons = Favicon.searchIcons();
    Favicon.size = 32;
    Favicon.hasSupport = hasSupport;
    return Favicon;
}());

var FaviconEmoji = /** @class */ (function () {
    function FaviconEmoji() {
    }
    FaviconEmoji.set = function (symbol, rawOptions) {
        var options = rawOptions || {};
        var size = options && options.size || Favicon.size;
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        var context = canvas.getContext('2d');
        var fontSize = size;
        context.fillStyle = options.color || '#000';
        context.font = fontSize + "px/0.5 Arial, sans-serif";
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.clearRect(0, 0, size, size);
        context.fillText(symbol, size / 2, size * 0.1);
        Favicon.set(canvas, options && options.links);
    };
    FaviconEmoji.reset = function () {
        Favicon.reset();
    };
    return FaviconEmoji;
}());

module.exports = FaviconEmoji;
