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
import { UserService } from 'src/app/service/user.service';

@Injectable({
    providedIn: 'root',
})
export class EditGuard implements CanActivate , CanActivateChild{
    constructor(private uSrv: UserService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.uSrv.hasWritePermission();
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
