import { SkillModel } from '../models/skill.model';
import { ProjectModel } from '../models/project.model';

export interface UpdateEmployeeRequest {
  name: string;
  surname: string;
  dateOfEmployment: Date;
  managerId: string | null;
  skills: SkillModel[];
  projects: ProjectModel[];
}
