import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterLoginService } from '../../register-login/service/register-login.service';

import { InjectionToken } from '@angular/core';

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
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authservice: RegisterLoginService,

  ) { }

  private _window = inject(WINDOW); // or window = inject(WINDOW);


  getLocalToken() {
    // if (this.window && this.window.localStorage) {
    //   return this.window.localStorage.getItem('token') || '';
    // }
    // return '';
    return this.authservice.getToken()
  }



  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `${this.getLocalToken()}`
    })
  }




  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getCall(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params }).pipe(catchError(this.formatErrors));
  }

  postCall(path: string, body: object = {}): Observable<any> {
    return this.http.post(path, JSON.stringify(body), this.httpOptions).pipe(catchError(this.formatErrors));
  }

  putCall(path: string, body: object = {}): Observable<any> {
    return this.http.put(path, JSON.stringify(body), this.httpOptions).pipe(catchError(this.formatErrors));
  }

  deleteCall(path: string): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatErrors))
  }

}
