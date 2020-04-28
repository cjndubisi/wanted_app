jest.mock('node-fetch');

import { BaseNavigationContainer } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, render, prettyPrint, waitForElement, act } from '@testing-library/react-native';
import React from 'react';
import { create } from 'react-test-renderer';
import EmailAuth, { FormState } from '../SignUpWithEmail';
import { AuthProvider } from '../../context/AuthContext';
import { default as fetcher } from 'node-fetch';
import Home from '../Home';
const fetch = (fetcher as any) as jest.Mock;
const { Response } = jest.requireActual('node-fetch');
const components = {
  screens: {
    EmailAuth: { component: EmailAuth, path: '/authenticating' },
    Home: { component: Home, path: '/board' },
  },
};

const withNavigation = ({
  screens = {},
}: {
  screens: { [component: string]: { component: any; path: string } };
}) => {
  return class extends React.Component {
    render() {
      const Stack = createStackNavigator();

      return (
        <BaseNavigationContainer>
          <Stack.Navigator>
            {Object.keys(screens).map(name => (
              <Stack.Screen
                key={name}
                name={screens[name].path}
                component={screens[name].component}
              />
            ))}
          </Stack.Navigator>
        </BaseNavigationContainer>
      );
    }
  };
};

const renderWithNavigation = ({ screens = {} }) => {
  const NavigationComponent = withNavigation({ screens });
  const Component = withProviders(NavigationComponent);
  return { ...render(<Component />) };
};

const withProviders = (Component: any) => {
  return class extends React.Component {
    render() {
      return (
        <AuthProvider>
          <Component />
        </AuthProvider>
      );
    }
  };
};

const updateFormWith = ({ values, getByLabelText }) => {
  const formInput = values;
  const elements = Object.keys(formInput).reduce((acc, name) => {
    acc[name] = getByLabelText(name);
    return acc;
  }, {});
  Object.keys(elements).forEach(item => {
    fireEvent.changeText(elements[item], formInput[item]);
  });
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
