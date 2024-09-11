import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  isMissing,
  isModifiedAndInvalid,
} from '../../../../shared/util/validation.util';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../services/message.service';
import { MessageCode } from '../../../constants/message-code.enum';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatChipSet,
    MatCardFooter,
    MatChip,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatLabel,
    MatCardActions,
    ReactiveFormsModule,
    MatError,
    TranslateModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loginForm: FormGroup;
  protected readonly minPasswordLength: number = 5;
  protected readonly isModifiedAndInvalid = isModifiedAndInvalid;
  protected readonly isMissing = isMissing;
  private readonly snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
  };

  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(this.minPasswordLength)],
      ],
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onClear(): void {
    this.loginForm.reset();
  }

  onSubmit(): void {
    this.auth.login(this.loginForm.getRawValue()).subscribe({
      error: (err: HttpErrorResponse) => {
        const messageKey: string =
          err.status === HttpStatusCode.Unauthorized
            ? MessageCode.BAD_CREDENTIALS
            : MessageCode.LOGIN_ERROR;

        this.messageService.add(messageKey);
        this.translate.get(messageKey).subscribe({
          next: (value: string) =>
            this.snackBar.open(value, undefined, this.snackBarConfig),
        });
      },
      complete: () => this.router.navigate(['/']),
    });
  }
}
