import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { EmployeeModel } from '../../models/employee.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    EmployeeProjectComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
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
