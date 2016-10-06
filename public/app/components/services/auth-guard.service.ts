import { Injectable } from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot,
    RouterStateSnapshot,CanActivateChild,
    NavigationExtras,CanLoad,Route
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad{
    constructor(private authService: AuthenticationService, private router:  Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let url: string = state.url;
        console.log(url);

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
        if(window.IsLoggedIn){
            return true;
        }
        console.log(url);
        //Store the attempted URL for redirecting
        window.RedirectURL = url;

        //Navigate to the login page
        this.router.navigate(['/login']);
        return false;
    }
}