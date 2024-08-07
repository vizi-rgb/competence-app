import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
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
import * as EMPLOYEE_ROUTES from '../../../../core/constants/employee-route';

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
  employees$!: Observable<EmployeeModel[]>;
  protected readonly EMPLOYEE_ROUTES = EMPLOYEE_ROUTES;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private employeeService: EmployeeService) {}

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
