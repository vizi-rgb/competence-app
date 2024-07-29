import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { EmployeeModel } from '../../models/employee.model';
import { MANAGERS } from '../../../../mocks/managers.mock';
import {
  getAvailableProjects,
  getAvailableSkills,
  getSkillsTranslations,
  SkillTranslation,
} from '../../../../shared/util/employee.util';
import { isMissing } from '../../../../shared/util/validation.util';
import { getValueFromHtmlSelect } from '../../../../shared/util/html-select.util';
import { ProjectModel } from '../../models/project.model';
import { PROJECTS } from '../../../../mocks/projects.mock';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillToTranslationKeyPipe } from '../../../../skill-to-translation-key.pipe';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    EmployeeProjectComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SkillToTranslationKeyPipe,
  ],
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

  managers: EmployeeModel[] = MANAGERS;
  employeeForm: FormGroup;

  protected readonly isMissing = isMissing;

  private _employee?: EmployeeModel;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
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

  get nameControl() {
    return this.employeeForm.get('name');
  }

  get surnameControl() {
    return this.employeeForm.get('surname');
  }

  get dateOfEmploymentControl() {
    return this.employeeForm.get('dateOfEmployment');
  }

  get managerControl() {
    return this.employeeForm.get('manager');
  }

  get skillsControl() {
    return this.employeeForm.get('skills') as FormArray;
  }

  get projectsControl() {
    return this.employeeForm.get('projects') as FormArray;
  }

  deleteSkill(index: number): void {
    this.skillsControl.removeAt(index);
  }

  addSkill(skill: string): void {
    this.skillsControl.push(this.fb.nonNullable.control(skill));
  }

  deleteProject(index: number): void {
    this.projectsControl.removeAt(index);
  }

  addProject(project: ProjectModel): void {
    this.projectsControl.push(this.fb.nonNullable.control(project));
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

  getAvailableProjectsWrapper(): ProjectModel[] {
    return getAvailableProjects(this.projectsControl.getRawValue()).sort(
      (a: ProjectModel, b: ProjectModel) => a.title.localeCompare(b.title)
    );
  }

  getAvailableSkillsWrapper(): SkillTranslation[] {
    const availableSkill: string[] = getAvailableSkills(
      this.skillsControl.getRawValue()
    );

    const localeSkills = getSkillsTranslations(availableSkill, this.translate);

    return localeSkills.sort((a: SkillTranslation, b: SkillTranslation) =>
      a.skillValue.localeCompare(b.skillValue)
    );
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
}
