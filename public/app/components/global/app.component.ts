import { OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, Input } from '@angular/core';

//import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { NotificationService, NotificationMessage } from '../services/notification.service';
import { SharedDataService } from '../services/shareddata.service';

import './rxjs-operators';

//To avoid 'name not found' warning from TypeScript, define a variable of type any.
declare var componentHandler: any;

@Component({
    selector: 'app',
    templateUrl: '/views/app.html',
    providers: [ NotificationService, AuthenticationService ]
})
export class AppComponent implements AfterViewInit, OnInit {

    public authenticated = false;
    
    constructor(private authService: AuthenticationService, private logger: Logger, private router: Router,
    private notificationService: NotificationService, private sharedData: SharedDataService){
        this.notificationService.notify$.subscribe(noty => {
            switch(noty.notyType){
                case 'authenticated':
                    this.authenticated = true;
                break;
                case 'logout':
                    this.authenticated = false;
                break;
            }
        });
    }    
    
    title = 'SPRT';
    
    onLogout(){
        this.authService.logout().then(res => {
            if(res){
                //window.location.assign('/');
            }
        }).catch(err => {
            console.log('logout error');
            console.log(err);
        });
    }
    
    ngOnInit(){
        try{
            if(this.sharedData.IsLoggedIn()){
                this.notificationService.sendNotification(new NotificationMessage('authenticated', '', null));
            }
        }
        catch(ex){
            this.logger.logError(ex);
        }
    }
    
    // ngDoCheck(){
    //     try{
    //         console.log('Do check');
    //         this.userService.getToken().then((response) => {
    //             if(response !== "undefined" && response !== ''){
    //                 this.authenticated = true;
    //             }
    //         }).catch((error) => {
                
    //         });
    //     }
    //     catch(ex){
    //         this.logger.logError(ex);
    //     }
    // }
    
    ngAfterViewInit(){
        setTimeout(function(){
            $('[class*="mdl-js-"]').each(function(i, element){
               //console.log(element);
               componentHandler.upgradeElement(element);
           });
        }, 1000);
    }
}