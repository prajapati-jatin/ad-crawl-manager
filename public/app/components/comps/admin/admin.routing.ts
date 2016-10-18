import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CategoriesComponent } from './admin-categories.component';
import { AdminADPropertiesComponent } from './admin-adproperties.component';
import { AdminAddApplicationComponent } from './admin-application-add.component';
import { AdminApplicationsComponent } from './admin-applications.component';
import { AdminAddADPropertyComponent } from './admin-add-adproperty.component';

import { AuthGuard } from '../../services/auth-guard.service';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                canActivateChild: [ AuthGuard ],
                children: [
                    { path: 'application/add', component: AdminAddApplicationComponent },
                    { path: 'applications', component: AdminApplicationsComponent },
                    { path: 'adproperties', component: AdminADPropertiesComponent },
                    { path: 'adproperties/add', component: AdminAddADPropertyComponent },
                     { path: '', component: AdminDashboardComponent }
                ]
            }
        ]
    }
]

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);