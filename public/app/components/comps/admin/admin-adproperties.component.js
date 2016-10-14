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
var AdminADPropertiesComponent = (function () {
    function AdminADPropertiesComponent(adpropertiesService, logger) {
        this.adpropertiesService = adpropertiesService;
        this.logger = logger;
        this.properties = [];
    }
    AdminADPropertiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adpropertiesService.listproperties().subscribe(function (res) {
            if (res.success) {
                _this.properties = res.data[0];
            }
        });
    };
    AdminADPropertiesComponent = __decorate([
        core_1.Component({
            templateUrl: '/views/admin/ad-properties.html'
        }), 
        __metadata('design:paramtypes', [adproperties_service_1.ADPropertiesService, logger_service_1.Logger])
    ], AdminADPropertiesComponent);
    return AdminADPropertiesComponent;
}());
exports.AdminADPropertiesComponent = AdminADPropertiesComponent;
//# sourceMappingURL=admin-adproperties.component.js.map