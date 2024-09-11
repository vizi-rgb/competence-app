import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { EMPLOYEE_ROUTE } from '../../../../core/constants/employee-route';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { finalize, map } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EmployeeSearchComponent } from '../../components/employee-search/employee-search.component';
import { MessageService } from '../../../../core/services/message.service';
import { MessageCode } from '../../../../core/constants/message-code.enum';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatRipple,
    DatePipe,
    TranslateModule,
    MatProgressSpinner,
    EmployeeSearchComponent,
    RouterLinkActive,
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss',
})
export class EmployeeDashboardComponent implements OnInit {
  employees: EmployeeModel[] = [];
  locale: string;
  isLoading: boolean = true;

  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.locale = translate.currentLang;
  }

  ngOnInit(): void {
    const nNewestEmployees = 6;

    this.employeeService
      .getAllEmployees()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (allEmployees: EmployeeModel[]) => {
          this.employees = allEmployees
            .sort(
              (a: EmployeeModel, b: EmployeeModel) =>
                new Date(a.dateOfEmployment).valueOf() -
                new Date(b.dateOfEmployment).valueOf()
            )
            .reverse()
            .slice(0, nNewestEmployees);
        },
        error: () => {
          this.messageService.add(MessageCode.GET_ALL_EMPLOYEES_ERROR);
        },
      });

    this.translate.onLangChange
      .pipe(
        map((event: LangChangeEvent) => event.lang),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((lang: string) => (this.locale = lang));
  }
}
