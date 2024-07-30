import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, formatDate } from '@angular/common';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { EmployeeModel } from '../../models/employee.model';
import {
  getAvailableProjectsSorted,
  getAvailableSkillsSorted,
  SkillTranslation,
} from '../../../../shared/util/employee.util';
import { isMissing } from '../../../../shared/util/validation.util';
import { getValueFromHtmlSelect } from '../../../../shared/util/html-select.util';
import { ProjectModel } from '../../models/project.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillToTranslationKeyPipe } from '../../pipes/skill-to-translation-key.pipe';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Technology,
  TechnologyKey,
} from '../../../../core/constants/technology.enum';
import {
  SoftSkill,
  SoftSkillKey,
} from '../../../../core/constants/soft-skill.enum';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    EmployeeProjectComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SkillToTranslationKeyPipe,
    AsyncPipe,
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

  employeeForm: FormGroup;

  readonly managers$: Observable<EmployeeModel[]>;
  readonly allProjects: ProjectModel[];
  protected readonly isMissing = isMissing;

  private _employee?: EmployeeModel;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private employeeService: EmployeeService
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

    this.managers$ = this.employeeService.getAllManagers();
    this.allProjects = this.getAllProjects();
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
    const project: ProjectModel | undefined = this.allProjects.find(
      (project: ProjectModel) => project.title === projectTitle
    );

    if (project) {
      this.addProject(project);
    }
  }

  getAvailableProjectsWrapper(): ProjectModel[] {
    return getAvailableProjectsSorted(
      this.allProjects,
      this.projectsControl.getRawValue()
    );
  }

  getAvailableSkillsWrapper(): SkillTranslation[] {
    const allSkills: (SoftSkillKey | TechnologyKey)[] = [
      ...(Object.keys(Technology) as TechnologyKey[]),
      ...(Object.keys(SoftSkill) as SoftSkillKey[]),
    ];

    return getAvailableSkillsSorted(
      allSkills,
      this.skillsControl.getRawValue(),
      this.translate
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

  private getAllProjects(): ProjectModel[] {
    let allProjects: ProjectModel[] = [];
    this.employeeService
      .getAllProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value: ProjectModel[]) => (allProjects = value),
        error: (err) => console.log(err),
      });

    return allProjects;
  }
}
