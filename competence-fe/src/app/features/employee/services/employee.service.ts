import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { ProjectModel } from '../models/project.model';
import { MessageService } from '../../../core/services/message.service';
import { MessageCode } from '../../../core/constants/message-code.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmployeeEndpoints } from './employee.endpoints';
import { SkillModel } from '../models/skill.model';
import { UpdateEmployeeRequest } from '../dto/update-employee-request';
import { CreateEmployeeRequest } from '../dto/create-employee-request';

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

  getAvailableManagers(id: string): Observable<EmployeeModel[]> {
    this.messageService.add(MessageCode.GET_ALL_MANAGERS);
    const endpoint = `${EmployeeEndpoints.GET_EMPLOYEES}/${id}/${EmployeeEndpoints.GET_MANAGERS}`;
    return this.http.get<EmployeeModel[]>(endpoint);
  }

  deleteEmployee(employee: EmployeeModel): Observable<object> {
    const url = `${EmployeeEndpoints.GET_EMPLOYEES}/${employee.id}`;
    return this.http.delete(url);
  }

  searchEmployees(term: string): Observable<EmployeeModel[]> {
    if (!term.trim()) {
      return of([]);
    }

    const stringArray: string[] = term.split(/\s+/);

    let params: HttpParams = new HttpParams().set('name', stringArray[0]);

    if (stringArray.length > 1) {
      params = params.set('surname', stringArray[1]);
    }

    return this.http.get<EmployeeModel[]>(
      `${EmployeeEndpoints.SEARCH_EMPLOYEES}`,
      { params: params }
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

  getAllSkills(): Observable<SkillModel[]> {
    return this.http.get<SkillModel[]>(EmployeeEndpoints.GET_SKILLS);
  }

  updateEmployee(
    id: string,
    employee: UpdateEmployeeRequest
  ): Observable<object> {
    console.log(employee.dateOfEmployment);
    return this.http.put(`${EmployeeEndpoints.GET_EMPLOYEES}/${id}`, employee);
  }

  createEmployee(employee: CreateEmployeeRequest): Observable<object> {
    return this.http.post(`${EmployeeEndpoints.GET_EMPLOYEES}`, employee);
  }
}
