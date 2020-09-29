(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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
                this.set(Favicon.originalSrc);
            }
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
        Favicon.originalSrc = Favicon.icons[Favicon.icons.length - 1].href;
        Favicon.size = 32;
        Favicon.hasSupport = hasSupport;
        return Favicon;
    }());

    var defaultOptions = {
        alpha: 1,
        backgroundColor: '#ff0000',
        faviconSrc: Favicon.originalSrc,
        links: Favicon.icons,
        positionX: 'right',
        positionY: 'top',
        radius: 5,
        size: Favicon.size,
        strokeColor: '#000',
    };
    var FaviconDot = /** @class */ (function () {
        function FaviconDot(options) {
            var _this = this;
            this.options = {};
            this.imageReady = false;
            this.isShow = false;
            this.updateOptions(options);
            Object.keys(defaultOptions).forEach(function (name) {
                _this.setOptionDefault(name, defaultOptions[name]);
            });
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.options.size;
            this.canvas.height = this.options.size;
            this.context = this.canvas.getContext('2d');
            this.loadImage();
        }
        FaviconDot.prototype.loadImage = function () {
            var _this = this;
            this.image = new Image();
            this.image.setAttribute('crossOrigin', 'anonymous');
            this.image.onload = this.image.onabort = this.image.onerror = function () {
                _this.imageReady = true;
                if (_this.isShow) {
                    _this.show();
                }
            };
            this.image.src = this.options.faviconSrc;
        };
        FaviconDot.prototype.setOptionDefault = function (name, defaultValue) {
            var _a;
            this.options[name] = (_a = this.options[name]) !== null && _a !== void 0 ? _a : defaultValue;
        };
        FaviconDot.prototype.show = function (options) {
            this.isShow = true;
            if (options) {
                this.updateOptions(options);
            }
            if (this.imageReady && Favicon.hasSupport) {
                this.draw();
            }
        };
        FaviconDot.prototype.updateOptions = function (options) {
            var _this = this;
            Object.keys(options || {}).forEach(function (key) {
                _this.options[key] = options[key];
            });
        };
        FaviconDot.prototype.draw = function () {
            var context = this.context;
            var _a = this.options, alpha = _a.alpha, size = _a.size, positionX = _a.positionX, positionY = _a.positionY;
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(this.image, 0, 0, size, size);
            context.save();
            context.globalAlpha = alpha;
            context.fillStyle = this.options.backgroundColor;
            context.strokeStyle = this.options.strokeColor;
            var radius = this.options.radius * size / Favicon.size;
            var x = 0;
            if (typeof positionX === 'number') {
                x = positionX * size / Favicon.size;
            }
            else {
                x = radius;
                if (positionX === 'center') {
                    x = Math.max(size / 2, 0);
                }
                else if (positionX === 'right') {
                    x = Math.max(size - radius, 0);
                }
            }
            var y = 0;
            if (typeof positionY === 'number') {
                y = positionY * size / Favicon.size;
            }
            else {
                y = radius;
                if (positionY === 'middle') {
                    y = Math.max(size / 2, 0);
                }
                else if (positionY === 'bottom') {
                    y = Math.max(size - radius, 0);
                }
            }
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fill();
            context.lineWidth = 1;
            context.stroke();
            context.closePath();
            context.restore();
            Favicon.set(this.canvas, this.options.links);
        };
        FaviconDot.prototype.hide = function () {
            this.isShow = false;
            Favicon.set(this.options.faviconSrc, this.options.links);
        };
        FaviconDot.prototype.destroy = function () {
            delete this.canvas;
            delete this.context;
            delete this.options;
        };
        return FaviconDot;
    }());

    var TimeoutWorker = /** @class */ (function () {
        function TimeoutWorker() {
            var _this = this;
            this.hasSupport = typeof Worker !== 'undefined' && typeof Map !== 'undefined';
            if (!this.hasSupport) {
                return;
            }
            this.idMap = new Map();
            this.worker = new Worker('{./worker.ts}');
            this.worker.onmessage = function (event) {
                var _a;
                var method = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.method;
                if (method === 'setTimeout' || method === 'setInterval') {
                    var callback = _this.idMap.get(event.data.timeoutId);
                    callback && callback();
                }
            };
        }
        TimeoutWorker.prototype.setTimeout = function (callback, delay) {
            if (!this.hasSupport) {
                return setTimeout(callback, delay);
            }
            var timeoutId = this.getTimeoutId();
            var message = {
                method: 'setTimeout',
                timeoutId: timeoutId,
                delay: delay,
            };
            this.worker.postMessage(message);
            this.idMap.set(timeoutId, callback);
            return timeoutId;
        };
        TimeoutWorker.prototype.setInterval = function (callback, delay) {
            if (!this.hasSupport) {
                return setInterval(callback, delay);
            }
            var timeoutId = this.getTimeoutId();
            var message = {
                method: 'setInterval',
                timeoutId: timeoutId,
                delay: delay,
            };
            this.worker.postMessage(message);
            this.idMap.set(timeoutId, callback);
            return timeoutId;
        };
        TimeoutWorker.prototype.clearTimeout = function (timeoutId) {
            if (!this.hasSupport) {
                return clearTimeout(timeoutId);
            }
            var message = {
                method: 'clearTimeout',
                timeoutId: timeoutId,
            };
            this.worker.postMessage(message);
            this.idMap.delete(timeoutId);
        };
        TimeoutWorker.prototype.clearInterval = function (timeoutId) {
            if (!this.hasSupport) {
                return clearInterval(timeoutId);
            }
            var message = {
                method: 'clearInterval',
                timeoutId: timeoutId,
            };
            this.worker.postMessage(message);
            this.idMap.delete(timeoutId);
        };
        TimeoutWorker.prototype.getTimeoutId = function () {
            return TimeoutWorker.gid++;
        };
        TimeoutWorker.prototype.terminate = function () {
            this.idMap.clear();
            this.worker.terminate();
        };
        TimeoutWorker.gid = 1;
        return TimeoutWorker;
    }());

    var pages = [
    	"index",
    	"badge",
    	"status",
    	"emoji",
    	"video",
    	"dot",
    	"blinking-dot"
    ];

    window.addEventListener('load', function () {
        var prev = pages[pages.length - 1];
        var next = pages[1];
        var num = -1;
        pages.some(function (item, i) {
            num++;
            prev = pages[i - 1] || pages[pages.length - 1];
            next = pages[i + 1] || pages[0];
            return location.pathname.search('/' + item + '\\.') > -1;
        });
        var nav = document.createElement('div');
        nav.innerHTML = "<div class=\"nav\">        <a href=\"https://github.com/hcodes/favorite-icon\" class=\"button back\">\uD83C\uDFE0</a>        <a href=\"./" + prev + ".html\" class=\"button prev\">\u25C0</a>        " + (num + 1) + "/" + pages.length + "\n        <a href=\"./" + next + ".html\" class=\"button next\">\u25B6</a>        </div>";
        document.body.appendChild(nav);
    }, false);

    var buttonShow = document.querySelector('#show');
    var buttonHide = document.querySelector('#hide');
    var inputBackgroundColor = document.querySelector('#backgroundColor');
    var inputStrokeColor = document.querySelector('#strokeColor');
    var inputPositionX = document.querySelector('#positionX');
    var inputPositionY = document.querySelector('#positionY');
    var inputRadius = document.querySelector('#radius');
    var inputAlpha = document.querySelector('#alpha');
    var favDot = new FaviconDot();
    var imageDot = new FaviconDot({
        size: 64,
        links: [
            document.querySelector('#preview')
        ]
    });
    var koef = -1;
    var step = 0.2;
    var value = 1;
    var worker = new TimeoutWorker();
    worker.setInterval(function () {
        value += koef * step;
        if (value >= 1) {
            koef = -1;
            value = 1;
        }
        if (value <= 0) {
            koef = 1;
            value = 0;
        }
        var options = { alpha: value };
        favDot.show(options);
        imageDot.show(options);
    }, 100);

})));
