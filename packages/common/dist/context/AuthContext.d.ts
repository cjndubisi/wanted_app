/// <reference types="react" />
import { User } from '../api/types';
interface State {
    user: User;
    isLoading: boolean;
    auth_token: string;
    error: any;
    isSignedIn: boolean;
}
declare const Provider: ({ children }: any) => JSX.Element, Context: import("react").Context<Pick<{
    tryToLogin: () => Promise<void>;
    signUpWithEmail: (info: Partial<User & {
        password: string;
    }>) => Promise<void>;
} & {
    init?: () => Promise<void>;
}, "tryToLogin" | "signUpWithEmail"> & {
    state: State;
}>;
export { Provider as AuthProvider, Context as AuthContext };
