import React, { Dispatch, Reducer, ReducerAction } from 'react';
declare type DispatchAction<T extends Reducer<any, any>, S> = (a: Dispatch<ReducerAction<T>>) => S;
declare const _default: <T extends React.Reducer<S, any>, A extends DispatchAction<T, ReturnType<A> & {
    init?: () => Promise<void>;
}>, S>(reducer: T, actions: A, defaultValue: React.ReducerState<T>) => {
    Context: React.Context<ReturnType<A> & {
        state: React.ReducerState<T>;
    }>;
    Provider: ({ children }: any) => JSX.Element;
};
export default _default;
