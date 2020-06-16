// import { default as fire } from 'node-fetch';
import { AuthResponse, User } from './types';
import Config from './../utils/constants';

const { API_URL } = Config;
const DefaultHeader = {
  'Content-Type': 'application/json',
};

const post = async (url: string, body: { [key: string]: any }): Promise<AuthResponse> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: DefaultHeader,
    body: JSON.stringify(body),
  });

  const json = await response.json();
  if (!response.ok) {
    throw json.errors || json;
  }
  return json;
};

export const register = async (user: Partial<User>) => post(`${API_URL}${'/users'}`, user);

export const login = async (user: Partial<{ password: string; email: string }>) =>
  post(`${API_URL}${'/users/login'}`, user);

export const loginWithFacebookCredentials = async (token: string) =>
  post(`${API_URL}/facebook`, { token });


export const loginWithGoogleCredentials = async (token: string) =>
post(`${API_URL}/google`, { token });