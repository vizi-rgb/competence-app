import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserAuthority } from '../../constants/user-authority';
import { MessageService } from '../../services/message.service';
import { MessageCode } from '../../constants/message-code.enum';

export const requireAnyRoleGuard = (roles: UserAuthority[]): CanActivateFn => {
  return () => {
    const auth: AuthService = inject(AuthService);

    if (auth.isLoggedIn) {
      for (const requiredRole of roles) {
        if (auth.hasRole(requiredRole)) {
          return true;
        }
      }

      inject(MessageService).add(MessageCode.ACCESS_FORBIDDEN);
    }

    return false;
  };
};
