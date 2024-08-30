(function () {
    'use strict';

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
                //Favicon.set(this.canvas, this.options.links);
            };
            this.options = {
                links: options.links || undefined,
                size: options.size,
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
            //Favicon.reset();
        };
        FaviconVideo.prototype.destroy = function () {
            this.unbindEvents();
            this.video = undefined;
            this.canvas = undefined;
            this.context = undefined;
        };
        return FaviconVideo;
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

})();
