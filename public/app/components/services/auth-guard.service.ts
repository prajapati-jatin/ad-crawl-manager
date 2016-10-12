import { Injectable } from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot,
    RouterStateSnapshot,CanActivateChild,
    NavigationExtras,CanLoad,Route
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { SharedDataService } from './shareddata.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{
    constructor(private authService: AuthenticationService, private router:  Router,
    private sharedData: SharedDataService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean{
        let url = `/${route.path}`;
        console.log('In canLoad');
        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean{
        console.log('In checkLogin');
        //If user is logged in then return true.
        if(this.authService.IsLoggedIn){
            return true;
        }
        console.log(url);
        //Store the attempted URL for redirecting
        this.sharedData.setRedirectUrl(url);
        
        //Navigate to the login page
        this.router.navigate(['/login']);
        return false;
    }
}