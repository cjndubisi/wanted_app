import { Dispatch, Reducer, ReducerAction } from 'react';
import { AsyncStorage } from 'react-native';
import { register } from '../api/authentication';
import { User } from '../api/types';
import createDataContext from './createDataProvider';
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
  INITIALIZATION = 'INITIALIZATION',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  LOADING = 'LOADING',
}

type AuthReducer = Reducer<State, Action>;

const authReducer: AuthReducer = (prevState, action) => {
  switch (action.type) {
    case AuthTypes.INITIALIZATION:
      return {
        ...prevState,
        user_token: action.payload,
        isSignedIn: !!action.payload,
      };
    case AuthTypes.SIGNUP_SUCCESS:
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

const authActions = (dispatch: Dispatch<ReducerAction<AuthReducer>>) => ({
  signUpWithEmail: async (info: Partial<User & { password: string }>) => {
    dispatch({ type: AuthTypes.LOADING });

    const request = info;
    try {
      const { user, auth_token, ...rest } = await register(request);

      await AsyncStorage.setItem(AUTH_USER_TOKEN_KEY, auth_token);

      dispatch({
        type: AuthTypes.SIGNUP_SUCCESS,
        payload: {
          user,
          user_token: auth_token,
        },
      });
    } catch (error) {
      dispatch({
        type: AuthTypes.AUTH_FAILURE,
        payload: JSON.parse(error.message),
      });
    }
  },
});

type DispatchAction = typeof authActions;

const INITIAL_STATE = {
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
