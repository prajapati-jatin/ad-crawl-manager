import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserService } from '../services/user.service';
import { Logger } from '../services/logger.service';
import { SharedDataService } from '../services/shareddata.service';

@Injectable()
export class AuthenticationService{

    public IsLoggedIn: boolean = false;

    public RedirectURL: string;

    constructor(private userService: UserService, private logger: Logger,
                private http: Http, private sharedData: SharedDataService){

    }

    login(username: string, password: string){
        return this.userService.authenticate(username, password).map(res => {
            if(res.success){                
                localStorage.setItem('auth_token', res.data);
                this.sharedData.setIsLogged(true);
            }
            return res;
        });
    }

    logout(){
        return this.userService.logout().map(res => {
            this.sharedData.setIsLogged(false);
            return res;
        });
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