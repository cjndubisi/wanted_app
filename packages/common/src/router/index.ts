import { AuthResolver, Splash, Home, EmailAuth } from '../screens';

export * as Stack from './stackRouter';

export const Routes = {
  Splash: {
    path: '/',
    component: Splash,
  },
  AuthResolver: {
    path: '/authResolver',
    component: AuthResolver,
  },
  Email: {
    path: '/emailAuth',
    component: EmailAuth,
  },
  Home: {
    path: '/board',
    component: Home,
  },
};

export type RootStackParamList = {
  [P in keyof typeof Routes]: undefined;
};
