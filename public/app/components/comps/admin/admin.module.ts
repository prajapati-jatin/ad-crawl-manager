import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { adminRouting } from './admin.routing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { CategoriesComponent } from './admin-categories.component';
import { AdminADPropertiesComponent } from './admin-adproperties.component';
import { AdminAddApplicationComponent } from './admin-application-add.component';
import { AdminApplicationsComponent } from './admin-applications.component';
import { AdminAddADPropertyComponent } from './admin-add-adproperty.component';

@NgModule({
    imports: [
        CommonModule,
        adminRouting,
        FormsModule
    ],
    declarations: [
        AdminComponent,
        AdminDashboardComponent,
        CategoriesComponent,
        AdminAddApplicationComponent,
        AdminADPropertiesComponent,
        AdminApplicationsComponent,
        AdminAddADPropertyComponent
    ]
})
export class AdminModule{

}