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
    backgroundColor: '#ff0000',
    count: 0,
    fallback: function () { },
    faviconSrc: Favicon.originalSrc,
    formatter: function (count, maxCount) {
        if (count <= 0) {
            return '';
        }
        else if (maxCount && count > maxCount) {
            return maxCount + "+";
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
        this.setDefaultOptions(options || {});
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
        delete this.canvas;
        delete this.context;
        delete this.options;
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
    FaviconBadge.prototype.setDefaultOptions = function (options) {
        var result = {};
        Object.keys(defaultOptions).forEach(function (name) {
            var _a;
            result[name] = (_a = options[name]) !== null && _a !== void 0 ? _a : defaultOptions[name];
        });
        this.options = result;
    };
    FaviconBadge.prototype.draw = function (count, formattedCount) {
        if (!this.imageReady || count === this.lastCount) {
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
        var paddingX = 5;
        var paddingY = 1;
        var size = this.options.size;
        var height = size * 0.55;
        var context = this.context;
        var positionX = this.options.positionX;
        var positionY = this.options.positionY;
        context.font = this.options.fontStyle + " " + (height - 2 * paddingY) + "px " + this.options.fontFamily;
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

export default FaviconBadge;
