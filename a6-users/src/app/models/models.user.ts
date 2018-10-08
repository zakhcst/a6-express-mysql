
export interface User {
  accessToken?: string;
  sessionExp?: number;
  userId: number;
  name: string;
  email: string;
  role?: string;
  roleId: number;
  password?: string;
}
