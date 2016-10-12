import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from '../comps/home.component';
import { LoginComponent } from '../comps/login-form.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { LogoutComponent } from '../comps/logout.component';
import { AboutComponent } from '../comps/about.component';
import { ContactComponent } from '../comps/contact.component';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';
import { SharedDataService } from '../services/shareddata.service';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule, routing  ],
    declarations: [ AppComponent, HomeComponent, LoginComponent, LogoutComponent, 
    AboutComponent, ContactComponent ],
    providers: [ UserService, Logger, appRoutingProviders, SharedDataService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    
}