import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { ProjectModel } from '../../models/project.model';
import { EmployeeModel } from '../../models/employee.model';
import { getValueFromHtmlSelect } from '../../../../shared/util/html-select.util';
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
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    DatePipe,
    EmployeeProjectComponent,
    ReactiveFormsModule,
    TranslateModule,
    LowerCasePipe,
    SkillToTranslationKeyPipe,
    AsyncPipe,
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

  readonly managers$: Observable<EmployeeModel[]>;
  readonly allProjects: ProjectModel[];
  protected readonly isMissing = isMissing;
  protected readonly isModifiedAndInvalid = isModifiedAndInvalid;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private employeeService: EmployeeService
  ) {
    this.form = fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      manager: [null],
      skills: this.fb.nonNullable.array([]),
      projects: this.fb.nonNullable.array([]),
    });

    this.managers$ = this.employeeService.getAllManagers();
    this.allProjects = this.getAllProjects();
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
    const project: ProjectModel | undefined = this.allProjects.find(
      (project: ProjectModel) => project.title === projectTitle
    );
    if (project) {
      this.addProject(project);
    }
  }

  getAvailableSkillWrapper(): SkillTranslation[] {
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

  getAvailableProjectsWrapper(): ProjectModel[] {
    return getAvailableProjectsSorted(
      this.allProjects,
      this.projectsControl.getRawValue()
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
