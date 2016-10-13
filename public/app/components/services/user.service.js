"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var httpintercepter_1 = require('../global/httpintercepter');
var logger_service_1 = require('./logger.service');
var UserService = (function () {
    function UserService(logger, http) {
        this.logger = logger;
        this.http = http;
        this.authUrl = '/api/users/authenticate';
    }
    ;
    UserService.prototype.authenticate = function (username, password) {
        var body = JSON.stringify({ username: username, password: password });
        return this.http.post(this.authUrl, body, this.getRequestOptions())
            .map(function (res) { return res.json(); })
            .map(function (res) {
            return res;
        });
    };
    UserService.prototype.logout = function () {
        console.log('In userService logout');
        //let url = '/signoff';
        var url = '/api/users/current';
        console.log(url);
        try {
            return this.http.get(url).toPromise().then(function (res) {
                console.log(res.statusText);
                console.log(res);
                if (res.statusText === "OK") {
                    return true;
                }
                return false;
            }).catch(function (err) {
                return err;
            });
        }
        catch (ex) {
            console.log(ex);
        }
    };
    UserService.prototype.getToken = function () {
        var _this = this;
        var url = '/token';
        return this.http.get(url, this.getRequestOptions()).toPromise().then(function (response) {
            var body = response.text();
            return body;
        }).catch(function (error) {
            var errorMessage = _this.logError(error);
            return Promise.reject(errorMessage);
        });
    };
    UserService.prototype.logError = function (error) {
        var errorMessage = (error.message) ? error.message : error.status ? error.status + " - " + error.statusText : 'Server error';
        this.logger.logError(errorMessage);
        return errorMessage;
    };
    UserService.prototype.getRequestOptions = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [logger_service_1.Logger, httpintercepter_1.HttpIntercepter])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map