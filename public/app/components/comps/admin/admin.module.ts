import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { adminRouting } from './admin.routing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CategoriesComponent } from './admin-categories.component';
import { AdminADPropertiesComponent } from './admin-adproperties.component';
import { AdminAddApplicationComponent } from './admin-application-add.component';
import { AdminApplicationsComponent } from './admin-applications.component';

@NgModule({
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [
        AdminComponent,
        AdminDashboardComponent,
        CategoriesComponent,
        AdminAddApplicationComponent,
        AdminADPropertiesComponent,
        AdminApplicationsComponent
    ]
})
export class AdminModule{

}