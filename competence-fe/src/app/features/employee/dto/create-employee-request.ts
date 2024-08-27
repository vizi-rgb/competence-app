import { EmployeeModel } from '../models/employee.model';
import { ProjectModel } from '../models/project.model';

export interface CreateEmployeeRequest {
  name: string;
  surname: string;
  dateOfEmployment: Date;
  manager: EmployeeModel | null;
  skills: string[];
  projects: ProjectModel[];
}
