import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';

@Injectable()
export class AuthenticationService{

    public IsLoggedIn: boolean = false;

    public RedirectURL: string;

    constructor(private userService: UserService, private logger: Logger,
                private http: Http){

    }

    login(username: string, password: string): Promise<string>{
        return this.userService.authenticate(username, password).then(resp => {
            window.IsLoggedIn = true;
            return resp;
        }).catch(err => {
            return err;
        });
    }

    logout(): Promise<string>{
        return this.userService.logout().then(resp => {
            window.IsLoggedIn = false;
            return resp;
        }).catch(err => {
            return err;
        })
    }

    getToken(): Promise<string>{
        let url = '/token';
        return this.http.get(url, this.getRequestOptions()).toPromise().then((response) => {
            let body = response.text();
            return body;
        }).catch((error) => {            
            return Promise.reject(error);
        });
    }

    private getRequestOptions(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.token });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}