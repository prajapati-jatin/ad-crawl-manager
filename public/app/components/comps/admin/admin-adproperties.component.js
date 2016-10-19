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
    AdminADPropertiesComponent.prototype.changeFlag = function (event, property) {
        var _this = this;
        var flag = event.target.checked;
        console.log(flag);
        var data = {
            Id: property.Id,
            Flag: flag
        };
        this.adpropertiesService.changedefaultflag(data).subscribe(function (resp) {
            if (!resp.success) {
                if (resp.data === '' || resp.data === undefined) {
                    resp.data = 'Error occured. Please try again later';
                }
                _this.logger.showNotification(resp.data, 'error');
            }
        });
    };
    AdminADPropertiesComponent.prototype.deleteADProperty = function (property) {
        var component = this;
        var logger = this.logger;
        console.log('Delete property having id ' + property.Id);
        var propertyToDelete = property.Id;
        var dialog = document.querySelector('dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        $('dialog .mdl-dialog__title').html('Delete AD property?');
        $('dialog .mdl-dialog__content p').html('Are you sure you want to delete ' + property.Name + '?');
        dialog.showModal();
        $('dialog .close').click(function () {
            dialog.close();
        });
        $('dialog .confirm').click(function () {
            $('dialog .close, dialog .confirm').hide();
            $('dialog .mdl-spinner').removeClass('hidden').addClass('is-active');
            component.adpropertiesService.deleteadproperty(propertyToDelete).subscribe(function (resp) {
                console.log(resp);
                if (resp.success) {
                    component.loadADProperties();
                    $('dialog .mdl-spinner').removeClass('is-active').addClass('hidden');
                    $('dialog .close, dialog .confirm').show();
                    dialog.close();
                    logger.showNotification('Property "' + property.Name + ' has been deleted.', 'success');
                }
                $('dialog .close, dialog .confirm').unbind('click');
                $('dialog .confirm').unbind('click');
            });
        });
    };
    AdminADPropertiesComponent.prototype.ngOnInit = function () {
        this.loadADProperties();
    };
    AdminADPropertiesComponent.prototype.ngAfterViewInit = function () {
        setTimeout(function () {
            $('[class*="mdl-js-"]').each(function (i, element) {
                //console.log(element);
                componentHandler.upgradeElement(element);
            });
        }, 1000);
    };
    AdminADPropertiesComponent.prototype.loadADProperties = function () {
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