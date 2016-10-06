"use strict";
var router_1 = require('@angular/router');
var admin_component_1 = require('./admin.component');
var admin_dashboard_component_1 = require('./admin-dashboard.component');
var admin_categories_component_1 = require('./admin-categories.component');
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
                    { path: 'categories', component: admin_categories_component_1.CategoriesComponent },
                    { path: '', component: admin_dashboard_component_1.AdminDashboardComponent }
                ]
            }
        ]
    }
];
exports.adminRouting = router_1.RouterModule.forChild(adminRoutes);
//# sourceMappingURL=admin.routing.js.map