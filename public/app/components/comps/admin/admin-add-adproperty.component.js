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
var adproperties_service_1 = require('../../services/adproperties.service');
var logger_service_1 = require('../../services/logger.service');
var adproperty_1 = require('../../models/adproperty');
var router_1 = require('@angular/router');
var notification_service_1 = require('../../services/notification.service');
var AdminAddADPropertyComponent = (function () {
    function AdminAddADPropertyComponent(adpropertiesService, logger, router, notificationService) {
        this.adpropertiesService = adpropertiesService;
        this.logger = logger;
        this.router = router;
        this.notificationService = notificationService;
        this.model = new adproperty_1.ADProperty('', '', false);
    }
    AdminAddADPropertyComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.model);
        this.adpropertiesService.addproperty(this.model).subscribe(function (resp) {
            console.log(resp);
            if (resp.success) {
                _this.router.navigate(['/admin/adproperties']);
            }
            else {
                _this.logger.showNotification(resp.data, 'error');
            }
        });
    };
    AdminAddADPropertyComponent.prototype.onNameKeyup = function (name) {
        this.model.NormalizedName = name.toLowerCase();
    };
    Object.defineProperty(AdminAddADPropertyComponent.prototype, "diagnostic", {
        //TODO: Remove this when done.
        get: function () {
            return JSON.stringify(this.model);
        },
        enumerable: true,
        configurable: true
    });
    AdminAddADPropertyComponent.prototype.ngAfterViewInit = function () {
        setTimeout(function () {
            $('[class*="mdl-js-"]').each(function (i, element) {
                //console.log(element);
                componentHandler.upgradeElement(element);
            });
        }, 1000);
    };
    AdminAddADPropertyComponent = __decorate([
        core_1.Component({
            templateUrl: '/views/admin/add-ad-properties.html'
        }), 
        __metadata('design:paramtypes', [adproperties_service_1.ADPropertiesService, logger_service_1.Logger, router_1.Router, notification_service_1.NotificationService])
    ], AdminAddADPropertyComponent);
    return AdminAddADPropertyComponent;
}());
exports.AdminAddADPropertyComponent = AdminAddADPropertyComponent;
//# sourceMappingURL=admin-add-adproperty.component.js.map