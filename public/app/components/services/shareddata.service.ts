import { Injectable } from '@angular/core';

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
}