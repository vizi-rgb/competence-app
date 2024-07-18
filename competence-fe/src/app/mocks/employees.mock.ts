import { EmployeeModel } from '../models/employee.model';
import { PROJECTS } from './projects.mock';
import { MANAGERS } from './managers.mock';

const defaultManager: EmployeeModel = MANAGERS.at(0)!;

export const EMPLOYEES: EmployeeModel[] = [
  {
    id: '1ac6627c-4f39-45a0-b3a9-8edd59c8a8bc',
    name: 'John',
    surname: 'Doe',
    dateOfEmployment: new Date(2022, 6, 2),
    manager: defaultManager,
    skills: [
      'Angular',
      'Java',
      'Spring boot',
      'ChatGPT',
      'Twitter',
      'Kafka',
      'Terraform',
    ],
    projects: [...PROJECTS],
  },
];
