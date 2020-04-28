import { AuthResolver, Splash, Home, EmailAuth, EmailLogin } from '../screens';

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
