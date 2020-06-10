// import { default as fire } from 'node-fetch';
import { RegisterResponse, User, LoginResponse } from './types';
import Config from './../utils/constants';

const { API_URL } = Config;

export const register = async (user: Partial<User>): Promise<RegisterResponse> => {
  debugger;
  const response = await fetch(`${API_URL}${'/users'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const json = await response.json();
  if (!response.ok) {
    const errors = json.errors;
    throw new Error(JSON.stringify(errors));
  }
  debugger;
  return json;
};

export const login = async (
  user: Partial<{ password: string; email: string }>
): Promise<LoginResponse> => {
  // To be updated
  const response = await fetch(`${API_URL}${'/login'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const json = await response.json();
  if (!response.ok) {
    const errors = json.errors;
    throw new Error(JSON.stringify(errors));
  }

  return json;
};
