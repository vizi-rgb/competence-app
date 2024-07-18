import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { EmployeeProjectTechnologiesComponent } from '../employee-project-technologies/employee-project-technologies.component';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [EmployeeProjectTechnologiesComponent],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss',
})
export class EmployeeProjectComponent {
  @Input({ required: true })
  project!: ProjectModel;
}
