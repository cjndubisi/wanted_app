import { AuthResolver, Splash, Home, EmailSignup, EmailLogin } from '../screens';

import Stack2 from './stackRouter';

export const Stack = Stack2;
export const Routes = {
  AuthResolver: {
    path: '/authResolver',
    component: AuthResolver,
  },
  Splash: {
    path: '/',
    component: Splash,
  },
  EmailSignup: {
    path: '/authenticating',
    component: EmailSignup,
  },
  EmailLogin: {
    path: '/login',
    component: EmailLogin
  },
  Home: {
    path: '/board',
    component: Home,
  },
};

export type RootStackParamList = {
  [P in keyof typeof Routes]: undefined;
};
