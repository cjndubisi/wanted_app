import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../router';
import EmailAuth from './EmailAuth';
import Splash from './Splash';

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ gestureEnabled: false }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="EmailAuth" component={EmailAuth} />
  </Stack.Navigator>
);
