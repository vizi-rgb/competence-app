import { Component, Input } from '@angular/core';
import { EmployeeModel } from '../../models/employee.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { EmployeeSkillsComponent } from '../employee-skills/employee-skills.component';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';
import { MANAGERS } from '../../mocks/managers.mock';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    EmployeeSkillsComponent,
    EmployeeProjectComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  @Input()
  employee?: EmployeeModel;

  managers: EmployeeModel[] = MANAGERS;

  onDateOfEmploymentChange(date: string) {
    const newDate: Date = new Date(date);

    if (isValidDate(newDate) && this.employee) {
      this.employee.dateOfEmployment = newDate;
    }
  }
}
