(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    function hasSupport() {
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
        Favicon.icons = Favicon.searchIcons();
        Favicon.originalSrc = Favicon.icons[Favicon.icons.length - 1].href;
        Favicon.size = 32;
        Favicon.hasSupport = hasSupport();
        return Favicon;
    }());

    var FaviconVideo = /** @class */ (function () {
        function FaviconVideo(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this.handleTimeupdate = function () {
                if (!_this.context || !_this.video || !_this.canvas) {
                    return;
                }
                try {
                    var size = _this.options.size;
                    _this.context.clearRect(0, 0, size, size);
                    _this.context.drawImage(_this.video, 0, 0, size, size);
                }
                catch (e) {
                    console.error(e);
                }
                Favicon.set(_this.canvas, _this.options.links);
            };
            this.options = {
                links: options.links || undefined,
                size: options.size || Favicon.size
            };
        }
        FaviconVideo.prototype.start = function (video) {
            this.unbindEvents();
            this.video = video;
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.options.size;
            this.canvas.height = this.options.size;
            this.context = this.canvas.getContext('2d');
            this.bindEvents();
        };
        FaviconVideo.prototype.stop = function () {
            this.unbindEvents();
        };
        FaviconVideo.prototype.bindEvents = function () {
            var _a;
            (_a = this.video) === null || _a === void 0 ? void 0 : _a.addEventListener('timeupdate', this.handleTimeupdate, false);
        };
        FaviconVideo.prototype.unbindEvents = function () {
            var _a;
            (_a = this.video) === null || _a === void 0 ? void 0 : _a.removeEventListener('timeupdate', this.handleTimeupdate, false);
        };
        FaviconVideo.prototype.reset = function () {
            Favicon.reset();
        };
        FaviconVideo.prototype.destroy = function () {
            this.unbindEvents();
            this.video = undefined;
            this.canvas = undefined;
            this.context = undefined;
        };
        return FaviconVideo;
    }());

    const examples = [
        "index",
        "badge",
        "status",
        "emoji",
        "video",
        "dot",
        "blinking-dot"
    ];

    window.addEventListener('load', function () {
        var prev = examples[examples.length - 1];
        var next = examples[1];
        var num = -1;
        examples.some(function (item, i) {
            num++;
            prev = examples[i - 1] || examples[examples.length - 1];
            next = examples[i + 1] || examples[0];
            return location.pathname.search('/' + item + '\\.') > -1;
        });
        var nav = document.createElement('div');
        nav.innerHTML = "<div class=\"nav\">        <a href=\"https://github.com/hcodes/favorite-icon\" class=\"button back\">\uD83C\uDFE0</a>        <a href=\"./".concat(prev, ".html\" class=\"button prev\">\u25C0</a>        ").concat(num + 1, "/").concat(examples.length, "\n        <a href=\"./").concat(next, ".html\" class=\"button next\">\u25B6</a>        </div>");
        document.body.appendChild(nav);
    }, false);

    window.addEventListener('load', function () {
        var video = document.querySelector('video');
        var favVideo = new FaviconVideo();
        var previewVideo = new FaviconVideo({
            links: [
                document.querySelector('#preview')
            ],
            size: 64,
        });
        favVideo.start(video);
        previewVideo.start(video);
        video.play();
    });

}));
