export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserInput {
  username: string;
  email: string;
  password: string;
}
