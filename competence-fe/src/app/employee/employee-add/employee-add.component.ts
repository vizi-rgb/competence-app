import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { EmployeeModel } from '../../models/employee.model';
import { MANAGERS } from '../../mocks/managers.mock';
import {
  getAvailableProjects,
  getAvailableSkills,
  getValueFromHtmlSelect,
  isMissing,
  isModifiedAndInvalid,
} from '../../util/employee.util';
import { ProjectModel } from '../../models/project.model';
import { PROJECTS } from '../../mocks/projects.mock';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [DatePipe, EmployeeProjectComponent, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  @Output()
  canceled = new EventEmitter<void>();

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form: FormGroup;
  managers: EmployeeModel[] = MANAGERS;

  constructor(private fb: FormBuilder) {
    this.form = fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      manager: [null],
      skills: this.fb.nonNullable.array([]),
      projects: this.fb.nonNullable.array([]),
    });
  }

  get name() {
    return this.form.get('name');
  }

  get surname() {
    return this.form.get('surname');
  }

  get dateOfEmployment() {
    return this.form.get('dateOfEmployment');
  }

  get manager() {
    return this.form.get('manager');
  }

  get skills() {
    return this.form.get('skills') as FormArray;
  }

  get projects() {
    return this.form.get('projects') as FormArray;
  }

  onSubmit(): void {
    this.submitted.emit(this.form);
    this.onClear();
  }

  onCancel(): void {
    this.canceled.emit();
  }

  onClear(): void {
    this.form.reset();
    this.skills.clear();
    this.projects.clear();
  }

  addSkill(skill: string): void {
    this.skills.push(this.fb.nonNullable.control(skill));
  }

  deleteSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSkillSelect(event: Event): void {
    const skill: string = getValueFromHtmlSelect(event);
    this.addSkill(skill);
  }

  addProject(project: ProjectModel): void {
    this.projects.push(this.fb.nonNullable.control(project));
  }

  deleteProject(index: number): void {
    this.projects.removeAt(index);
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

  protected readonly getAvailableSkills = getAvailableSkills;
  protected readonly isMissing = isMissing;
  protected readonly isModifiedAndInvalid = isModifiedAndInvalid;
  protected readonly getAvailableProjects = getAvailableProjects;
}
