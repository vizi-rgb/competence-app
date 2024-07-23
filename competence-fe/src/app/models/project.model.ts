import { Technology } from '../constants/technology.enum';

export interface ProjectModel {
  title: string;
  description: string;
  technologies: Technology[];
}
