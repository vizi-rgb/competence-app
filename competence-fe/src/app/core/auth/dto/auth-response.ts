export interface Authority {
  authority: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  authorities: Authority[];
}
