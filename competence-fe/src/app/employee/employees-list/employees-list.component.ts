import { Component } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { EMPLOYEES } from '../../mocks/employees.mock';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  readonly employees: EmployeeModel[] = EMPLOYEES;
  selectedEmployee?: EmployeeModel;

  onEmployeeSelect(employee: EmployeeModel) {
    if (this.selectedEmployee === employee) {
      this.selectedEmployee = undefined;
    } else {
      this.selectedEmployee = employee;
    }
  }
}
