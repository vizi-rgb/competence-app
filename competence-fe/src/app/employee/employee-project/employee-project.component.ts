import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Project } from '../../models/project';
import { EmployeeProjectTechnologiesComponent } from '../employee-project-technologies/employee-project-technologies.component';

@Component({
  selector: 'app-employee-project',
  standalone: true,
  imports: [NgForOf, EmployeeProjectTechnologiesComponent],
  templateUrl: './employee-project.component.html',
  styleUrl: './employee-project.component.scss',
})
export class EmployeeProjectComponent {
  @Input({ required: true })
  project!: Project;
}
