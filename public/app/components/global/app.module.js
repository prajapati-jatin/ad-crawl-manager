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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var home_component_1 = require('../comps/home.component');
var login_form_component_1 = require('../comps/login-form.component');
var http_1 = require('@angular/http');
var logout_component_1 = require('../comps/logout.component');
var about_component_1 = require('../comps/about.component');
var contact_component_1 = require('../comps/contact.component');
var user_service_1 = require('../services/user.service');
var logger_service_1 = require('../services/logger.service');
var shareddata_service_1 = require('../services/shareddata.service');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, http_1.JsonpModule, app_routing_1.routing],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, login_form_component_1.LoginComponent, logout_component_1.LogoutComponent,
                about_component_1.AboutComponent, contact_component_1.ContactComponent],
            providers: [user_service_1.UserService, logger_service_1.Logger, app_routing_1.appRoutingProviders, shareddata_service_1.SharedDataService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map