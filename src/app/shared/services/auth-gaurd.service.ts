import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterLoginService } from '../../register-login/service/register-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {


  constructor(private register_login_services: RegisterLoginService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.register_login_services.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
  }

}
