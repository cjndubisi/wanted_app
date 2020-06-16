import { Dispatch, Reducer, ReducerAction } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { login, register, loginWithFacebookCredentials, loginWithGoogleCredentials } from '../api';
import { User, LoginResponse } from '../api/types';
import createDataContext from './createDataProvider';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

const AUTH_USER_TOKEN_KEY = 'AUTH_USER_TOKEN_KEY';

interface State {
  user: User;
  isLoading: boolean;
  auth_token: string;
  error: any;
  isSignedIn: boolean;
}

type Action = {
  type: AuthTypes;
  payload?: any;
};

enum AuthTypes {
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  LOADING = 'LOADING',
}

type AuthReducer = Reducer<State, Action>;

const authReducer: AuthReducer = (prevState, action) => {
  switch (action.type) {
    case AuthTypes.AUTH_SUCCESS:
      return {
        ...prevState,
        user: action.payload.user,
        user_token: action.payload.user_token,
        isSignedIn: true,
        isLoading: false,
        error: undefined,
      };
    case AuthTypes.LOADING:
      return {
        ...prevState,
        isLoading: true,
        error: undefined,
      };
    case AuthTypes.AUTH_FAILURE:
      return {
        ...prevState,
        isLoading: false,
        error: action.payload,
      };
    default:
      return prevState;
  }
};

const loginAction = async (login: Promise<LoginResponse>, dispatch: (value: Action) => void) => {
  try {
    const { user, auth_token } = await login;
    console.log(user, auth_token);

    await AsyncStorage.setItem(AUTH_USER_TOKEN_KEY, auth_token);
    dispatch({
      type: AuthTypes.AUTH_SUCCESS,
      payload: {
        user,
        user_token: auth_token,
      },
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: AuthTypes.AUTH_FAILURE,
      payload: JSON.parse(error.message),
    });
  }
};

const authActions = (dispatch: Dispatch<ReducerAction<AuthReducer>>) => ({
  tryToLogin: async () => {
    GoogleSignin.configure();
    await AsyncStorage.clear();
    const auth_token = await AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);
    if (auth_token) {
      dispatch({
        type: AuthTypes.AUTH_SUCCESS,
        payload: {
          user_token: auth_token,
        },
      });
    }
    return !!auth_token;
  },
  signUpWithEmail: async (info: Partial<User & { password: string }>) => {
    dispatch({ type: AuthTypes.LOADING });
    await loginAction(register(info), dispatch);
  },
  logInWithEmail: async (info: Partial<{ password: string; email: string }>) => {
    dispatch({ type: AuthTypes.LOADING });
    await loginAction(login(info), dispatch);
  },
  loginWithFacebook: async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) return;
    let token = await AccessToken.getCurrentAccessToken();
    dispatch({ type: AuthTypes.LOADING });
    await loginAction(loginWithFacebookCredentials(token.accessToken), dispatch);
  },
  loginWithGoogle: async (token: string) => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken);

      await loginAction(loginWithGoogleCredentials(idToken), dispatch);
    } catch (error) {
      if (
        [
          statusCodes.SIGN_IN_CANCELLED,
          statusCodes.IN_PROGRESS,
          statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
        ].indexOf(error.code) !== -1
      ) {
        return;
      }

      throw error;
    }
  },
});

type DispatchAction = typeof authActions;

const INITIAL_STATE: State = {
  user: undefined,
  auth_token: undefined,
  isLoading: false,
  error: null,
  isSignedIn: false,
};

const { Provider, Context } = createDataContext<AuthReducer, DispatchAction, State>(
  authReducer,
  authActions,
  INITIAL_STATE
);

export { Provider as AuthProvider, Context as AuthContext };
