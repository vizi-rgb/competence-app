import { ProjectModel } from '../models/project.model';
import { Technology } from '../constants/technology.enum';

export const PROJECTS: ProjectModel[] = [
  {
    title: 'Jungle',
    description: 'Tropical fruits delivery system',
    technologies: [Technology.ANGULAR, Technology.JAVA, Technology.SPRING_BOOT],
  },
  {
    title: 'EVO',
    description: 'Software for accountants',
    technologies: [
      Technology.REACT,
      Technology.PHP,
      Technology.LARAVEL,
      Technology.SUPABASE,
    ],
  },
];
