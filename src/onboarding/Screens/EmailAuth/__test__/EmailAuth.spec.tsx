import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { create } from 'react-test-renderer';
import EmailAuth from '..';
import { AuthProvider } from '../../../../shared/context/AuthContext';

it('renders correctly', () => {
  const Wrapper = (Component) => {
    return class extends React.Component {
      render() {
        const Stack = createStackNavigator();
        return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'EmailAuth'}>
              <Stack.Screen name={'EmailAuth'} component={Component} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      }
    };
  };
  const Auth = Wrapper(EmailAuth);
  const signUpWithEmail = jest.fn();

  const tree = create(
    <AuthProvider value={{ signUpWithEmail }}>
      <Auth />
    </AuthProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
