import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Logger } from './logger.service';
import { Observable } from 'rxjs/Observable';
import { SharedDataService } from './shareddata.service';

@Injectable()
export class ADPropertiesService{
    constructor(private logger: Logger, private http: Http, private sharedData: SharedDataService){

    }

    urlListProperties = '/api/adproperties/list';

    /**
     * Service request handler to list properties.
     */
    listproperties(){
        return this.http.get(this.urlListProperties, this.sharedData.getRequestOptions()).map(resp => resp.json())
            .map(resp => {
                return resp;
            });
    }
}