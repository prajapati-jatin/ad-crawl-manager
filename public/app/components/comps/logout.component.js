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
var router_1 = require('@angular/router');
var user_service_1 = require('../services/user.service');
var logger_service_1 = require('../services/logger.service');
var LogoutComponent = (function () {
    function LogoutComponent(userService, logger, router) {
        this.userService = userService;
        this.logger = logger;
        this.router = router;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.logout().then(function (res) {
            _this.router.navigate(['/home']);
        }).catch(function (err) {
            _this.logger.logError(err);
        });
    };
    LogoutComponent = __decorate([
        core_1.Component({
            template: "<span></span>"
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger, router_1.Router])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map