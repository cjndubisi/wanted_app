import 'react-native-gesture-handler'; // leave at the top of the file (https://reactnavigation.org/docs/getting-started)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingStack from './src/onboarding';

export default function App() {
  return (
    <NavigationContainer>
      <OnboardingStack />
    </NavigationContainer>
  );
}
