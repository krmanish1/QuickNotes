import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../cors/service/api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  login(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      // this.isAuthenticated = true;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      // this.isAuthenticated = false;
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
