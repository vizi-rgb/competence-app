import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { MANAGERS } from '../../mocks/managers.mock';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import {
  getAvailableProjects,
  getAvailableSkills,
  getValueFromHtmlSelect,
  isMissing,
} from '../../util/employee.util';
import { ProjectModel } from '../../models/project.model';
import { PROJECTS } from '../../mocks/projects.mock';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [EmployeeProjectComponent, ReactiveFormsModule, FormsModule],
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
  formSubmitted = new EventEmitter<FormGroup>();

  private _employee?: EmployeeModel;
  managers: EmployeeModel[] = MANAGERS;
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: [
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        Validators.required,
      ],
      manager: [null],
      skills: this.fb.nonNullable.array([]),
      projects: this.fb.nonNullable.array([]),
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

  get projects() {
    return this.employeeForm.get('projects') as FormArray;
  }

  deleteSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addSkill(skill: string): void {
    this.skills.push(this.fb.nonNullable.control(skill));
  }

  deleteProject(index: number): void {
    this.projects.removeAt(index);
  }

  addProject(project: ProjectModel): void {
    this.projects.push(this.fb.nonNullable.control(project));
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.employeeForm);
  }

  onCancelClicked(): void {
    this.editCanceled.emit();
  }

  onSkillSelect(event: Event): void {
    const skill: string = getValueFromHtmlSelect(event);
    this.addSkill(skill);
  }

  onProjectSelect(event: Event): void {
    const projectTitle: string = getValueFromHtmlSelect(event);
    const project: ProjectModel | undefined = PROJECTS.find(
      (project: ProjectModel) => project.title === projectTitle
    );

    if (project) {
      this.addProject(project);
    }
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

    this.employeeForm.setControl(
      'projects',
      this.fb.nonNullable.array(employee.projects)
    );
  }

  protected readonly getAvailableSkills = getAvailableSkills;
  protected readonly isMissing = isMissing;
  protected readonly getAvailableProjects = getAvailableProjects;
}
