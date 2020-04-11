/// <reference types="react" />
export declare const Routes: {
    AuthResolver: {
        path: string;
        component: () => any;
    };
    Splash: {
        path: string;
        component: () => JSX.Element;
    };
    Home: {
        path: string;
        component: () => JSX.Element;
    };
};
export declare type RootStackParamList = {
    [P in keyof typeof Routes]: undefined;
};
