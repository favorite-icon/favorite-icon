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
        backgroundColor: '#ff0000',
        count: 0,
        fallback: function () { },
        faviconSrc: Favicon.originalSrc,
        formatter: function (count, maxCount) {
            if (count <= 0) {
                return '';
            }
            else if (maxCount && count > maxCount) {
                return "".concat(maxCount, "+");
            }
            return String(count);
        },
        fontFamily: 'arial, sans-serif',
        fontStyle: 'normal',
        links: Favicon.icons,
        maxCount: 99,
        positionX: 'right',
        positionY: 'bottom',
        size: Favicon.size,
        strokeColor: '#000',
        textColor: '#fff',
    };
    var FaviconBadge = /** @class */ (function () {
        function FaviconBadge(options) {
            this.imageReady = false;
            this.options = this.prepareOptions(options);
            this.count = this.options.count;
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.options.size;
            this.canvas.height = this.options.size;
            this.context = this.canvas.getContext('2d');
            this.loadImage();
        }
        FaviconBadge.prototype.set = function (count) {
            this.count = count;
            var formattedCount = this.options.formatter(count, this.options.maxCount);
            if (Favicon.hasSupport) {
                this.draw(count, formattedCount);
            }
            else {
                this.options.fallback(count, formattedCount);
            }
        };
        FaviconBadge.prototype.reset = function () {
            Favicon.reset();
        };
        FaviconBadge.prototype.destroy = function () {
            this.context = null;
        };
        FaviconBadge.prototype.loadImage = function () {
            var _this = this;
            this.image = new Image();
            this.image.setAttribute('crossOrigin', 'anonymous');
            this.image.onload = this.image.onabort = this.image.onerror = function () {
                _this.imageReady = true;
                _this.set(_this.count);
            };
            this.image.src = this.options.faviconSrc;
        };
        FaviconBadge.prototype.prepareOptions = function (options) {
            if (options === void 0) { options = {}; }
            var result = {};
            Object.keys(defaultOptions).forEach(function (name) {
                var _a;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                result[name] = (_a = options[name]) !== null && _a !== void 0 ? _a : defaultOptions[name];
            });
            return result;
        };
        FaviconBadge.prototype.draw = function (count, formattedCount) {
            if (!this.imageReady || count === this.lastCount || !this.context) {
                return;
            }
            this.lastCount = count;
            var size = this.options.size;
            this.context.clearRect(0, 0, size, size);
            this.context.drawImage(this.image, 0, 0, size, size);
            if (count) {
                this.drawNumber(formattedCount);
            }
            Favicon.set(this.canvas, this.options.links);
        };
        FaviconBadge.prototype.drawNumber = function (formattedCount) {
            if (!this.context) {
                return;
            }
            var paddingX = 5;
            var paddingY = 1;
            var size = this.options.size;
            var height = size * 0.55;
            var positionX = this.options.positionX;
            var positionY = this.options.positionY;
            var context = this.context;
            context.font = "".concat(this.options.fontStyle, " ").concat(height - 2 * paddingY, "px ").concat(this.options.fontFamily);
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.beginPath();
            context.fillStyle = this.options.backgroundColor;
            context.strokeStyle = this.options.strokeColor;
            var width = paddingX * 2 + context.measureText(formattedCount).width;
            var x = 0;
            if (typeof positionX === 'number') {
                x = positionX * size / Favicon.size;
            }
            else {
                if (positionX === 'center') {
                    x = Math.max((size - width) / 2, 0);
                }
                else if (positionX === 'right') {
                    x = Math.max(size - width, 0);
                }
            }
            var y = 0;
            if (typeof positionY === 'number') {
                y = positionY * size / Favicon.size;
            }
            else {
                if (positionY === 'middle') {
                    y = Math.max((size - height) / 2, 0);
                }
                else if (positionY === 'bottom') {
                    y = Math.max(size - height, 0);
                }
            }
            if (this.options.backgroundColor !== 'transparent') {
                context.fillRect(x, y, width - 1, height - 1);
                context.strokeRect(x, y, width - 1, height - 1);
            }
            context.fillStyle = this.options.textColor;
            context.fillText(formattedCount, x + paddingX, y + paddingY + 1);
            context.closePath();
        };
        return FaviconBadge;
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

    var inputBackgroundColor = document.querySelector('#backgroundColor');
    var inputTextColor = document.querySelector('#textColor');
    var inputStrokeColor = document.querySelector('#strokeColor');
    var inputPositionX = document.querySelector('#positionX');
    var inputPositionY = document.querySelector('#positionY');
    var inputCount = document.querySelector('#count');
    var inputMaxCount = document.querySelector('#maxCount');
    var favBadge = new FaviconBadge();
    var imageBadge = new FaviconBadge();
    function updateSettings() {
        var count = parseInt(inputCount.value, 10);
        var maxCount = parseInt(inputMaxCount.value, 10);
        var positionX = Number(inputPositionX.value);
        var positionY = Number(inputPositionY.value);
        favBadge = new FaviconBadge({
            backgroundColor: inputBackgroundColor.value,
            textColor: inputTextColor.value,
            strokeColor: inputStrokeColor.value,
            maxCount: maxCount,
            positionX: positionX,
            positionY: positionY,
        });
        imageBadge = new FaviconBadge({
            backgroundColor: inputBackgroundColor.value,
            textColor: inputTextColor.value,
            strokeColor: inputStrokeColor.value,
            maxCount: maxCount,
            positionX: positionX,
            positionY: positionY,
            size: 64,
            links: [
                document.querySelector('#preview')
            ]
        });
        favBadge.set(count);
        imageBadge.set(count);
    }
    inputBackgroundColor.oninput =
        inputTextColor.oninput =
            inputStrokeColor.oninput =
                inputCount.oninput =
                    inputMaxCount.oninput =
                        inputPositionX.onchange =
                            inputPositionY.onchange = updateSettings;
    updateSettings();

})();
