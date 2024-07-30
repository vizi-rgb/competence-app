import { Injectable } from '@angular/core';
import {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from '../dto/employee-dto';
import { EmployeeModel } from '../models/employee.model';
import { EMPLOYEES } from '../../../mocks/employees.mock';
import { Observable, of } from 'rxjs';
import { MANAGERS } from '../../../mocks/managers.mock';
import { ProjectModel } from '../models/project.model';
import { PROJECTS } from '../../../mocks/projects.mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: EmployeeModel[] = EMPLOYEES;

  getAllEmployees(): Observable<EmployeeModel[]> {
    return of(EMPLOYEES);
  }

  getAllManagers(): Observable<EmployeeModel[]> {
    return of(MANAGERS);
  }

  getAllProjects(): Observable<ProjectModel[]> {
    return of(PROJECTS);
  }

  updateEmployee(id: string, payload: UpdateEmployeeRequest): void {
    const employee: EmployeeModel | undefined = this.employees.find(
      (employee: EmployeeModel) => employee.id === id
    );

    if (!employee) {
      throw new Error('Employee not found');
    }

    this.doPartialUpdateOnEmployee(employee, payload);
  }

  createEmployee(payload: CreateEmployeeRequest): void {
    const newEmployee: EmployeeModel = {
      id: crypto.randomUUID(),
      ...payload,
    };

    EMPLOYEES.push(newEmployee);
  }

  private doPartialUpdateOnEmployee(
    employee: EmployeeModel,
    payload: UpdateEmployeeRequest
  ): void {
    if (payload.name) {
      employee.name = payload.name;
    }

    if (payload.surname) {
      employee.surname = payload.surname;
    }

    if (payload.dateOfEmployment) {
      employee.dateOfEmployment = payload.dateOfEmployment;
    }

    if (payload.manager) {
      employee.manager = payload.manager;
    }

    if (payload.skills) {
      employee.skills = payload.skills;
    }

    if (payload.projects) {
      employee.projects = payload.projects;
    }
  }
}
