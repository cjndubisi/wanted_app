import { default as fire } from 'node-fetch';
import { UserResponse, User } from './types';
import { Platform } from 'react-native';
import Config from './../utils/constants';

const { API_URL } = Config;

let fetch = null;
if (Platform.OS !== 'web') {
  fetch = fire;
} else {
  fetch = window.fetch;
}

export const register = async (user: Partial<User>): Promise<UserResponse> => {
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

  return json;
};

export const login = async (user: Partial<User>): Promise<UserResponse> => {
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
