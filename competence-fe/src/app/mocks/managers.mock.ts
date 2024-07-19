import { PROJECTS } from './projects.mock';
import { EmployeeModel } from '../models/employee.model';

export const MANAGERS: EmployeeModel[] = [
  {
    id: 'c418f5fd-5c5a-4fa6-ac38-9501aa02cbbd',
    name: 'Thierry',
    surname: 'Henry',
    dateOfEmployment: new Date(2000, 6, 1),
    manager: null,
    skills: ['Managing projects', 'Interpersonal skills'],
    projects: [PROJECTS[0]!],
  },
  {
    id: '90e9887b-cb4a-49fb-9431-0f28cf7443f8',
    name: 'Cristiano',
    surname: 'Ronaldo',
    dateOfEmployment: new Date(2003, 6, 1),
    manager: null,
    skills: ['Managing projects', 'Interpersonal skills'],
    projects: [PROJECTS[0]!],
  },
];
