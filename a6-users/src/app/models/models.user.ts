
export interface User {
  accessToken?: string;
  sessionExp?: number;
  id: number;
  name: string;
  email: string;
  role?: string;
  roleId: number;
  active?: boolean;
  password?: string;
}
