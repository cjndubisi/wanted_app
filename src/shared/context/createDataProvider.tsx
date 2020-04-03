import React, { Dispatch, Reducer, ReducerAction, ReducerState, useReducer } from 'react';

type DispatchAction<T extends Reducer<any, any>, S> = (a: Dispatch<ReducerAction<T>>) => S;

export default <T extends Reducer<S, any>, A extends DispatchAction<T, ReturnType<A>>, S>(
  reducer: T,
  actions: A,
  defaultValue: ReducerState<T>
) => {
  type ContextType = ReturnType<A> & { state: ReducerState<T> };
  const Context = React.createContext<ContextType>((undefined as any) as ContextType);

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions = actions(dispatch);

    return (
      <Context.Provider
        value={{
          state,
          ...boundActions,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  return {
    Context,
    Provider,
  };
};
