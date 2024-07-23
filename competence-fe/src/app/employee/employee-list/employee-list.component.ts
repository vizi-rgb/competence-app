import { Component } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { EMPLOYEES } from '../../mocks/employees.mock';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup } from '@angular/forms';
import { EmployeeDetailsForm } from '../../forms/employee-details.form';
import { UpdateEmployeeRequest } from '../../dto/employee-dto';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeComponent, EmployeeEditComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  readonly employees: EmployeeModel[] = EMPLOYEES;
  selectedEmployee?: EmployeeModel;
  editEmployeeModeSelected = false;

  constructor(private employeeService: EmployeeService) {}

  onEmployeeSelect(employee: EmployeeModel) {
    this.selectedEmployee =
      this.selectedEmployee !== employee ? employee : undefined;
  }

  onEditEmployeeSelected() {
    this.editEmployeeModeSelected = true;
  }

  onEditCanceled() {
    this.editEmployeeModeSelected = false;
  }

  onEditFormSubmitted(payload: FormGroup<EmployeeDetailsForm>): void {
    if (!this.selectedEmployee) {
      return;
    }

    const formValues = payload.getRawValue();

    const requestData: UpdateEmployeeRequest = {
      name: formValues.name,
      surname: formValues.surname,
      manager: formValues.manager,
      dateOfEmployment: new Date(formValues.dateOfEmployment),
      skills: formValues.skills,
    };

    this.employeeService.updateEmployee(this.selectedEmployee.id, requestData);
    this.editEmployeeModeSelected = false;
  }
}
