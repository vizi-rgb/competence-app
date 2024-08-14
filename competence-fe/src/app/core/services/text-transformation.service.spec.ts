import { TestBed } from '@angular/core/testing';

import { TextTransformationService } from './text-transformation.service';
import { EmployeeModel } from '../../features/employee/models/employee.model';

describe('TextTransformationService', () => {
  let service: TextTransformationService;
  let employee: EmployeeModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextTransformationService);
    employee = {
      id: '1',
      name: 'John',
      surname: 'Doe',
      manager: null,
      projects: [],
      skills: [],
      dateOfEmployment: new Date(2022, 6, 2),
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return employee name and surname', () => {
    // given
    const expectedValue: string = `${employee.name} ${employee.surname}`;

    // when then
    expect(service.getEmployeeToString(employee)).toEqual(expectedValue);
  });

  it('should return employee name and surname in lowercase', () => {
    // given
    const expectedValue: string =
      `${employee.name} ${employee.surname}`.toLowerCase();

    // when then
    expect(service.getEmployeeLowerCase(employee)).toEqual(expectedValue);
  });

  it('should return employee name and surname in uppercase', () => {
    // given
    const expectedValue: string =
      `${employee.name} ${employee.surname}`.toUpperCase();

    // when then
    expect(service.getEmployeeUpperCase(employee)).toEqual(expectedValue);
  });
});
