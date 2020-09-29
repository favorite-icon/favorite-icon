var TimeoutWorker = /** @class */ (function () {
    function TimeoutWorker() {
        var _this = this;
        this.hasSupport = typeof Worker !== 'undefined' && typeof Map !== 'undefined';
        if (!this.hasSupport) {
            return;
        }
        this.idMap = new Map();
        this.worker = new Worker('{./worker.ts}');
        this.worker.onmessage = function (event) {
            var _a;
            var method = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.method;
            if (method === 'setTimeout' || method === 'setInterval') {
                var callback = _this.idMap.get(event.data.timeoutId);
                callback && callback();
            }
        };
    }
    TimeoutWorker.prototype.setTimeout = function (callback, delay) {
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
    TimeoutWorker.prototype.setInterval = function (callback, delay) {
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
    TimeoutWorker.prototype.clearTimeout = function (timeoutId) {
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
    TimeoutWorker.prototype.clearInterval = function (timeoutId) {
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
    TimeoutWorker.prototype.getTimeoutId = function () {
        return TimeoutWorker.gid++;
    };
    TimeoutWorker.prototype.terminate = function () {
        this.idMap.clear();
        this.worker.terminate();
    };
    TimeoutWorker.gid = 1;
    return TimeoutWorker;
}());

export default TimeoutWorker;
