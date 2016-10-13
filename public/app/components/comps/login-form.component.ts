import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, OnInit } from '@angular/core';

import { AppComponent } from '../global/app.component';
import { Login } from '../models/login';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { NotificationService, NotificationMessage } from '../services/notification.service';
import { SharedDataService } from '../services/shareddata.service';

//To avoid 'name not found' warning from TypeScript, define a variable of type any.
declare var componentHandler: any;

@Component({
    templateUrl: '/views/login.html'
})

export class LoginComponent implements AfterViewInit, OnInit{
    
    constructor(private userService: UserService, private logger: Logger, 
                private route: ActivatedRoute, private router: Router,
                private notificationService: NotificationService,
                public authService: AuthenticationService, private sharedData: SharedDataService) { 

                }
    
    @Input() isauthenticated = false;
    title = 'Login';
    
    model = new Login('jatin.prajapati@outlook.com', '');  

    errorMessage = undefined;
    
    submitted = false;
    
    onSubmit() {
        try{
            this.submitted = true;
            this.authService.login(this.model.username, this.model.password).subscribe((result) => {
                console.log(result);
                if(result.success){
                    let redirectUrl = this.sharedData.getRedirectUrl();
                    if(redirectUrl === '' || redirectUrl === undefined){
                        redirectUrl = '/admin';
                    }
                    this.notificationService.sendNotification(new NotificationMessage('authenticated', '', null));
                    this.router.navigate([redirectUrl]);
                }
                else{
                    this.logger.showNotification(result.data, 'error');
                }
            });
        }
        catch(ex){
            console.error(ex);
        }
    }
    
    //TODO: Remove this when done.
    get diagnostic() {
        return JSON.stringify(this.model);
    }
    
    ngAfterViewInit(){
        setTimeout(function(){
            $('[class*="mdl-js-"]').each(function(i, element){
               //console.log(element);
               componentHandler.upgradeElement(element);
           });
        }, 1000);
    }
    
    ngOnInit(){
        try{
            this.authService.getToken().subscribe(response => {
                console.log('Token: ' + response);
                if(response === undefined || response === ''){
                    return;
                }
                this.notificationService.sendNotification(new NotificationMessage('authenticated', '', null));
                let redirectUrl = this.sharedData.getRedirectUrl();
                if(redirectUrl === '' || redirectUrl === undefined){
                    redirectUrl = '/admin';
                }
                this.router.navigate([redirectUrl]);
            });
        }
        catch(ex){
            this.logger.logError(ex);
        }
    }
}