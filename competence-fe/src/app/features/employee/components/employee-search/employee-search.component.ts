import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { EMPLOYEE_ROUTE } from '../../../../core/constants/employee-route';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserAuthority } from '../../../../core/constants/user-authority';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    AsyncPipe,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    RouterLink,
    MatDivider,
    TranslateModule,
  ],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSearchComponent implements OnInit {
  employees$: Observable<EmployeeModel[]> = EMPTY;
  isUser: boolean;
  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    this.isUser = this.authService.hasRole(UserAuthority.USER);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.employees$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.employeeService.searchEmployees(term))
    );
  }
}
