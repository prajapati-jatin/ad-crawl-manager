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
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { ADPropertiesService } from '../services/adproperties.service';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule, routing  ],
    declarations: [ AppComponent, HomeComponent, LoginComponent, LogoutComponent, 
    AboutComponent, ContactComponent ],
    providers: [ UserService, Logger, appRoutingProviders, SharedDataService, NotificationService,
    ADPropertiesService ],
    bootstrap: [ AppComponent ]
})

// { provide: Http, useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpIntercepter(xhrBackend, requestOptions, router),
//         deps: [XHRBackend, RequestOptions, Router]}

export class AppModule {
    
}