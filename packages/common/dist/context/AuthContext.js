"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const authentication_1 = require("../api/authentication");
const createDataProvider_1 = __importDefault(require("./createDataProvider"));
const AUTH_USER_TOKEN_KEY = 'AUTH_USER_TOKEN_KEY';
var AuthTypes;
(function (AuthTypes) {
    AuthTypes["SIGNUP_SUCCESS"] = "SIGNUP_SUCCESS";
    AuthTypes["AUTH_SUCCESS"] = "AUTH_SUCCESS";
    AuthTypes["AUTH_FAILURE"] = "AUTH_FAILURE";
    AuthTypes["LOADING"] = "LOADING";
})(AuthTypes || (AuthTypes = {}));
const authReducer = (prevState, action) => {
    switch (action.type) {
        case AuthTypes.AUTH_SUCCESS:
            return Object.assign(Object.assign({}, prevState), { user: action.payload.user, user_token: action.payload.user_token, isSignedIn: true, isLoading: false, error: undefined });
        case AuthTypes.LOADING:
            return Object.assign(Object.assign({}, prevState), { isLoading: true, error: undefined });
        case AuthTypes.AUTH_FAILURE:
            return Object.assign(Object.assign({}, prevState), { isLoading: false, error: action.payload });
        default:
            return prevState;
    }
};
const authActions = (dispatch) => ({
    tryToLogin: () => __awaiter(void 0, void 0, void 0, function* () {
        const auth_token = yield react_native_1.AsyncStorage.getItem(AUTH_USER_TOKEN_KEY);
        if (auth_token) {
            dispatch({
                type: AuthTypes.AUTH_SUCCESS,
                payload: {
                    user_token: auth_token,
                },
            });
        }
    }),
    signUpWithEmail: (info) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: AuthTypes.LOADING });
        const request = info;
        try {
            const _a = yield authentication_1.register(request), { user, auth_token } = _a, rest = __rest(_a, ["user", "auth_token"]);
            yield react_native_1.AsyncStorage.setItem(AUTH_USER_TOKEN_KEY, auth_token);
            dispatch({
                type: AuthTypes.AUTH_SUCCESS,
                payload: {
                    user,
                    user_token: auth_token,
                },
            });
        }
        catch (error) {
            dispatch({
                type: AuthTypes.AUTH_FAILURE,
                payload: JSON.parse(error.message),
            });
        }
    }),
});
const INITIAL_STATE = {
    user: undefined,
    auth_token: undefined,
    isLoading: false,
    error: null,
    isSignedIn: false,
};
const { Provider, Context } = createDataProvider_1.default(authReducer, authActions, INITIAL_STATE);
exports.AuthProvider = Provider;
exports.AuthContext = Context;
