import {Project} from "./project";

export interface Employee {
  id: string,
  name: string,
  surname: string,
  dateOfEmployment: Date,
  manager: Employee | null,
  skills: string[],
  projects: Project[]
}
