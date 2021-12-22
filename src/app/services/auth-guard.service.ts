import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

    if (!this.authService.getIsLoggedIn()) {
      this.router.navigate(['login'], { queryParams: { retUrl: route.url } });
      window.alert('Email not yet verified, please check your inbox!');
      return false;
    }
    return true;
  }

}
