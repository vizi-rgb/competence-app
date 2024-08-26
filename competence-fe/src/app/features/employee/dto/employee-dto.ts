import { EmployeeModel } from '../models/employee.model';
import { ProjectModel } from '../models/project.model';

export interface UpdateEmployeeRequest {
  name: string | null;
  surname: string | null;
  dateOfEmployment: Date | null;
  manager: EmployeeModel | null;
  skills: string[] | null;
  projects: ProjectModel[] | null;
}
