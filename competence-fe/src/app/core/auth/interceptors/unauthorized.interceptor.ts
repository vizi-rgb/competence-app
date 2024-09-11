import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AUTH_ROUTE } from '../../constants/auth-route';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      console.log('Error response ' + err.status);
      if (
        [HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(
          err.status
        )
      ) {
        auth.logout();
        router.navigate([AUTH_ROUTE.LOGIN]);
      }

      throw err;
    })
  );
};
