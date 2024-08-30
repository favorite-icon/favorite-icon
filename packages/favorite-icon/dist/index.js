var Favicon = (function () {
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

    return Favicon;

})();
