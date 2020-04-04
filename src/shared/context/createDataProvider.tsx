import React, { Dispatch, Reducer, ReducerAction, ReducerState, useEffect, useReducer } from 'react';

type DispatchAction<T extends Reducer<any, any>, S> = (a: Dispatch<ReducerAction<T>>) => S;
var iscalled = false;

export default <
  T extends Reducer<S, any>,
  A extends DispatchAction<T, ReturnType<A> & { init?: () => Promise<void> }>,
  S
>(
  reducer: T,
  actions: A,
  defaultValue: ReducerState<T>
) => {
  type ContextType = Omit<ReturnType<A> & { init?: () => Promise<void> }, 'init'> & {
    state: ReducerState<T>;
  };

  const Context = React.createContext<ContextType>((undefined as any) as ContextType);

  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const { init, ...rest } = actions(dispatch);
    if (init) {
      // Call Provider initialization code
      useEffect(() => {
        const setup = async () => await init();
        setup();
      }, []);
    }

    return (
      <Context.Provider
        value={{
          state,
          ...rest,
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
