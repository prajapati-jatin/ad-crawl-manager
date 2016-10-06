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
var user_service_1 = require('../services/user.service');
var logger_service_1 = require('../services/logger.service');
var HomeComponent = (function () {
    function HomeComponent(userService, logger) {
        this.userService = userService;
        this.logger = logger;
        this.title = 'MEA2N';
    }
    HomeComponent.prototype.ngOnInit = function () {
        try {
            this.userService.getToken().then(function (response) {
                if (response !== "undefined" && response !== '') {
                }
            }).catch(function (error) {
            });
        }
        catch (ex) {
            this.logger.logError(ex);
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: '/views/home.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map