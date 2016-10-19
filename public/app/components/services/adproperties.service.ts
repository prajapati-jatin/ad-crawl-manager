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
    urlAddProperty = '/api/adproperties/add';
    urlDeleteADProperty = '/api/adproperties/';
    urlChangeDefaultFlag = '/api/adproperties/changedefaultflag';

    /**
     * Service request handler to list properties.
     */
    listproperties(){
        return this.http.get(this.urlListProperties, this.sharedData.getRequestOptions()).map(resp => resp.json())
            .map(resp => {
                return resp;
            });
    }

    addproperty(data){
        return this.http.post(this.urlAddProperty, data, this.sharedData.getRequestOptions()).map(resp => {
            return resp.json()
        }).map(resp => {
            return resp;
        });
    }

    deleteadproperty(id){
        return this.http.delete(this.urlDeleteADProperty + id, this.sharedData.getRequestOptions())
                    .map(resp => resp.json())
                    .map(resp => {
                        return resp;
                    });
    }

    changedefaultflag(data){
        return this.http.post(this.urlChangeDefaultFlag, data, this.sharedData.getRequestOptions())
                    .map(resp => resp.json())
                    .map(resp => {
                        return resp;
                    });
    }
}