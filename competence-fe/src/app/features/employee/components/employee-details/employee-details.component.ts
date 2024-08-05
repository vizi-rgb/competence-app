import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
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
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent {
  @Input()
  employee?: EmployeeModel;

  @Output()
  editEmployeeSelected = new EventEmitter<void>();

  onEditClicked() {
    this.editEmployeeSelected.emit();
  }
}
