import { ProjectModel } from './project.model';
import { Technology } from '../constants/technology.enum';
import { SoftSkill } from '../constants/soft-skill.enum';

export interface EmployeeModel {
  id: string;
  name: string;
  surname: string;
  dateOfEmployment: Date;
  manager: EmployeeModel | null;
  skills: (Technology | SoftSkill)[];
  projects: ProjectModel[];
}
