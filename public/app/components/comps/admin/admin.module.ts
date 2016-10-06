import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { adminRouting } from './admin.routing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CategoriesComponent } from './admin-categories.component';

@NgModule({
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [
        AdminComponent,
        AdminDashboardComponent,
        CategoriesComponent
    ]
})
export class AdminModule{

}