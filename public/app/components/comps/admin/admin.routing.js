"use strict";
var router_1 = require('@angular/router');
var admin_component_1 = require('./admin.component');
var admin_dashboard_component_1 = require('./admin-dashboard.component');
var admin_adproperties_component_1 = require('./admin-adproperties.component');
var admin_application_add_component_1 = require('./admin-application-add.component');
var admin_applications_component_1 = require('./admin-applications.component');
var auth_guard_service_1 = require('../../services/auth-guard.service');
var adminRoutes = [
    {
        path: '',
        component: admin_component_1.AdminComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [auth_guard_service_1.AuthGuard],
                children: [
                    { path: 'application/add', component: admin_application_add_component_1.AdminAddApplicationComponent },
                    { path: 'applications', component: admin_applications_component_1.AdminApplicationsComponent },
                    { path: 'adproperties', component: admin_adproperties_component_1.AdminADPropertiesComponent },
                    { path: '', component: admin_dashboard_component_1.AdminDashboardComponent }
                ]
            }
        ]
    }
];
exports.adminRouting = router_1.RouterModule.forChild(adminRoutes);
//# sourceMappingURL=admin.routing.js.map