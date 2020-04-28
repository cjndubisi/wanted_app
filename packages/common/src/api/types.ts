export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type UserResponse = {
  user: User;
  message: string;
  auth_token: string;
};
