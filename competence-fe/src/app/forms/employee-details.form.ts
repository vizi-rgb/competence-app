import { FormArray, FormControl } from '@angular/forms';
import { EmployeeModel } from '../models/employee.model';
import { Technology } from '../constants/technology.enum';
import { SoftSkill } from '../constants/soft-skill.enum';

export interface EmployeeDetailsForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  dateOfEmployment: FormControl<string>;
  manager: FormControl<EmployeeModel | null>;
  skills: FormArray<FormControl<Technology | SoftSkill>>;
}
