import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { inject } from '@angular/core';
import { MessageCode } from '../../constants/message-code.enum';

export const forbiddenInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === HttpStatusCode.Forbidden) {
        messageService.add(MessageCode.ACCESS_FORBIDDEN);
      }

      throw err;
    })
  );
};
