(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

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
        nav.innerHTML = "<div class=\"nav\">        <a href=\"https://github.com/hcodes/favorite-icon\" class=\"button back\">\uD83C\uDFE0</a>        <a href=\"./" + prev + ".html\" class=\"button prev\">\u25C0</a>        " + (num + 1) + "/" + examples.length + "\n        <a href=\"./" + next + ".html\" class=\"button next\">\u25B6</a>        </div>";
        document.body.appendChild(nav);
    }, false);

    document.querySelector('#button-set').onclick = function () {
        var value = document.querySelector('#favicon-src').value;
        Favicon.set(value, document.querySelector('#preview'));
        Favicon.set(value);
    };

}));
