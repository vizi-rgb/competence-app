import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { ProjectModel } from '../../models/project.model';
import { EmployeeModel } from '../../models/employee.model';
import { MANAGERS } from '../../../../mocks/managers.mock';
import { getValueFromHtmlSelect } from '../../../../shared/util/html-select.util';
import { PROJECTS } from '../../../../mocks/projects.mock';
import {
  getAvailableProjectsSorted,
  getAvailableSkillsSorted,
  SkillTranslation,
} from '../../../../shared/util/employee.util';
import {
  isMissing,
  isModifiedAndInvalid,
} from '../../../../shared/util/validation.util';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillToTranslationKeyPipe } from '../../pipes/skill-to-translation-key.pipe';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    DatePipe,
    EmployeeProjectComponent,
    ReactiveFormsModule,
    TranslateModule,
    LowerCasePipe,
    SkillToTranslationKeyPipe,
  ],
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

  protected readonly isMissing = isMissing;
  protected readonly isModifiedAndInvalid = isModifiedAndInvalid;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.form = fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      manager: [null],
      skills: this.fb.nonNullable.array([]),
      projects: this.fb.nonNullable.array([]),
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  get surnameControl() {
    return this.form.get('surname');
  }

  get dateOfEmploymentControl() {
    return this.form.get('dateOfEmployment');
  }

  get managerControl() {
    return this.form.get('manager');
  }

  get skillsControl() {
    return this.form.get('skills') as FormArray;
  }

  get projectsControl() {
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
    this.skillsControl.clear();
    this.projectsControl.clear();
  }

  addSkill(skill: string): void {
    this.skillsControl.push(this.fb.nonNullable.control(skill));
  }

  deleteSkill(index: number): void {
    this.skillsControl.removeAt(index);
  }

  onSkillSelect(event: Event): void {
    const skill: string = getValueFromHtmlSelect(event);
    this.addSkill(skill);
  }

  addProject(project: ProjectModel): void {
    this.projectsControl.push(this.fb.nonNullable.control(project));
  }

  deleteProject(index: number): void {
    this.projectsControl.removeAt(index);
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

  getAvailableSkillWrapper(): SkillTranslation[] {
    return getAvailableSkillsSorted(
      this.skillsControl.getRawValue(),
      this.translate
    );
  }

  getAvailableProjectsWrapper(): ProjectModel[] {
    return getAvailableProjectsSorted(this.projectsControl.getRawValue());
  }
}
