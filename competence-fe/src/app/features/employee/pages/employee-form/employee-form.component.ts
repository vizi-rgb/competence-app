import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, Location } from '@angular/common';
import { EmployeeProjectComponent } from '../../components/employee-project/employee-project.component';
import { EmployeeModel } from '../../models/employee.model';
import {
  getAvailableProjectsSorted,
  getAvailableSkillsSorted,
  SkillTranslation,
} from '../../../../shared/util/employee.util';
import {
  isMissing,
  isModifiedAndInvalid,
} from '../../../../shared/util/validation.util';
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
import { MessageService } from '../../../../core/services/message.service';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import {
  MatChipGrid,
  MatChipListbox,
  MatChipOption,
  MatChipRemove,
  MatChipRow,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MessageCode } from '../../../../core/constants/message-code.enum';
import { MatDivider } from '@angular/material/divider';
import { isMoment, Moment } from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    EmployeeProjectComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SkillToTranslationKeyPipe,
    AsyncPipe,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatButton,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatChipListbox,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatChipOption,
    MatDivider,
    MatProgressSpinner,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  set employee(employee: EmployeeModel | undefined) {
    if (!employee) return;

    this._employee = employee;
    this.updateForm(employee);
  }

  get employee() {
    return this._employee;
  }

  @ViewChild('projectsListbox')
  projectsListbox!: MatChipListbox;

  @ViewChild('skillsListbox')
  skillsListbox!: MatChipListbox;

  employeeForm: FormGroup;
  allProjects: ProjectModel[] = [];
  allSkills: string[] = [];
  managers$!: Observable<EmployeeModel[]>;

  protected readonly isMissing = isMissing;
  protected readonly isModifiedAndInvalid = isModifiedAndInvalid;

  private _employee?: EmployeeModel;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      manager: [null],
      skills: this.fb.nonNullable.array([]),
      projects: this.fb.nonNullable.array([]),
    });
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getEmployee(id);
    }

    this.managers$ = this.employeeService.getAllManagers();
    this.getAllProjects();
    this.getAllSkills();
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

  getEmployee(id: string): void {
    this.employeeService
      .getEmployeeById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employee: EmployeeModel | undefined) => {
        this.employee = employee;
      });
  }

  deleteSkill(skillKey: string): void {
    const index: number = this.skillsControl.getRawValue().indexOf(skillKey);
    this.skillsControl.removeAt(index);
  }

  addSkill(skill: string): void {
    this.skillsControl.push(this.fb.nonNullable.control(skill));
  }

  deleteProject(project: ProjectModel): void {
    const index: number = this.projectsControl.getRawValue().indexOf(project);
    this.projectsControl.removeAt(index);
  }

  addProject(project: ProjectModel): void {
    this.projectsControl.push(this.fb.nonNullable.control(project));
  }

  onSubmit(): void {
    const dateValue: Date | Moment = this.dateOfEmploymentControl?.value;
    const date: Date = this.convertMomentToDate(dateValue);

    this.employeeForm.patchValue({
      dateOfEmployment: date,
    });

    if (this.employee) {
      this.employeeService.updateEmployee(
        this.employee.id,
        this.employeeForm.getRawValue()
      );
    } else {
      this.employeeService.createEmployee(this.employeeForm.getRawValue());
    }

    this.goBack();
  }

  onCancelClicked(): void {
    this.goBack();
  }

  onClear(): void {
    this.employeeForm.reset();
    this.skillsControl.clear();
    this.projectsControl.clear();
    this.projectsListbox.writeValue([]);
    this.skillsListbox.writeValue([]);
  }

  onSkillSelect(skillKey: string, event: MatChipSelectionChange): void {
    if (!event.isUserInput) {
      return;
    }

    if (event.selected) {
      this.addSkill(skillKey);
    } else {
      this.deleteSkill(skillKey);
    }
  }

  isInEmployeeSkills(skillKey: string): boolean {
    const skillsSet: Set<string> = new Set<string>(this.employee?.skills);

    return skillsSet.has(skillKey);
  }

  isInEmployeeProjects(projectTitle: string): boolean {
    const projectsSet: Set<string> = new Set<string>(
      this.employee?.projects.map((project: ProjectModel) => project.title)
    );

    return projectsSet.has(projectTitle);
  }

  onProjectSelect(project: ProjectModel, event: MatChipSelectionChange): void {
    if (!event.isUserInput) {
      return;
    }

    if (event.selected) {
      this.addProject(project);
    } else {
      this.deleteProject(project);
    }
  }

  getAvailableProjectsWrapper(): ProjectModel[] {
    return getAvailableProjectsSorted(this.allProjects, []);
  }

  getAvailableSkillsWrapper(): SkillTranslation[] {
    return getAvailableSkillsSorted(
      this.allSkills as (SoftSkillKey | TechnologyKey)[],
      [],
      this.translate
    );
  }

  goBack(): void {
    this.location.back();
  }

  managersCompareFn(a: EmployeeModel, b: EmployeeModel): boolean {
    return a.id === b.id;
  }

  private updateForm(employee: EmployeeModel): void {
    this.employeeForm.patchValue({
      name: employee.name,
      surname: employee.surname,
      dateOfEmployment: employee.dateOfEmployment,
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

  private getAllSkills(): void {
    this.allSkills = [...Object.keys(Technology), ...Object.keys(SoftSkill)];
  }

  private getAllProjects(): void {
    this.employeeService
      .getAllProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value: ProjectModel[]) => (this.allProjects = value),
        error: (err) => {
          this.messageService.add(MessageCode.GET_ALL_PROJECTS_ERROR);
          console.log(err);
        },
        complete: () =>
          this.messageService.add(MessageCode.GET_ALL_PROJECTS_SUCCESS),
      });
  }

  private convertMomentToDate(value: Date | Moment): Date {
    if (isMoment(value)) {
      return (value as Moment).toDate();
    }

    return value;
  }
}
