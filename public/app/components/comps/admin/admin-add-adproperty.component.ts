import { Component, Input } from '@angular/core';
import { AfterViewInit, OnInit } from '@angular/core';
import { ADPropertiesService } from '../../services/adproperties.service';
import { Logger } from '../../services/logger.service';
import { ADProperty } from '../../models/adproperty';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService, NotificationMessage } from '../../services/notification.service';

//To avoid 'name not found' warning from TypeScript, define a variable of type any.
declare var componentHandler: any;

@Component({
    templateUrl: '/views/admin/add-ad-properties.html'
})
export class AdminAddADPropertyComponent{
    constructor(private adpropertiesService: ADPropertiesService, private logger: Logger,
    private router: Router, private notificationService: NotificationService){

    }

    model = new ADProperty('', '');

    onSubmit(){
        console.log(this.model);
        this.adpropertiesService.addproperty(this.model).subscribe(resp => {
            console.log(resp);
            if(resp.success){
                this.router.navigate(['/admin/adproperties']);
            }
            else{
                this.logger.showNotification(resp.data, 'error');
            }
        });
    }

    onNameKeyup(name){
        this.model.NormalizedName = name.toLowerCase();
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
} 