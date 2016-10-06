import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CategoriesComponent } from './admin-categories.component';

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
                    { path: 'categories', component: CategoriesComponent },
                     { path: '', component: AdminDashboardComponent }
                ]
            }
        ]
    }
]

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);