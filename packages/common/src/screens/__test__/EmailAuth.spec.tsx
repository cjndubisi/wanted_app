import { BaseNavigationContainer } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import { fireEvent, render, ReactTestInstanceExtended } from '@testing-library/react-native';
import React from 'react';
import { create } from 'react-test-renderer';
import EmailAuth, { FormState } from '../EmailAuth';
import { AuthProvider } from '../../context/AuthContext';

const withNavigation = ({
  screens = {},
}: {
  screens: { [component: string]: { component: any } };
}) => {
  return class extends React.Component {
    render() {
      const Stack = createStackNavigator();
      return (
        <BaseNavigationContainer>
          <Stack.Navigator>
            {Object.keys(screens).map((name) => (
              <Stack.Screen key={name} name={name} component={screens[name].component} />
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
  const signUpWithEmail = jest.fn();

  return class extends React.Component {
    render() {
      return (
        <AuthProvider value={{ signUpWithEmail }}>
          <Component />
        </AuthProvider>
      );
    }
  };
};

it('renders correctly', () => {
  const EmailNavigation = withNavigation({ screens: { EmailAuth: { component: EmailAuth } } });
  const Auth = withProviders(EmailNavigation);
  const tree = create(<Auth />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('cannot submit with empty fields', async () => {
  const screens = { screens: { EmailAuth: { component: EmailAuth } } };
  const { findByLabelText, getByTitle, getByText } = renderWithNavigation(screens);

  fireEvent.press(getByText(/Sign up with email/i));

  await expect(findByLabelText('Last name is too short')).toBeTruthy();
});

test('test can sign up', async () => {
  const formInput: FormState = {
    first_name: 'random',
    last_name: 'random',
    email: 'random@random.com',
    password: 'random',
    confirm_password: 'random',
  };
  const screens = { screens: { EmailAuth: { component: EmailAuth } } };
  const { getByLabelText } = renderWithNavigation(screens);
  const keys: { [T in keyof typeof formInput] } = Object.keys(formInput).reduce((acc, next) => {
    acc[next] = next;
    return acc;
  }, {});
  const elements = Object.keys(formInput).reduce((acc, name) => {
    acc[name] = getByLabelText(name);
    return acc;
  }, {});
  Object.keys(elements).forEach((item) => {
    fireEvent.changeText(elements[keys.email], formInput[item]);
  });

  // expect(getByTestId('title').props.children).toMatch('Home page');
  // fireEvent.press(getByText(/About page/i));
  // await expect(findByText('About page')).toBeTruthy();
});
