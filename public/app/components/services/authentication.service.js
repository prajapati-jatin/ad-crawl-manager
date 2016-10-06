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
var user_service_1 = require('../services/user.service');
var logger_service_1 = require('../services/logger.service');
var AuthenticationService = (function () {
    function AuthenticationService(userService, logger, http) {
        this.userService = userService;
        this.logger = logger;
        this.http = http;
        this.IsLoggedIn = false;
    }
    AuthenticationService.prototype.login = function (username, password) {
        return this.userService.authenticate(username, password).then(function (resp) {
            window.IsLoggedIn = true;
            return resp;
        }).catch(function (err) {
            return err;
        });
    };
    AuthenticationService.prototype.logout = function () {
        return this.userService.logout().then(function (resp) {
            window.IsLoggedIn = false;
            return resp;
        }).catch(function (err) {
            return err;
        });
    };
    AuthenticationService.prototype.getToken = function () {
        var url = '/token';
        return this.http.get(url, this.getRequestOptions()).toPromise().then(function (response) {
            var body = response.text();
            return body;
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
    AuthenticationService.prototype.getRequestOptions = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return options;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger, http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map