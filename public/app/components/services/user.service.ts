import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Logger } from './logger.service';

@Injectable()
export class UserService{
    
    constructor(private logger: Logger, private http: Http) { };
    
    authenticate(username:string, password:string): Promise<string> {        
        let authUrl = '/api/users/authenticate';
        let body = JSON.stringify({username: username, password: password});
        return this.http.post(authUrl, body, this.getRequestOptions())
                .toPromise()
                .then((response) => {
                    let body = response.json();
                    return body || {};
                });
                // .catch((error) => {
                //     this.logger.log('Auth error');
                //     this.logError(error);
                //     throw new Error("Invalid credentials");
                // });
    }
    
    logout(): Promise<string>{
        let url = '/logout';
        return this.http.get(url).toPromise().then((res) => {
           this.logger.log('Logout response: ' + res.status);
           let body = res.statusText;
           return body || {};
        }).catch((err) => {
            this.logError(err);
        });
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
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.token });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}