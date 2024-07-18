import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-project-technologies',
  standalone: true,
  imports: [],
  templateUrl: './employee-project-technologies.component.html',
  styleUrl: './employee-project-technologies.component.scss',
})
export class EmployeeProjectTechnologiesComponent {
  @Input({ required: true })
  technologies!: string[];
}
