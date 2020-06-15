import { AuthResolver, Splash, Home, EmailSignup, EmailLogin } from '../screens';
import { StackNavigationProp } from '@react-navigation/stack';

// fix with typescript v3.8
import * as Stack2 from './stackRouter';
export const Stack = Stack2;

export const Routes = {
  AuthResolver: {
    path: '/authResolver',
    component: AuthResolver,
    options: { animationEnabled: false },
  },
  Splash: {
    path: '/',
    component: Splash,
    options: {
      animationEnabled: false,
    },
  },
  EmailSignup: {
    path: '/authenticating',
    component: EmailSignup,
    options: {},
  },
  EmailLogin: {
    path: '/login',
    component: EmailLogin,
    options: {},
  },
  Home: {
    path: '/board',
    component: Home,
    options: { animationEnabled: false },
  },
};

export type RootStackParamList = {
  [P in keyof typeof Routes]: undefined;
};

export interface ScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}
