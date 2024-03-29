import { wait } from '@testing-library/react-native';
import React from 'react';
import EmailSignup, { FormState } from '../../SignUpWithEmail';
import { updateFormWith, render, withStackNavigation, fireEvent } from '../utils';
import { default as fetcher } from 'node-fetch';
import { Routes } from '../../../router';
import Home from '../../Home';
const fetch = (fetcher as any) as jest.Mock;
const { Response } = jest.requireActual('node-fetch');
const components = {
  screens: {
    EmailSignup: { component: EmailSignup, path: Routes.EmailSignup.path },
    Home: { component: Home, path: Routes.Home.path },
  },
};

it('renders correctly', () => {
  expect(render(withStackNavigation(components)).container).toMatchSnapshot();
});

test('cannot submit with empty fields', async () => {
  const { queryByText, getByText } = render(withStackNavigation(components));

  fireEvent.press(getByText('Sign up with email'));

  await wait(() => expect(queryByText('Last name is too short')).toBeTruthy());
});

test('test cannot sign up with invalid password format', async () => {
  const formInput: FormState = {
    first_name: 'random',
    last_name: 'random',
    email: 'random@random.com',
    password: 'random',
    confirm_password: 'random1',
  };
  const { getByLabelText, getByText, queryByText } = render(withStackNavigation(components));

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText('Sign up with email'));

  await wait(() => expect(queryByText('Invalid Password format')).toBeTruthy());
  await wait(() => expect(queryByText('Password does not match')).toBeTruthy());
});

test('test can sign up', async () => {
  const body = {
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

  const formInput: FormState = {
    first_name: 'random',
    last_name: 'random',
    email: 'random@random.com',
    password: 'R#and0m',
    confirm_password: 'R#and0m',
  };

  const { getByLabelText, getByText, findByText } = render(withStackNavigation(components));

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText('Sign up with email'));

  await expect(findByText(/Board/i)).toBeTruthy();
});

test('renders api form validation errors', async () => {
  const errors = {
    password: ['wrong password'],
  };

  const fetchResponse = {
    ok: false,
    json: () => Promise.resolve({ errors }),
  };

  fetch.mockReturnValue(Promise.resolve(fetchResponse));

  const formInput: FormState = {
    first_name: 'random',
    last_name: 'random',
    email: 'random@random.com',
    password: 'R#and0m',
    confirm_password: 'R#and0m',
  };
  const { getByLabelText, getByText, queryByText } = render(withStackNavigation(components));

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText('Sign up with email'));
  await wait(() => expect(queryByText(/wrong password/i)).toBeTruthy());
});
