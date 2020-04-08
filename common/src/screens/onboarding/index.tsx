import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../../router';
import EmailAuth from './EmailAuth';
import Splash from './Splash';

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="EmailAuth"
        component={EmailAuth}
        options={{
          title: 'Sign up with Email',
          headerStyle: { backgroundColor: '#f4511e' },
          headerLeft: null,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
};
