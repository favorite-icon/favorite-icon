(function () {
    'use strict';

    function hasSupport$1() {
        if (typeof window === 'undefined') {
            return false;
        }
        var ua = navigator.userAgent;
        var opera = Boolean(window.opera) || ua.indexOf('Opera') > -1;
        var firefox = ua.toLowerCase().indexOf('firefox') > -1;
        var chrome = Boolean(window.chrome);
        return chrome || firefox || opera;
    }

    var PNG_MIME_TYPE = 'image/png';
    var hasSupport = hasSupport$1();
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
            if (typeof window === 'undefined') {
                return [];
            }
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
        var _a;
        Favicon.icons = Favicon.searchIcons();
        Favicon.originalSrc = hasSupport ? (_a = Favicon.icons[Favicon.icons.length - 1]) === null || _a === void 0 ? void 0 : _a.href : '';
        Favicon.size = 32;
        Favicon.hasSupport = hasSupport;
        return Favicon;
    }());

    var defaultOptions = {
        alpha: 1,
        backgroundColor: '#ff0000',
        faviconSrc: Favicon.originalSrc,
        links: undefined,
        positionX: 'right',
        positionY: 'top',
        radius: 5,
        size: Favicon.size,
        strokeColor: '#000',
    };
    var FaviconDot = /** @class */ (function () {
        function FaviconDot(options) {
            this.imageReady = false;
            this.isShow = false;
            this.options = this.prepareOptions(options);
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
        FaviconDot.prototype.show = function (options) {
            this.isShow = true;
            if (options) {
                this.options = this.updateOptions(options);
            }
            if (this.imageReady && Favicon.hasSupport) {
                this.draw();
            }
        };
        FaviconDot.prototype.prepareOptions = function (options) {
            if (options === void 0) { options = {}; }
            var result = {};
            Object.keys(defaultOptions).forEach(function (key) {
                var _a;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                result[key] = (_a = options[key]) !== null && _a !== void 0 ? _a : defaultOptions[key];
            });
            return result;
        };
        FaviconDot.prototype.updateOptions = function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var result = {};
            Object.keys(defaultOptions).forEach(function (key) {
                var _a, _b;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                result[key] = (_a = options[key]) !== null && _a !== void 0 ? _a : ((_b = _this.options[key]) !== null && _b !== void 0 ? _b : defaultOptions[key]);
            });
            return result;
        };
        FaviconDot.prototype.draw = function () {
            var context = this.context;
            if (!context || !this.canvas) {
                return;
            }
            var _a = this.options, alpha = _a.alpha, size = _a.size, positionX = _a.positionX, positionY = _a.positionY;
            context.clearRect(0, 0, size, size);
            context.drawImage(this.image, 0, 0, size, size);
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
            this.canvas = null;
            this.context = null;
        };
        return FaviconDot;
    }());

    var FaviconTimeoutWorker = /** @class */ (function () {
        function FaviconTimeoutWorker() {
            var _this = this;
            this.hasSupport = typeof Worker !== 'undefined' && typeof Map !== 'undefined';
            if (!this.hasSupport) {
                return;
            }
            this.idMap = new Map();
            this.worker = new Worker('data:text/javascript;base64,IWZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3ZhciBlPW5ldyBNYXA7c2VsZi5vbm1lc3NhZ2U9ZnVuY3Rpb24odCl7dmFyIGE9dC5kYXRhLnRpbWVvdXRJZCxzPWUuZ2V0KGEpO2lmKCFzKXN3aXRjaCh0LmRhdGEubWV0aG9kKXtjYXNlImNsZWFyVGltZW91dCI6Y2xlYXJUaW1lb3V0KHMpLGUuZGVsZXRlKGEpO2JyZWFrO2Nhc2UiY2xlYXJJbnRlcnZhbCI6Y2xlYXJJbnRlcnZhbChzKSxlLmRlbGV0ZShhKTticmVhaztjYXNlInNldFRpbWVvdXQiOnZhciBvPXQuZGF0YS5kZWxheTtlLnNldChhLHNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7cG9zdE1lc3NhZ2Uoe21ldGhvZDoic2V0VGltZW91dCIsdGltZW91dElkOmEsZGVsYXk6b30pLGUuZGVsZXRlKGEpfSksbykpO2JyZWFrO2Nhc2Uic2V0SW50ZXJ2YWwiOnZhciBkPXQuZGF0YS5kZWxheTtlLnNldChhLHNldEludGVydmFsKChmdW5jdGlvbigpe3Bvc3RNZXNzYWdlKHttZXRob2Q6InNldEludGVydmFsIix0aW1lb3V0SWQ6YSxkZWxheTpkfSl9KSxkKSl9fX0oKTsK');
            this.worker.onmessage = function (event) {
                var _a;
                var method = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.method;
                if (method === 'setTimeout' || method === 'setInterval') {
                    var callback = _this.idMap.get(event.data.timeoutId);
                    callback === null || callback === void 0 ? void 0 : callback();
                }
            };
        }
        FaviconTimeoutWorker.prototype.setTimeout = function (callback, delay) {
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
        FaviconTimeoutWorker.prototype.setInterval = function (callback, delay) {
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
        FaviconTimeoutWorker.prototype.clearTimeout = function (timeoutId) {
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
        FaviconTimeoutWorker.prototype.clearInterval = function (timeoutId) {
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
        FaviconTimeoutWorker.prototype.getTimeoutId = function () {
            return FaviconTimeoutWorker.gid++;
        };
        FaviconTimeoutWorker.prototype.terminate = function () {
            this.idMap.clear();
            this.worker.terminate();
        };
        FaviconTimeoutWorker.gid = 1;
        return FaviconTimeoutWorker;
    }());

    var pages = [
        'index',
        'badge',
        'blinking-dot',
        'dot',
        'emoji',
        'status',
        'video',
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
        nav.innerHTML = "<div class=\"nav\">        <a href=\"https://github.com/hcodes/favorite-icon\" class=\"button back\">\uD83C\uDFE0</a>        <a href=\"./".concat(prev, ".html\" class=\"button prev\">\u25C0</a>        ").concat(num + 1, "/").concat(pages.length, "\n        <a href=\"./").concat(next, ".html\" class=\"button next\">\u25B6</a>        </div>");
        document.body.appendChild(nav);
    }, false);

    var favDot = new FaviconDot();
    var imageDot = new FaviconDot({
        size: 64,
        links: [
            document.querySelector('#preview')
        ]
    });
    var coefficient = -1;
    var step = 0.2;
    var value = 1;
    var worker = new FaviconTimeoutWorker();
    worker.setInterval(function () {
        value += coefficient * step;
        if (value >= 1) {
            coefficient = -1;
            value = 1;
        }
        if (value <= 0) {
            coefficient = 1;
            value = 0;
        }
        var options = { alpha: value };
        favDot.show(options);
        imageDot.show(options);
    }, 100);

})();
