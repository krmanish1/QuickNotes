import { inject, Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../cors/service/api.service';
import { isPlatformBrowser } from '@angular/common';

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return new Window(); // does this work?
  }
});

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(WINDOW) private window: Window
  ) { }

  private _window = inject(WINDOW); // or window = inject(WINDOW);


  setUserId(userId: string) {

    localStorage.setItem('userId', userId);

  }


  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      // this.isAuthenticated = true;
    }
  }

  token: any = '';

  getToken() {
    // if (this.window && this.window.localStorage) {
    //   return this._window.localStorage.getItem('token') || '';
    // }
    // return '';

    return localStorage.getItem('token');

  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      // this.isAuthenticated = false;
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUserId() {

    return localStorage.getItem('userId');
  }
}
