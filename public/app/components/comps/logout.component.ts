import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    template: `<span></span>`
})
export class LogoutComponent {
    constructor(private authService: AuthenticationService, private logger: Logger, private router: Router){}   
   
}