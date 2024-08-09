import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EMPLOYEES } from '../../../mocks/employees.mock';
import { PROJECTS } from '../../../mocks/projects.mock';
import { MANAGERS } from '../../../mocks/managers.mock';
import { EmployeeModel } from '../models/employee.model';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryEmployeeServiceService implements InMemoryDbService {
  createDb() {
    const employees: EmployeeModel[] = EMPLOYEES;
    const projects: ProjectModel[] = PROJECTS;
    const managers: EmployeeModel[] = MANAGERS;
    return { employees, projects, managers };
  }
}
