import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService{
    constructor(){

    }

    isLoggedIn: boolean = false;

    redirectUrl: string = '';

    IsLoggedIn(){
        return this.isLoggedIn;
    }

    setIsLogged(status){
        this.isLoggedIn = status;
    }

    setRedirectUrl(url:string){
        this.redirectUrl = url;
    }

    getRedirectUrl(){
        return this.redirectUrl;
    }
}