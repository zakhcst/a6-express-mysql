
export interface LoggedUser {
  accessToken?: string;
  sessionExp?: number;
  userId: number;
  name: string;
  email: string;
  role: string;
  password?: string;
}