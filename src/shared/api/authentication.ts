import { RegisterResponse, User } from './types';

// const API_URL = 'https://wanted-be.herokuapp.com/v1';
const API_URL = 'http://localhost:3000/v1';

// eslint-disable-next-line import/prefer-default-export
export const register = async (user: Partial<User>): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}${'/users'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
