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

    var pages = [
    	"index",
    	"badge",
    	"status",
    	"emoji",
    	"video"
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

    var button1 = document.querySelector('#button1');
    var button2 = document.querySelector('#button2');
    var button3 = document.querySelector('#button3');
    var button4 = document.querySelector('#button4');
    var button5 = document.querySelector('#button5');
    var button6 = document.querySelector('#button6');
    var symbol = document.querySelector('#symbol');
    var color = document.querySelector('#color');
    function updateFavicon(value) {
        var symbolString = value || symbol.value;
        if (value) {
            document.querySelector('#symbol').value = value;
        }
        FaviconEmoji.set(symbolString, {
            color: color.value,
            size: 64,
            links: [
                document.querySelector('#preview')
            ]
        });
        FaviconEmoji.set(symbolString, { color: color.value });
    }
    updateFavicon('❤️');
    symbol.oninput =
        button1.onclick =
            button2.onclick =
                button3.onclick =
                    button4.onclick =
                        button5.onclick =
                            button6.onclick = function (e) {
                                var target = e.target;
                                updateFavicon(target.value);
                            };
    color.oninput = function () {
        updateFavicon();
    };

})));
