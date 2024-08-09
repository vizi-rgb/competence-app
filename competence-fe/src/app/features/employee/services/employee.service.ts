import { Injectable } from '@angular/core';
import { CreateEmployeeRequest } from '../dto/employee-dto';
import { EmployeeModel } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { ProjectModel } from '../models/project.model';
import { MessageService } from '../../../core/services/message.service';
import { MessageCode } from '../../../core/constants/message-code.enum';
import { HttpClient } from '@angular/common/http';
import { EmployeeEndpoints } from './employee.endpoints';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAllEmployees(): Observable<EmployeeModel[]> {
    this.messageService.add(MessageCode.GET_ALL_EMPLOYEES);
    return this.http.get<EmployeeModel[]>(EmployeeEndpoints.GET_EMPLOYEES);
  }

  getEmployeeById(id: string): Observable<EmployeeModel | undefined> {
    return this.http.get<EmployeeModel>(
      `${EmployeeEndpoints.GET_EMPLOYEES}/${id}`
    );
  }

  deleteEmployee(employee: EmployeeModel): Observable<object> {
    const url = `${EmployeeEndpoints.GET_EMPLOYEES}/${employee.id}`;
    return this.http.delete(url);
  }

  searchEmployees(term: string): Observable<EmployeeModel[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<EmployeeModel[]>(
      `${EmployeeEndpoints.GET_EMPLOYEES}/?surname=${term}`
    );
  }

  getAllManagers(): Observable<EmployeeModel[]> {
    this.messageService.add(MessageCode.GET_ALL_MANAGERS);
    return this.http.get<EmployeeModel[]>(EmployeeEndpoints.GET_MANAGERS);
  }

  getAllProjects(): Observable<ProjectModel[]> {
    this.messageService.add(MessageCode.GET_ALL_PROJECTS);
    return this.http.get<ProjectModel[]>(EmployeeEndpoints.GET_PROJECTS);
  }

  updateEmployee(id: string, employee: EmployeeModel): Observable<object> {
    return this.http.put(`${EmployeeEndpoints.GET_EMPLOYEES}/${id}`, employee);
  }

  createEmployee(payload: CreateEmployeeRequest): Observable<object> {
    const newEmployee: EmployeeModel = {
      id: crypto.randomUUID(),
      ...payload,
    };

    return this.http.post(`${EmployeeEndpoints.GET_EMPLOYEES}`, newEmployee);
  }
}
