// import { CanActivateFn } from '@angular/router';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

// export const adminGuard: CanActivateFn = (route, state) => {

//   let token = window.localStorage.getItem('token');
//   if (token) {

//   }
//   return false;
// };

@Injectable()
export class adminGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let token = window.localStorage.getItem('token');
    if (token !== 'AUTH_TOKEN') { // of course this isn't a production environment
      this.router.navigate(['/login'])
      return false;
    }
    return true;
  }
}
