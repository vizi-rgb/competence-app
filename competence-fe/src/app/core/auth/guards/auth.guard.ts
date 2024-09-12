import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageCode } from '../../constants/message-code.enum';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);

  if (authService.isLoggedIn) {
    const userRoles: string[] = authService.roles;
    const requiredRoles: string[] = route.data['roles'];

    for (const requiredRole of requiredRoles) {
      for (const userRole of userRoles) {
        if (userRole === requiredRole) {
          return true;
        }
      }
    }

    inject(MessageService).add(MessageCode.ACCESS_FORBIDDEN);
    return false;
  } else {
    return false;
  }
};
