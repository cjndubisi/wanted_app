jest.mock('node-fetch');

import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { create } from 'react-test-renderer';
import EmailLogin, { FormState } from '../../LogInWithEmail';
import { render, updateFormWith, withStackNavigation } from "../utils";
import { default as fetcher } from 'node-fetch';
import { Routes } from '../../../router';
import Home from '../../Home';
const fetch = (fetcher as any) as jest.Mock;
const { Response } = jest.requireActual('node-fetch');
const components = {
  screens: {
    EmailLogin: { component: EmailLogin, path: Routes.EmailLogin.path },
    Home: { component: Home, path: Routes.Home.path },
  },
};

it('renders correctly', () => {
  expect(render(withStackNavigation(components)).container).toMatchSnapshot();
});

test('cannot submit with empty fields', async () => {
  const { findByLabelText, getByText } = render(withStackNavigation(components));

  fireEvent.press(getByText(/Log in/i));

  await expect(findByLabelText('Last name is too short')).toBeTruthy();
});

test('test can sign up', async () => {
  const body = {
    user: {
      id: 1,
      first_name: 'random',
      last_name: 'random',
      email: 'random@random.com'
    },
    auth_token: 'faslfuad_random_fasd',
    message: 'success'
  };
  fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(body))));

  const formInput: FormState = {
    email: 'random@random.com',
    password: 'R#and0m',
  };
  const { getByLabelText, getByText, findByText } = render(withStackNavigation(components));

  updateFormWith({ values: formInput, getByLabelText });

  fireEvent.press(getByText(/Log in/i));

  await expect(findByText(/Board/i)).toBeTruthy();
});
