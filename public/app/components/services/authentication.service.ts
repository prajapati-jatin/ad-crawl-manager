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
            }
            return res;
        });
    }

    logout(){
        console.log('In authService logout');
        return this.userService.logout().then(res => {
            if(res){
                localStorage.removeItem('auth_token');
            }
            return res;
        }).catch(err => {
            return err;
        });
    }

    getToken(){
        let url = '/token';
        return this.http.get(url, this.getRequestOptions()).map(resp => {
                //console.log('Token: ' + resp.text());
                return resp.text();
            });
    }

    private getRequestOptions(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}