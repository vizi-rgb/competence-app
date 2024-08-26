import { SkillModel } from './skill.model';

export interface ProjectModel {
  title: string;
  description: string;
  technologies: SkillModel[];
}
