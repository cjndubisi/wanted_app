import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import EmailAuth from './EmailAuth';
import { RootStackParamList } from '../router';

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ gestureEnabled: false }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="EmailAuth" component={EmailAuth} />
  </Stack.Navigator>
);
