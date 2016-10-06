import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';

@Component({
    templateUrl: '/views/home.html'
})

export class HomeComponent implements OnInit{
    
    constructor(private userService: UserService, private logger: Logger){}
    
    title = 'MEA2N';
    
    ngOnInit(){
        try{
            this.userService.getToken().then((response) => {
                if(response !== "undefined" && response !== ''){
                    
                }
            }).catch((error) => {
                
            });
        }
        catch(ex){
            this.logger.logError(ex);
        }
    }
}