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

    var FaviconVideo = /** @class */ (function () {
        function FaviconVideo(options) {
            var _this = this;
            var _a;
            this.onplay = function () {
                _this.play();
            };
            this.onpause = function () {
                _this.pause();
            };
            var size = (_a = options.size) !== null && _a !== void 0 ? _a : Favicon.size;
            var video = options.video;
            this.options = {
                links: options.links,
                size: size,
                video: video,
            };
            this.canvas = document.createElement('canvas');
            this.canvas.width = size;
            this.canvas.height = size;
            this.context = this.canvas.getContext('2d');
            video.addEventListener('play', this.onplay, false);
            video.addEventListener('pause', this.onpause, false);
            video.addEventListener('ended', this.onpause, false);
            video.addEventListener('abort', this.onpause, false);
        }
        FaviconVideo.prototype.play = function () {
            var _this = this;
            this.options.video.muted = true;
            this.options.video.play();
            this.timer = setInterval(function () { return _this.draw(); }, this.options.timeout || 25);
        };
        FaviconVideo.prototype.pause = function () {
            this.options.video.pause();
            this.reset();
            window.clearInterval(this.timer);
        };
        FaviconVideo.prototype.reset = function () {
            Favicon.reset();
        };
        FaviconVideo.prototype.destroy = function () {
            this.pause();
            var video = this.options.video;
            video.removeEventListener('play', this.onplay, false);
            video.removeEventListener('pause', this.onpause, false);
            video.removeEventListener('endeed', this.onpause, false);
            video.removeEventListener('abort', this.onpause, false);
            delete this.canvas;
            delete this.context;
            delete this.options;
        };
        FaviconVideo.prototype.draw = function () {
            var video = this.options.video;
            if (video.paused || video.ended) {
                this.pause();
                return;
            }
            try {
                var size = this.options.size;
                this.context.clearRect(0, 0, size, size);
                this.context.drawImage(video, 0, 0, size, size);
            }
            catch (e) {
                console.error(e);
            }
            Favicon.set(this.canvas, this.options.links);
        };
        return FaviconVideo;
    }());

    var pages = [
    	"index",
    	"badge",
    	"status",
    	"emoji",
    	"video",
    	"dot"
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

    var video = document.querySelector('video');
    var favVideo = new FaviconVideo({ video: video });
    var previewVideo = new FaviconVideo({
        links: [
            document.querySelector('#preview')
        ],
        size: 64,
        video: video,
    });
    favVideo.play();

})));
