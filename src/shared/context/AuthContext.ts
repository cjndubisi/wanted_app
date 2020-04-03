import { Dispatch, Reducer, ReducerAction } from 'react';
import { register } from '../api/authentication';
import { User } from '../api/types';
import createDataContext from './createDataProvider';

interface State {
  user: User;
  isLoading: boolean;
  auth_token: string;
  error: any;
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
    case AuthTypes.SIGNUP_SUCCESS:
      return {
        ...prevState,
        user: action.payload.user,
        user_token: action.payload.user_token,
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
      const response = await register(request);
      dispatch({
        type: AuthTypes.SIGNUP_SUCCESS,
        payload: {
          user: response.data,
          user_token: response.auth_token,
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
};

const { Provider, Context } = createDataContext<AuthReducer, DispatchAction, State>(
  authReducer,
  authActions,
  INITIAL_STATE
);

export { Provider as AuthProvider, Context as AuthContext };
