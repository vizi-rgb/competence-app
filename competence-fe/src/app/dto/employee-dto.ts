import { EmployeeModel } from '../models/employee.model';
import { Technology } from '../constants/technology.enum';
import { SoftSkill } from '../constants/soft-skill.enum';

export interface UpdateEmployeeRequest {
  name: string | null;
  surname: string | null;
  dateOfEmployment: Date | null;
  manager: EmployeeModel | null;
  skills: (Technology | SoftSkill)[] | null;
}
