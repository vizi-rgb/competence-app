import { Injectable } from '@angular/core';
import { EmployeeModel } from '../../features/employee/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class TextTransformationService {
  getEmployeeUpperCase(employee: EmployeeModel): string {
    return this.getEmployeeToString(employee).toUpperCase();
  }

  getEmployeeLowerCase(employee: EmployeeModel): string {
    return this.getEmployeeToString(employee).toLowerCase();
  }

  getEmployeeToString(employee: EmployeeModel): string {
    return `${employee.name} ${employee.surname}`;
  }
}
