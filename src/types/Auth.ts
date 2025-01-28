export interface RegisterUserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  token: any;
}