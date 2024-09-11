import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AUTH_ROUTE } from '../../constants/auth-route';

export const authWithRedirectGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const auth: AuthService = inject(AuthService);

  if (auth.isLoggedIn) {
    return true;
  }

  return router.navigate([AUTH_ROUTE.LOGIN]);
};
