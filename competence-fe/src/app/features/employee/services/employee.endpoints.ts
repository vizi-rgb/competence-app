import { environment } from '../../../../environments/environment.development';

const apiPrefix: string = environment.apiUrl;

export const EmployeeEndpoints = {
  GET_EMPLOYEES: `${apiPrefix}/employees`,
  GET_PROJECTS: `${apiPrefix}/projects`,
  GET_MANAGERS: `${apiPrefix}/managers`,
};
