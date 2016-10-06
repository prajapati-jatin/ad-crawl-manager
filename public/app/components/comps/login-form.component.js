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
var login_1 = require('../models/login');
var user_service_1 = require('../services/user.service');
var authentication_service_1 = require('../services/authentication.service');
var logger_service_1 = require('../services/logger.service');
var notification_service_1 = require('../services/notification.service');
var LoginComponent = (function () {
    function LoginComponent(userService, logger, route, router, notificationService, authService) {
        this.userService = userService;
        this.logger = logger;
        this.route = route;
        this.router = router;
        this.notificationService = notificationService;
        this.authService = authService;
        this.isauthenticated = false;
        this.title = 'Login';
        this.model = new login_1.Login('jatin.prajapati@outlook.com', '');
        this.submitted = false;
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        try {
            this.submitted = true;
            this.authService.login(this.model.username, this.model.password).then(function (resp) {
                console.log(resp.token);
                window.token = resp;
                window.IsLoggedIn = true;
                _this.logger.log(_this.authService.RedirectURL);
                if (window.RedirectURL !== '' && window.RedirectURL !== undefined) {
                    _this.router.navigate([window.RedirectURL]);
                }
                else {
                    _this.router.navigate(['/home']);
                }
            }).catch(function (err) {
                var errorMessage = err.text();
                _this.logger.showNotification(errorMessage, 'error');
            });
        }
        catch (ex) {
            console.error(ex);
        }
    };
    Object.defineProperty(LoginComponent.prototype, "diagnostic", {
        //TODO: Remove this when done.
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.ngAfterViewInit = function () {
        setTimeout(function () {
            $('[class*="mdl-js-"]').each(function (i, element) {
                //console.log(element);
                componentHandler.upgradeElement(element);
            });
        }, 1000);
    };
    LoginComponent.prototype.ngOnInit = function () {
        // try{
        //     this.userService.getToken().then((response) => {
        //         if(response !== "undefined" && response !== ''){
        //             this.router.navigate(['/home']);
        //         }
        //     }).catch((error) => {
        //         this.logger.logError('Not authenticated');
        //     });
        // }
        // catch(ex){
        //     this.logger.logError(ex);
        // }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "isauthenticated", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: '/views/login.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger, router_1.ActivatedRoute, router_1.Router, notification_service_1.NotificationService, authentication_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login-form.component.js.map