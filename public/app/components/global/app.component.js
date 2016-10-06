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
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
//import { UserService } from '../services/user.service';
var authentication_service_1 = require('../services/authentication.service');
var logger_service_1 = require('../services/logger.service');
var notification_service_1 = require('../services/notification.service');
require('./rxjs-operators');
var AppComponent = (function () {
    function AppComponent(authService, logger, router, notificationService) {
        var _this = this;
        this.authService = authService;
        this.logger = logger;
        this.router = router;
        this.notificationService = notificationService;
        this.authenticated = false;
        this.title = 'SPRT';
        this.notificationService.notify$.subscribe(function (noty) {
            switch (noty.notyType) {
                case 'authenticated':
                    _this.authenticated = true;
                    break;
                case 'logout':
                    _this.authenticated = false;
                    break;
            }
        });
    }
    AppComponent.prototype.onLogout = function () {
        var _this = this;
        this.authService.logout().then(function (res) {
            window.location.assign('/');
        }).catch(function (err) {
            _this.logger.logError(err);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        try {
            this.authService.getToken().then(function (response) {
                if (response !== "undefined" && response !== '') {
                    _this.authenticated = true;
                }
            }).catch(function (error) {
            });
        }
        catch (ex) {
            this.logger.logError(ex);
        }
    };
    // ngDoCheck(){
    //     try{
    //         console.log('Do check');
    //         this.userService.getToken().then((response) => {
    //             if(response !== "undefined" && response !== ''){
    //                 this.authenticated = true;
    //             }
    //         }).catch((error) => {
    //         });
    //     }
    //     catch(ex){
    //         this.logger.logError(ex);
    //     }
    // }
    AppComponent.prototype.ngAfterViewInit = function () {
        setTimeout(function () {
            $('[class*="mdl-js-"]').each(function (i, element) {
                //console.log(element);
                componentHandler.upgradeElement(element);
            });
        }, 1000);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: '/views/app.html',
            providers: [notification_service_1.NotificationService, authentication_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, logger_service_1.Logger, router_1.Router, notification_service_1.NotificationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map