import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    EmployeeProjectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  @Input()
  employee?: EmployeeModel;

  @Output()
  editEmployeeSelected = new EventEmitter<void>();

  onEditClicked() {
    this.editEmployeeSelected.emit();
  }
}
