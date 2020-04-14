import { default as fire } from 'node-fetch';
import { RegisterResponse, User } from './types';
import { Platform } from 'react-native';
// const API_URL = 'https://wanted-be.herokuapp.com/v1';
const API_URL = 'http://localhost:3000/v1';
let fetch = null;
if (Platform.OS !== 'web') {
  fetch = fire;
} else {
  fetch = window.fetch;
}

export const register = async (user: Partial<User>): Promise<RegisterResponse> => {
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
