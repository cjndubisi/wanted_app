export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type RegisterResponse = {
  user: User;
  message: string;
  auth_token: string;
};

export type LoginResponse = RegisterResponse;
