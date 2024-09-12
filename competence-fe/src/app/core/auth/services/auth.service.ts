import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Authority, AuthResponse } from '../dto/auth-response';
import { RegisterUserRequest } from '../dto/register-user-request';
import { AuthEndpoints } from './auth.endpoints';
import { LoginUserRequest } from '../dto/login-user-request';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { MessageCode } from '../../constants/message-code.enum';
import { AUTH_ROUTE } from '../../constants/auth-route';
import { UserAuthority } from '../../constants/user-authority';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$: BehaviorSubject<AuthResponse | null>;
  private authToken: string | null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {
    this.userSubject$ = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );

    this.authToken = localStorage.getItem('authToken');
  }

  get userValue(): Observable<AuthResponse | null> {
    return this.userSubject$.asObservable();
  }

  get isLoggedIn(): boolean {
    return this.userSubject$.getValue() != null;
  }

  get authTokenValue(): string | null {
    return this.authToken;
  }

  get roles(): string[] {
    return (
      this.userSubject$
        .getValue()
        ?.authorities.map((value: Authority) => value.authority) ?? []
    );
  }

  hasRole(role: UserAuthority) {
    return this.roles.includes(role.toString());
  }

  register(request: RegisterUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AuthEndpoints.REGISTER, request);
  }

  login(request: LoginUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AuthEndpoints.LOGIN, request).pipe(
      tap((user: AuthResponse) => {
        this.userSubject$.next(user);
        this.authToken = btoa(request.email + ':' + request.password);

        localStorage.setItem('authToken', this.authToken);
        localStorage.setItem('user', JSON.stringify(user));

        this.messageService.add(MessageCode.LOGIN_SUCCESS);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');

    this.userSubject$.next(null);
    this.authToken = null;
    this.messageService.add(MessageCode.LOGOUT_SUCCESS);
    this.router.navigate([AUTH_ROUTE.LOGIN]);
  }
}
