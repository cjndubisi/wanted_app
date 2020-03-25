const API_URL = 'http://localhost:3000/v1'; // 'https://wanted-be.herokuapp.com/v1/'; 'http://localhost:3000/v1';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type RegisterResponse = {
  data: User;
  message: string;
  auth_token: string;
};

export const register = async (user): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}${'/users'}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  return json;
};

export const login = async crede => {};
