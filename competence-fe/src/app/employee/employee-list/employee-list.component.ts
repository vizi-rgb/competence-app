import { Component } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { EMPLOYEES } from '../../mocks/employees.mock';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  readonly employees: EmployeeModel[] = EMPLOYEES;
  selectedEmployee?: EmployeeModel;

  onEmployeeSelect(employee: EmployeeModel) {
    this.selectedEmployee =
      this.selectedEmployee !== employee ? employee : undefined;
  }
}
