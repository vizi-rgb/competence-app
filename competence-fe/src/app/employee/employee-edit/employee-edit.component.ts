import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { MANAGERS } from '../../mocks/managers.mock';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeDetailsForm } from '../../forms/employee-details.form';
import { Technology } from '../../constants/technology.enum';
import { SoftSkill } from '../../constants/soft-skill.enum';
import { formatDate } from '@angular/common';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [EmployeeProjectComponent, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent {
  @Input()
  set employee(employee: EmployeeModel | undefined) {
    if (!employee) return;

    this._employee = employee;
    this.updateForm(employee);
  }

  get employee() {
    return this._employee;
  }

  @Output()
  editCanceled = new EventEmitter<void>();

  @Output()
  formSubmitted = new EventEmitter<FormGroup<EmployeeDetailsForm>>();

  private _employee?: EmployeeModel;
  managers: EmployeeModel[] = MANAGERS;
  employeeForm: FormGroup<EmployeeDetailsForm>;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: [
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        Validators.required,
      ],
      manager: [null as EmployeeModel | null, Validators.required],
      skills: this.fb.nonNullable.array([
        Technology.PHP,
        SoftSkill.MANAGING_PROJECTS,
      ]),
    });
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get surname() {
    return this.employeeForm.get('surname');
  }

  get dateOfEmployment() {
    return this.employeeForm.get('dateOfEmployment');
  }

  get manager() {
    return this.employeeForm.get('manager');
  }

  get skills() {
    return this.employeeForm.get('skills') as FormArray;
  }

  deleteSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addSkill(skill: string): void {
    for (const [key, techValue] of Object.entries(Technology)) {
      if (techValue === skill) {
        const selectedTechnology = Technology[key as keyof typeof Technology];
        console.log(selectedTechnology);
        this.skills.push(this.fb.nonNullable.control(selectedTechnology));
      }
    }
  }

  getAvailableSkills(): (Technology | SoftSkill)[] {
    const allSkills = Array.of<Technology | SoftSkill>(
      ...Object.values(Technology),
      ...Object.values(SoftSkill)
    );

    const employeeSkills = new Set<Technology | SoftSkill>(
      this.skills.getRawValue()
    );

    return allSkills.filter((skill) => !employeeSkills.has(skill));
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.employeeForm);
  }

  onCancelClicked(): void {
    this.editCanceled.emit();
  }

  onSkillSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    console.log(selectElement);
    this.addSkill(selectElement.value);
  }

  protected isMissing(field: AbstractControl | null): boolean {
    return (field?.invalid && field?.hasError('required')) ?? false;
  }

  private updateForm(employee: EmployeeModel): void {
    this.employeeForm.patchValue({
      name: employee.name,
      surname: employee.surname,
      dateOfEmployment: formatDate(
        employee.dateOfEmployment,
        'yyyy-MM-dd',
        'en'
      ),
      manager: employee.manager,
    });

    this.employeeForm.setControl(
      'skills',
      this.fb.nonNullable.array(employee.skills)
    );
  }
}
