import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const myToken = localStorage.getItem('token');
  console.log("token in intersepter:-", myToken);

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `${myToken}`
    }
  })
  return next(cloneRequest);
};
