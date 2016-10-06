"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('../comps/home.component');
var login_form_component_1 = require('../comps/login-form.component');
var logout_component_1 = require('../comps/logout.component');
var about_component_1 = require('../comps/about.component');
var contact_component_1 = require('../comps/contact.component');
var auth_guard_service_1 = require('../services/auth-guard.service');
var authentication_service_1 = require('../services/authentication.service');
var candeactivateguard_1 = require('../services/candeactivateguard');
var adminRoutes = [
    {
        path: 'admin',
        loadChildren: 'app/components/comps/admin/admin.module#AdminModule',
        canLoad: [auth_guard_service_1.AuthGuard]
    }
];
var appRoutes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent
    },
    {
        path: 'login',
        component: login_form_component_1.LoginComponent
    },
    {
        path: 'logout',
        component: logout_component_1.LogoutComponent
    }
].concat(adminRoutes);
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
exports.authProviders = [
    auth_guard_service_1.AuthGuard,
    authentication_service_1.AuthenticationService
];
exports.appRoutingProviders = [
    exports.authProviders,
    candeactivateguard_1.CanDeactivateGuard
];
//# sourceMappingURL=app.routing.js.map