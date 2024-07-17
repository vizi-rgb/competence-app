import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { Project } from '../../models/project';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { EmployeeSkillsComponent } from '../employee-skills/employee-skills.component';
import { EmployeeProjectComponent } from '../employee-project/employee-project.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    FormsModule,
    NgIf,
    EmployeeSkillsComponent,
    EmployeeProjectComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  project: Project = {
    title: 'Jungle',
    description: 'Tropical fruits delivery system',
    technologies: ['Angular', 'Java', 'Spring Boot'],
  };

  secondProject: Project = {
    title: 'EVO',
    description: 'Software for accountants',
    technologies: ['React', 'PHP', 'Laravel', 'Supabase'],
  };

  manager: Employee = {
    id: 'c418f5fd-5c5a-4fa6-ac38-9501aa02cbbd',
    name: 'Thierry',
    surname: 'Henry',
    dateOfEmployment: new Date(2000, 6, 1),
    manager: null,
    skills: ['Managing projects', 'Interpersonal skills'],
    projects: [this.project],
  };

  secondManager: Employee = {
    id: '90e9887b-cb4a-49fb-9431-0f28cf7443f8',
    name: 'Cristiano',
    surname: 'Ronaldo',
    dateOfEmployment: new Date(2003, 6, 1),
    manager: null,
    skills: ['Managing projects', 'Interpersonal skills'],
    projects: [this.project],
  };

  managers: Employee[] = [this.manager, this.secondManager];

  employee: Employee = {
    id: '1ac6627c-4f39-45a0-b3a9-8edd59c8a8bc',
    name: 'John',
    surname: 'Doe',
    dateOfEmployment: new Date(2022, 6, 2),
    manager: this.manager,
    skills: [
      'Angular',
      'Java',
      'Spring boot',
      'ChatGPT',
      'Twitter',
      'Kafka',
      'Terraform',
    ],
    projects: [this.project, this.secondProject],
  };

  onDateOfEmploymentChange(date: string) {
    const newDate: Date = new Date(date);

    if (isValidDate(newDate)) {
      this.employee!.dateOfEmployment = newDate;
    }
  }
}
