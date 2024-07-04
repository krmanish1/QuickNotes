import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = localStorage.getItem('token');
    console.log("token in intersepter:-", myToken);

    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `${myToken}`
      }
    });
    console.log('Cloned request:', cloneRequest);

    return next.handle(cloneRequest);
  }
}