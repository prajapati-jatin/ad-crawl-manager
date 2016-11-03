import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService, NotificationMessage } from '../../services/notification.service';
import { Logger } from '../../services/logger.service'; 

@Component({
    templateUrl: '/views/admin/add-application.html'
})
export class AdminAddApplicationComponent{
    constructor(private logger: Logger, private router: Router, private notificationService: NotificationService){
                
    }
}