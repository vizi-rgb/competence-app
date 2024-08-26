import { ProjectModel } from './project.model';
import { SkillModel } from './skill.model';

export interface EmployeeModel {
  id: string;
  name: string;
  surname: string;
  dateOfEmployment: Date;
  manager: EmployeeModel | null;
  skills: SkillModel[];
  projects: ProjectModel[];
}
