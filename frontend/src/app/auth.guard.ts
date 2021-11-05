import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private localstorageService: LocalStorageService, private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    if (this.localstorageService.checkIfAuthTokenExists()) {
      // Credentials exist so we assume an authenticated user.
      return true;
    } else {
      // Missing credentials indicate an unauthenticated
      // user, so we redirect to the `LoginComponent`.
      const loginUrlTree = this.router.parseUrl('/login');
      return loginUrlTree;
    }
  }
}
