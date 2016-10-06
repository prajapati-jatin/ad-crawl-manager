import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../comps/home.component';
import { LoginComponent } from '../comps/login-form.component';
import { LogoutComponent } from '../comps/logout.component';
import { AboutComponent } from '../comps/about.component';
import { ContactComponent } from '../comps/contact.component';

import { AuthGuard } from '../services/auth-guard.service';
import { AuthenticationService } from '../services/authentication.service';

import { CanDeactivateGuard } from '../services/candeactivateguard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'app/components/comps/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  }
]

const appRoutes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
      path: 'contact',
      component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },  
  ...adminRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

export const authProviders = [
  AuthGuard,
  AuthenticationService
]

export const appRoutingProviders: any[] = [
  authProviders,
  CanDeactivateGuard
]