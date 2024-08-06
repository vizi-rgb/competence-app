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
import { MessageService } from '../../../core/services/message.service';
import { MessageCode } from '../../../core/constants/message-code.enum';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: EmployeeModel[] = EMPLOYEES;

  constructor(private messageService: MessageService) {}

  getAllEmployees(): Observable<EmployeeModel[]> {
    this.messageService.add(MessageCode.GET_ALL_EMPLOYEES);
    return of(EMPLOYEES);
  }

  getEmployeeById(id: string): Observable<EmployeeModel | undefined> {
    const employee: EmployeeModel | undefined = EMPLOYEES.find(
      (employee: EmployeeModel) => employee.id === id
    );
    return of(employee);
  }

  getAllManagers(): Observable<EmployeeModel[]> {
    this.messageService.add(MessageCode.GET_ALL_MANAGERS);
    return of(MANAGERS);
  }

  getAllProjects(): Observable<ProjectModel[]> {
    this.messageService.add(MessageCode.GET_ALL_PROJECTS);
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

    if (payload.skills) {
      employee.skills = payload.skills;
    }

    if (payload.projects) {
      employee.projects = payload.projects;
    }

    employee.manager = payload.manager;
  }
}
