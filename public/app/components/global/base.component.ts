import { Component } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';


export class BaseComponent implements OnInit{
    
    title = 'MEA2N';
    
    authenticated = false;
    
    ngOnInit(){
        console.log('In base onInit');
    }
}