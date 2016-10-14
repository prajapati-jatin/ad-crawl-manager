import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ADPropertiesService } from '../../services/adproperties.service';
import { Logger } from '../../services/logger.service';

@Component({
    templateUrl: '/views/admin/ad-properties.html'
})
export class AdminADPropertiesComponent implements OnInit{
    constructor(private adpropertiesService: ADPropertiesService, private logger: Logger){

    }

    properties = [];

    ngOnInit(){
        this.adpropertiesService.listproperties().subscribe(res => {            
            if(res.success){
                this.properties = res.data[0];
            }
        });
    }
}