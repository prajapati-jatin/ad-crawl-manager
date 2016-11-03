import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Logger } from './logger.service';
import { Observable } from 'rxjs/Observable';
import { SharedDataService } from './shareddata.service'; 

@Injectable()
export class ApplicationService{
    constructor(private logger: Logger, private http: Http, private sharedData: SharedDataService){

    }

    
}