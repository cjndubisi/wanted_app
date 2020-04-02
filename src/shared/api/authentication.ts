import { RegisterResponse, User } from './types';

const API_URL = 'https://wanted-be.herokuapp.com/v1'; // 'http://localhost:3000/v1';

export const register = async (user: Partial<User>): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}${'/users'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  return json;
};

export const login = async (crede) => {};
