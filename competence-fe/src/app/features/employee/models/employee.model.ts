import { ProjectModel } from './project.model';

export interface EmployeeModel {
  id: string;
  name: string;
  surname: string;
  dateOfEmployment: Date;
  manager: EmployeeModel | null;
  skills: string[];
  projects: ProjectModel[];
}
