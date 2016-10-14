import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SharedDataService{
    constructor(){

    }

    isLoggedIn: boolean = false;

    redirectUrl: string = '';

    IsLoggedIn(){
        let token = localStorage.getItem('auth_token');
        return (token !== undefined && token !== '' && token !== null);
    }

    setIsLoggedIn(status){
        this.isLoggedIn = status;
    }

    setRedirectUrl(url:string){
        this.redirectUrl = url;
    }

    getRedirectUrl(){
        return this.redirectUrl;
    }

    getRequestOptions(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') });
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}