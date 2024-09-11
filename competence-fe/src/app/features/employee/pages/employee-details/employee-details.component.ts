import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeProjectComponent } from '../../components/employee-project/employee-project.component';
import { EmployeeModel } from '../../models/employee.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkillToTranslationKeyPipe } from '../../pipes/skill-to-translation-key.pipe';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMPLOYEE_ROUTE } from '../../../../core/constants/employee-route';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MessageService } from '../../../../core/services/message.service';
import { MessageCode } from '../../../../core/constants/message-code.enum';
import { finalize } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    EmployeeProjectComponent,
    ReactiveFormsModule,
    TranslateModule,
    SkillToTranslationKeyPipe,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatChipSet,
    MatChip,
    MatCardActions,
    MatButton,
    RouterLink,
    AsyncPipe,
    MatProgressSpinner,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employee?: EmployeeModel;
  isLoading: boolean = true;

  @ViewChild('dialog')
  matDialog!: TemplateRef<MatDialog>;

  protected readonly EMPLOYEE_ROUTE = EMPLOYEE_ROUTE;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private _snackBar = inject(MatSnackBar);
  private snackBarErrorMsgKey =
    'employee.details.snackbar.deletionErrorMessage';
  private snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 5000,
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private translate: TranslateService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEmployee(id);
    }
  }

  getEmployee(id: string): void {
    this.employeeService
      .getEmployeeById(id)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (employee: EmployeeModel | undefined) =>
          (this.employee = employee),
        error: () =>
          this.messageService.add(MessageCode.GET_EMPLOYEE_BY_ID_ERROR),
      });
  }

  onDeleteClicked(): void {
    this.dialog.open(this.matDialog);
  }

  deleteEmployee(employee: EmployeeModel): void {
    this.employeeService.deleteEmployee(employee).subscribe({
      complete: () => this.router.navigate([EMPLOYEE_ROUTE.LIST]),
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.MethodNotAllowed) {
          this.translate
            .get(this.snackBarErrorMsgKey)
            .subscribe((res: string) => {
              this._snackBar.open(res, undefined, this.snackBarConfig);
            });
        }

        this.messageService.add(MessageCode.DELETE_EMPLOYEE_ERROR);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
