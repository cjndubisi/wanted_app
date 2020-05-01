jest.mock('node-fetch');

import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { create } from 'react-test-renderer';
import EmailSignup, { FormState } from '../../SignUpWithEmail';
import { renderWithNavigation, updateFormWith, withNavigation, withProviders } from "../utils";
import { default as fetcher } from 'node-fetch';
import { Routes } from "../../../router";
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
  const EmailNavigation = withNavigation(components);
  const Auth = withProviders(EmailNavigation);
  const tree = create(<Auth />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('cannot submit with empty fields', async () => {
  const { findByLabelText, getByText } = renderWithNavigation(components);

  fireEvent.press(getByText(/Sign up with email/i));

  await expect(findByLabelText('Last name is too short')).toBeTruthy();
});

test('test cannot sign up with invalid password format', async () => {
  const formInput: FormState = {
    first_name: 'random',
    last_name: 'random',
    email: 'random@random.com',
    password: 'random',
    confirm_password: 'random1',
  };
  const { getByLabelText, getByText, findByLabelText } = renderWithNavigation(components);

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText(/Sign up with email/i));

  await expect(findByLabelText('Invalid Password format')).toBeTruthy();
  await expect(findByLabelText('Password does not match')).toBeTruthy();
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
  const { getByLabelText, getByText, findByText } = renderWithNavigation(components);

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText(/Sign up with email/i));

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
  const { getByLabelText, getByText, findByLabelText } = renderWithNavigation(components);

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText(/Sign up with email/i));
  await expect(findByLabelText('wrong password')).toBeTruthy();
});
