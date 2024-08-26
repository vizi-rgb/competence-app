import { environment } from '../../../../environments/environment.development';

const apiPrefix: string = environment.apiUrl;
const EMPLOYEES = `${apiPrefix}/employees`;

export const EmployeeEndpoints = {
  GET_EMPLOYEES: `${EMPLOYEES}`,
  GET_PROJECTS: `${apiPrefix}/projects`,
  GET_MANAGERS: 'managers',
  GET_SKILLS: `${apiPrefix}/skills`,
  SEARCH_EMPLOYEES: `${EMPLOYEES}/search`,
};
