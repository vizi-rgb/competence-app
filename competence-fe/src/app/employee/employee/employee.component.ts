import { Component, Input } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { DatePipe, formatDate } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { MANAGERS } from '../../mocks/managers.mock';
import { EmployeeDetailsForm } from '../../forms/employee-details.form';
import { Technology } from '../../constants/technology.enum';
import { SoftSkill } from '../../constants/soft-skill.enum';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    EmployeeProjectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  @Input()
  get employee() {
    return this._employee;
  }

  set employee(employee: EmployeeModel | undefined) {
    if (!employee) return;

    this._employee = employee;
    this.buildForm(employee);
    this.newSkills = [];
  }

  private _employee?: EmployeeModel;
  managers: EmployeeModel[] = MANAGERS;
  employeeForm: FormGroup<EmployeeDetailsForm>;
  newSkills: (Technology | SoftSkill)[] = [];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: [
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        Validators.required,
      ],
      manager: [null as EmployeeModel | null, Validators.required],
      newSkill: null as Technology | SoftSkill | null,
    });

    this.employeeForm.controls.newSkill.valueChanges.subscribe((value) => {
      for (const [key, techValue] of Object.entries(Technology)) {
        if (techValue === value) {
          const selectedTechnology = Technology[key as keyof typeof Technology];
          this.newSkills.push(selectedTechnology);
        }
      }
    });
  }

  getAvailableSkills(): (Technology | SoftSkill)[] {
    const allSkills = Array.of<Technology | SoftSkill>(
      ...Object.values(Technology),
      ...Object.values(SoftSkill)
    );

    const employeeSkills = new Set<Technology | SoftSkill>(
      this.employee?.skills ?? []
    );

    return allSkills.filter((skill) => !employeeSkills.has(skill));
  }

  onFormSubmit(): void {
    if (this.employeeForm.invalid || !this.employee) return;
    this.updateEmployee(this.employee, this.employeeForm);
    this.newSkills = [];
  }

  private buildForm(employee: EmployeeModel): void {
    this.employeeForm.setValue({
      name: employee.name,
      surname: employee.surname,
      dateOfEmployment: formatDate(
        employee.dateOfEmployment,
        'yyyy-MM-dd',
        'en'
      ),
      manager: employee.manager,
      newSkill: null,
    });
  }

  updateEmployee(
    employee: EmployeeModel,
    employeeForm: FormGroup<EmployeeDetailsForm>
  ): void {
    employee.name = employeeForm.value.name!;
    employee.surname = employeeForm.value.surname!;
    employee.dateOfEmployment = new Date(employeeForm.value.dateOfEmployment!);
    employee.manager = employeeForm.value.manager!;
    employee.skills = employee.skills.concat(this.newSkills);
  }
}
