import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BaseNavigationContainer } from '@react-navigation/core';
import { fireEvent, render } from '@testing-library/react-native';
import { AuthProvider } from '../../context/AuthContext';

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

export const withStackNavigation = ({
  screens = {},
}: {
  screens: { [component: string]: { component: any; path: string } };
}) => {
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
};

export const AllProviders = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>)
};


const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
