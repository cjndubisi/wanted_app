/// <reference types="react" />
import { User } from '../api/types';
interface State {
    user: User;
    isLoading: boolean;
    auth_token: string;
    error: any;
    isSignedIn: boolean;
}
declare const Provider: ({ children }: any) => JSX.Element, Context: import("react").Context<{
    tryToLogin: () => Promise<void>;
    signUpWithEmail: (info: Partial<User & {
        password: string;
    }>) => Promise<void>;
} & {
    state: State;
}>;
export { Provider as AuthProvider, Context as AuthContext };
