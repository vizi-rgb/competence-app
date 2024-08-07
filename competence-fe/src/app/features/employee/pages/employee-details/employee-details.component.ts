import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeProjectComponent } from '../../components/employee-project/employee-project.component';
import { EmployeeModel } from '../../models/employee.model';
import { TranslateModule } from '@ngx-translate/core';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EDIT } from '../../../../core/constants/employee-route';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employee?: EmployeeModel;

  protected readonly EDIT = EDIT;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employee: EmployeeModel | undefined) => {
        this.employee = employee;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
