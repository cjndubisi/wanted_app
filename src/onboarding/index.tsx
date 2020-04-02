import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../router';
import { AuthProvider } from '../shared/context/AuthContext';
import EmailAuth from './Screens/EmailAuth';
import Splash from './Screens/Splash';

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
  <AuthProvider>
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
  </AuthProvider>
);
