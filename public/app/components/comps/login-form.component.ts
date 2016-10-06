import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, OnInit } from '@angular/core';

import { AppComponent } from '../global/app.component';
import { Login } from '../models/login';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { NotificationService, NotificationMessage } from '../services/notification.service';

//To avoid 'name not found' warning from TypeScript, define a variable of type any.
declare var componentHandler: any;

@Component({
    templateUrl: '/views/login.html'
})

export class LoginComponent implements AfterViewInit, OnInit{
    
    constructor(private userService: UserService, private logger: Logger, 
                private route: ActivatedRoute, private router: Router,
                private notificationService: NotificationService,
                public authService: AuthenticationService) { 

                }
    
    @Input() isauthenticated = false;
    title = 'Login';
    
    model = new Login('jatin.prajapati@outlook.com', '');    
    
    submitted = false;
    
    onSubmit() {
        try{
            this.submitted = true;
            this.authService.login(this.model.username, this.model.password).then(resp => {
                console.log(resp.token);
                window.token = resp;
                window.IsLoggedIn = true;
                this.logger.log(this.authService.RedirectURL);
                if(window.RedirectURL !== '' && window.RedirectURL !== undefined){
                    this.router.navigate([window.RedirectURL]);
                }
                else{
                    this.router.navigate(['/home']);    
                }
            }).catch(err => {
                let errorMessage = err.text();
                this.logger.showNotification(errorMessage, 'error');
            });
            // this.userService.authenticate(this.model.username, this.model.password).then((response) => {
            //     console.log('In auth success');
            //     window.token = response;
            //     this.isauthenticated = true;
            //     this.notificationService.sendNotification(new NotificationMessage("authenticated", "", null));
            //     this.router.navigate(['/home']);
            // }).catch((error) => {
            //     let errorMessage = error.text();
            //     this.logger.showNotification(errorMessage, 'error');
            //     this.logger.log(error.text());
            // });
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
        // try{
        //     this.userService.getToken().then((response) => {
        //         if(response !== "undefined" && response !== ''){
        //             this.router.navigate(['/home']);
        //         }
        //     }).catch((error) => {
        //         this.logger.logError('Not authenticated');
        //     });
        // }
        // catch(ex){
        //     this.logger.logError(ex);
        // }
    }
}