export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponseData {
  token: string;
  expiresAt: Date;
  user: UserData;
}