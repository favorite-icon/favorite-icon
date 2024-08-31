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
    function updateSettings() {
        var radius = parseInt(inputRadius.value, 10);
        var alpha = parseFloat(inputAlpha.value);
        var positionX = inputPositionX.value;
        var positionY = inputPositionY.value;
        var options = {
            alpha: alpha,
            backgroundColor: inputBackgroundColor.value,
            strokeColor: inputStrokeColor.value,
            radius: radius,
            positionX: positionX,
            positionY: positionY,
        };
        favDot.show(options);
        imageDot.show(options);
    }
    inputAlpha.oninput =
        inputBackgroundColor.oninput =
            inputStrokeColor.oninput =
                inputRadius.oninput =
                    inputPositionX.onchange =
                        inputPositionY.onchange = updateSettings;
    buttonShow.onclick = function () {
        imageDot.show();
        favDot.show();
    };
    buttonHide.onclick = function () {
        imageDot.hide();
        favDot.hide();
    };
    updateSettings();

})();
