import { AuthResolver, Splash, Home, EmailAuth } from '../screens';

export * as Stack from './stackRouter';

export const Routes = {
  AuthResolver: {
    path: '/authResolver',
    component: AuthResolver,
  },
  Splash: {
    path: '/',
    component: Splash,
  },
  Email: {
    path: '/authenticating',
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
