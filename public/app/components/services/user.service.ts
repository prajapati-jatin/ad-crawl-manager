import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Logger } from './logger.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService{    
    
    constructor(private logger: Logger, private http: Http) { 
        
    };

    authUrl = '/api/users/authenticate';

    authenticate(username: string, password: string){
        let body = JSON.stringify({username: username, password: password});
        return this.http.post(this.authUrl, body, this.getRequestOptions())
        .map(res => res.json())
        .map((res) => {            
            return res;
        });
    }
    
    logout(): Promise<boolean>{
        let url = '/signoff';
        //let url = '/api/users/current';
        console.log(url);
        try{
            return this.http.get(url).toPromise().then(res => {
                if(res.statusText === "OK"){
                    return true;
                }
                return false;
            }).catch(err => {
                return err;
            })
        }
        catch(ex){
            console.log(ex);
        }
    }
    
    getToken(): Promise<string> {
        let url = '/token';
        return this.http.get(url, this.getRequestOptions()).toPromise().then((response) => {
                let body = response.text();
                return body;
            }).catch((error) => {
                let errorMessage = this.logError(error);
                return Promise.reject(errorMessage);
            });
    }
    
    private logError(error){
        let errorMessage = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}`: 'Server error';
        this.logger.logError(errorMessage);
        return errorMessage;
    }
    
    private getRequestOptions(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}