import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';

@Component({
    template: `<span></span>`
})
export class LogoutComponent implements OnInit {
    constructor(private userService: UserService, private logger: Logger, private router: Router){}
    
    ngOnInit(){
        this.userService.logout().then(res => {
            this.router.navigate(['/home']);
        }).catch(err => {
            this.logger.logError(err);
        });
    }
}