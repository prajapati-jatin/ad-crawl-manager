import { Component } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { Application } from '../../models/application';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService, NotificationMessage } from '../../services/notification.service';
import { Logger } from '../../services/logger.service';

//To avoid 'name not found' warning from TypeScript, define a variable of type any.
declare var componentHandler: any; 

@Component({
    templateUrl: '/views/admin/add-application.html'
})
export class AdminAddApplicationComponent{
    constructor(private logger: Logger, private router: Router, private notificationService: NotificationService){
        
    }

    model = new Application('', '');

    ngAfterViewInit(){
        setTimeout(function(){
            $('[class*="mdl-js-"]').each(function(i, element){
               //console.log(element);
               componentHandler.upgradeElement(element);
           });
        }, 1000);
    }
}