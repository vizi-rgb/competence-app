import { environment } from '../../../../environments/environment.development';

const apiPrefix: string = environment.apiUrl;
const AUTH = `${apiPrefix}/auth`;

export const AuthEndpoints = {
  LOGIN: `${AUTH}/login`,
  REGISTER: `${AUTH}/register`,
};
