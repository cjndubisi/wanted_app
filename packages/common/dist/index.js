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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const native_1 = require("@react-navigation/native");
const stack_1 = require("@react-navigation/stack");
const react_1 = __importDefault(require("react"));
const AuthContext_1 = require("./context/AuthContext");
const router_1 = require("./router");
const react_native_1 = require("react-native");
const Stack = stack_1.createStackNavigator();
exports.default = () => {
    // Start: WEBURL history and restore initial state on reload
    const containerRef = react_1.default.useRef();
    const { getInitialState } = native_1.useLinking(containerRef, {
        prefixes: ['/'],
        config: {
            Root: {
                path: '',
                initialRouteName: 'Splash',
                screens: Object.keys(router_1.Routes).reduce((acc, name) => {
                    // Convert screen names such as SimpleStack to kebab case (simple-stack)
                    acc[name] = name
                        .replace(/([A-Z]+)/g, '-$1')
                        .replace(/^-/, '')
                        .toLowerCase();
                    return acc;
                }, { Splash: '' }),
            },
        },
    });
    const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
    const [isReady, setIsReady] = react_1.default.useState(false);
    const [initialState, setInitialState] = react_1.default.useState();
    react_1.default.useEffect(() => {
        const restoreState = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let state = yield getInitialState();
                if (react_native_1.Platform.OS !== 'web' && state === undefined) {
                    const savedState = yield react_native_1.AsyncStorage.getItem(NAVIGATION_PERSISTENCE_KEY);
                    state = savedState ? JSON.parse(savedState) : undefined;
                }
                if (state !== undefined) {
                    setInitialState(state);
                }
            }
            finally {
                setIsReady(true);
            }
        });
        restoreState();
    }, [getInitialState]);
    if (!isReady) {
        return null;
    }
    // END: WEBURL
    return (react_1.default.createElement(AuthContext_1.AuthProvider, null,
        react_1.default.createElement(native_1.NavigationContainer, { ref: containerRef, initialState: initialState },
            react_1.default.createElement(Stack.Navigator, { screenOptions: { headerShown: false } }, Object.keys(router_1.Routes).map((name) => (react_1.default.createElement(Stack.Screen, { key: name, name: name, component: router_1.Routes[name].component })))))));
};
