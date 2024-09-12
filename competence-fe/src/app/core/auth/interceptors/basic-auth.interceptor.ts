import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const basicAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  if (authService.isLoggedIn && authService.authTokenValue) {
    const basicAuth: string = `Basic ${authService.authTokenValue}`;
    const newReq = req.clone({
      headers: req.headers.append('Authorization', basicAuth),
    });
    return next(newReq);
  } else {
    return next(req);
  }
};
