import React from 'react';
import { AuthResolver, Splash, Home } from '../screens';

export const Routes = {
  AuthResolver: {
    path: 'AuthResolver',
    component: AuthResolver,
  },
  Splash: {
    path: '/',
    component: Splash,
  },
  Home: {
    path: '/board',
    component: Home,
  },
};

export type RootStackParamList = {
  [P in keyof typeof Routes]: undefined;
};
