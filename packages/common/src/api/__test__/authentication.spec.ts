jest.mock('node-fetch');
import { RegisterResponse } from '../types';
import { register } from '../authentication';
import { default as fetcher } from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

const fetch = (fetcher as any) as jest.Mock;
beforeEach(() => {});

afterEach(() => {
  jest.clearAllMocks();
  // delete global.fetch;
});

const requestBody = (user) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
});
const user = {
  first_name: 'random',
  last_name: 'random',
  email: 'random@random.com',
  password: 'Random',
};
test("register's user", async () => {
  const body: RegisterResponse = {
    user: {
      id: 1,
      first_name: 'random',
      last_name: 'random',
      email: 'random@random.com',
    },
    auth_token: 'faslfuad_random_fasd',
    message: 'success',
  };
  fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(body))));

  const response = await register(user);
  expect(response).toEqual(body);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://localhost:3000/v1/users', requestBody(user));
});

test('throws error on server error response ', async () => {
  const errors = {
    password: ['wrong password'],
  };
  const fetchResponse = {
    ok: false,
    json: () => Promise.resolve({ errors }),
  };
  fetch.mockReturnValue(Promise.resolve(fetchResponse));

  await expect(register(user)).rejects.toEqual(new Error(JSON.stringify(errors)));
  expect(fetch).toHaveBeenCalledWith('http://localhost:3000/v1/users', requestBody(user));
  expect(fetch).toHaveBeenCalledTimes(1);
});
