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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const native_1 = require("@react-navigation/native");
const stack_1 = require("@react-navigation/stack");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
require("react-native-gesture-handler"); // leave at the top of the file (https://reactnavigation.org/docs/getting-started)
const react_native_screens_1 = require("react-native-screens");
const AuthContext_1 = require("./context/AuthContext");
const Home_1 = __importDefault(require("./screens/Home"));
const onboarding_1 = __importDefault(require("./screens/onboarding"));
const ResolveAuthScreen_1 = __importDefault(require("./screens/ResolveAuthScreen"));
react_native_screens_1.enableScreens();
const SCREENS = {
    ResolveAuth: { component: ResolveAuthScreen_1.default },
    OnboardingFlow: { component: onboarding_1.default },
    Home: { component: Home_1.default },
};
const Stack = stack_1.createStackNavigator();
function App() {
    // Start: WEBURL history and restore initial state on reload
    const containerRef = react_1.default.useRef();
    const { getInitialState } = native_1.useLinking(containerRef, {
        prefixes: ['/'],
        config: {
            Root: {
                path: '',
                initialRouteName: 'OnboardingFlow',
                screens: Object.keys(SCREENS).reduce((acc, name) => {
                    // Convert screen names such as SimpleStack to kebab case (simple-stack)
                    acc[name] = name
                        .replace(/([A-Z]+)/g, '-$1')
                        .replace(/^-/, '')
                        .toLowerCase();
                    return acc;
                }, { OnboardingFlow: '' }),
            },
        },
    });
    const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
    const [isReady, setIsReady] = react_1.default.useState(false);
    const [initialState, setInitialState] = react_1.default.useState();
    react_1.useEffect(() => {
        const restoreState = () => __awaiter(this, void 0, void 0, function* () {
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
            react_1.default.createElement(Stack.Navigator, { screenOptions: { headerShown: false } }, Object.keys(SCREENS).map((name) => (react_1.default.createElement(Stack.Screen, { key: name, name: name, component: SCREENS[name].component })))))));
}
exports.default = App;
