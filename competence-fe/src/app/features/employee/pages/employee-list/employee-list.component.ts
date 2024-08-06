import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { TranslateModule } from '@ngx-translate/core';
import { LangSelectorComponent } from '../../../../shared/components/lang-selector/lang-selector.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as EMPLOYEE_ROUTE from '../../../../core/constants/employee-route';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    EmployeeDetailsComponent,
    EmployeeFormComponent,
    TranslateModule,
    LangSelectorComponent,
    AsyncPipe,
    MatFabButton,
    MatIconModule,
    MatMiniFabButton,
    MatButton,
    MatIconButton,
    MatDivider,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  employees$!: Observable<EmployeeModel[]>;
  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getAllEmployees();
  }
}
