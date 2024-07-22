import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss',
})
export class EmployeeProjectComponent {
  @Input({ required: true })
  project!: ProjectModel;
}
