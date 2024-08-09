import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EMPLOYEES } from '../../../mocks/employees.mock';
import { PROJECTS } from '../../../mocks/projects.mock';
import { MANAGERS } from '../../../mocks/managers.mock';
import { EmployeeModel } from '../models/employee.model';
import { ProjectModel } from '../models/project.model';
import { Technology } from '../../../core/constants/technology.enum';
import { SoftSkill } from '../../../core/constants/soft-skill.enum';

@Injectable({
  providedIn: 'root',
})
export class InMemoryEmployeeServiceService implements InMemoryDbService {
  createDb() {
    const employees: EmployeeModel[] = EMPLOYEES;
    const projects: ProjectModel[] = PROJECTS;
    const managers: EmployeeModel[] = MANAGERS;
    const skills: string[] = [
      ...Object.keys(Technology),
      ...Object.keys(SoftSkill),
    ];
    return { employees, projects, managers, skills };
  }
}
