"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var HttpIntercepter = (function (_super) {
    __extends(HttpIntercepter, _super);
    function HttpIntercepter(backend, defaultOptions, _router) {
        _super.call(this, backend, defaultOptions);
        this._router = _router;
    }
    HttpIntercepter.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpIntercepter.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    HttpIntercepter.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpIntercepter.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpIntercepter.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    HttpIntercepter.prototype.getRequestOptionArgs = function (options) {
        if (options === null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers === null) {
            options.headers = new http_1.Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    };
    HttpIntercepter.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            if (err.status === 401) {
                _this._router.navigate(['/login']);
                return Observable_1.Observable.empty();
            }
            return Observable_1.Observable.throw(err);
        });
    };
    return HttpIntercepter;
}(http_1.Http));
exports.HttpIntercepter = HttpIntercepter;
//# sourceMappingURL=httpintercepter.js.map