import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  userData: any;
  private menuState = new BehaviorSubject<boolean>(true);
  isMenuExpanded = this.menuState.asObservable();

  toggleMenu() {
    this.menuState.next(!this.menuState.value);
  }

  private userDataSubject = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.userDataSubject.asObservable();


  setUser(user: any): void {
    // Save user data to a cookie
    const expires = 'max-age=86400'; // Expires in 24 hours
    document.cookie = `user=${JSON.stringify(user)};expires=${new Date(Date.now() + 86400000).toUTCString()};path=/`;
    this.userDataSubject.next(user);
  }

  // getUser() {
  //   return this.userDataSubject.asObservable();
  // }

  // getUser():any {
  //   // return this.userDataSubject.asObservable();

  //   const userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*/, '$1');

  //   if (userCookie) {
  //     try {
  //       return JSON.parse(userCookie);
  //     } catch (error) {
  //       console.error('Error parsing user cookie:', error);
  //       return null;
  //     }
  //   }
  //   return null;

  // }


  getUser() {
    // Attempt to read the user data from the cookie
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [name, value] = cookie.split('=');
      if (name.trim() === 'user') {
        try {
          this.userData = JSON.parse(value);
          return this.userData;
        } catch (error) {
          console.error('Error parsing user cookie:', error);
          return null;
        }
      }
    }
    return null;
  }

  clearUserData() {
    this.userDataSubject.next(null);
  }


}
