import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate, CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate , CanActivateChild{
    constructor(private autSrv: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.autSrv.user$.pipe(
            take(1),
            map((user) => {
                if (user) {
                    return true;
                }
                alert(
                    'Per visualizzare questa risorsa devi essere loggato!\nAccedi o registrati'
                );
                return this.router.createUrlTree(['/login']);
            })
        );
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
        return this.canActivate(route, state);
      }
}
