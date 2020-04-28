import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BaseNavigationContainer } from '@react-navigation/core';
import { fireEvent, render } from '@testing-library/react-native';
import { AuthProvider } from '../../context/AuthContext';

export const withNavigation = ({
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

export const withProviders = (Component: any) => {
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

export const renderWithNavigation = ({ screens = {} }) => {
  const NavigationComponent = withNavigation({ screens });
  const Component = withProviders(NavigationComponent);
  return { ...render(<Component />) };
};

export const updateFormWith = ({ values, getByLabelText }) => {
  const formInput = values;
  const elements = Object.keys(formInput).reduce((acc, name) => {
    acc[name] = getByLabelText(name);
    return acc;
  }, {});
  Object.keys(elements).forEach(item => {
    fireEvent.changeText(elements[item], formInput[item]);
  });
};
