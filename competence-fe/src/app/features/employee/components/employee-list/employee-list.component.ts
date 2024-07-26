import { Component, inject } from '@angular/core';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { FormGroup } from '@angular/forms';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeModel } from '../../models/employee.model';
import { EMPLOYEES } from '../../../../mocks/employees.mock';
import { EmployeeService } from '../../services/employee.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangSelectorComponent } from '../../../../shared/components/lang-selector/lang-selector.component';

enum Mode {
  VIEW,
  EDIT,
  ADD,
  NONE,
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    TranslateModule,
    LangSelectorComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  readonly employees: EmployeeModel[] = EMPLOYEES;
  selectedEmployee?: EmployeeModel;
  selectedMode: Mode = Mode.NONE;
  protected readonly Mode = Mode;
  private cnt = 0;

  constructor(
    private employeeService: EmployeeService,
    private translate: TranslateService
  ) {}

  change() {
    const langs = ['en', 'pl'];
    this.translate.use(langs[this.cnt++ % 2]);
  }

  onEmployeeSelect(employee: EmployeeModel): void {
    const isSameEmployee: boolean =
      this.selectedEmployee != null && this.selectedEmployee === employee;

    const isOnViewMode: boolean = this.selectedMode === Mode.VIEW;

    if (isSameEmployee && isOnViewMode) {
      this.selectedEmployee = undefined;
      this.selectedMode = Mode.NONE;
    } else {
      this.selectedEmployee = employee;
      this.selectedMode = Mode.VIEW;
    }
  }

  onAddEmployeeSelected(): void {
    if (this.selectedMode === Mode.ADD) {
      this.selectedMode = this.selectedEmployee ? Mode.VIEW : Mode.NONE;
    } else {
      this.selectedMode = Mode.ADD;
    }
  }

  onAddEmployeeCanceled(): void {
    this.selectedMode = this.selectedEmployee ? Mode.VIEW : Mode.NONE;
  }

  onAddEmployeeSubmitted(form: FormGroup): void {
    const values = form.getRawValue();
    this.employeeService.createEmployee(values);
  }

  onEditEmployeeSelected(): void {
    this.selectedMode = Mode.EDIT;
  }

  onEditCanceled(): void {
    this.selectedMode = Mode.VIEW;
  }

  onEditFormSubmitted(payload: FormGroup): void {
    if (!this.selectedEmployee) {
      return;
    }

    const formValues = payload.getRawValue();

    this.employeeService.updateEmployee(this.selectedEmployee.id, formValues);
    this.selectedMode = Mode.VIEW;
  }

  protected readonly inject = inject;
  protected readonly TranslateModule = TranslateModule;
  protected readonly TranslateService = TranslateService;
}
